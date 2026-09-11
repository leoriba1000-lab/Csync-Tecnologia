/**
 * Onboarding do cliente após a troca do código.
 *
 * Três passos, nesta ordem:
 *   1. assinar o app aos webhooks da WABA do cliente;
 *   2. registrar o número dele para uso na Cloud API;
 *   3. persistir a conexão do seu lado.
 *
 * O passo 3 é o único que depende do seu banco — está marcado com TODO e
 * isolado atrás de uma função, para não amarrar este módulo ao Supabase.
 */
import { graphClient, GraphError } from "./graph.js";

/** Assina o seu app aos webhooks da WABA do cliente. Sem isso, nada chega. */
export async function subscribeAppToWaba({ wabaId, businessToken, graphVersion }) {
  const graph = graphClient({ graphVersion });
  return graph.post(`${wabaId}/subscribed_apps`, { accessToken: businessToken });
}

/**
 * Registra o número do cliente na Cloud API.
 *
 * O PIN é o da verificação em duas etapas. Se o número já tiver um PIN
 * definido pelo cliente e você enviar outro, a Meta recusa — esse é o erro
 * mais comum aqui, e a mensagem devolvida ao operador precisa dizer isso,
 * em vez de um "falha ao registrar" genérico.
 */
export async function registerPhoneNumber({ phoneNumberId, businessToken, graphVersion, pin }) {
  const graph = graphClient({ graphVersion });
  return graph.post(`${phoneNumberId}/register`, {
    accessToken: businessToken,
    body: { messaging_product: "whatsapp", pin },
  });
}

/** Lê nome, fuso e números da WABA recém-conectada, para exibir na sua interface. */
export async function fetchWabaDetails({ wabaId, businessToken, graphVersion }) {
  const graph = graphClient({ graphVersion });
  const [waba, numbers] = await Promise.all([
    graph.get(wabaId, { accessToken: businessToken, query: { fields: "id,name,timezone_id,currency" } }),
    graph.get(`${wabaId}/phone_numbers`, {
      accessToken: businessToken,
      query: { fields: "id,display_phone_number,verified_name,quality_rating,code_verification_status" },
    }),
  ]);
  return { waba, phoneNumbers: numbers.data ?? [] };
}

/**
 * Orquestra o onboarding completo.
 *
 * Tolera sessionInfo ausente: em alguns navegadores o postMessage do popup
 * não chega antes do callback do login. Nesse caso os identificadores vêm
 * depois, pelo webhook account_update com evento PARTNER_ADDED, e este fluxo
 * deve terminar em estado "aguardando webhook" em vez de erro.
 */
export async function completeOnboarding({
  businessToken,
  sessionInfo,
  graphVersion,
  pin,
  persist = async () => {},
}) {
  const wabaId = sessionInfo?.waba_id;
  const phoneNumberId = sessionInfo?.phone_number_id;

  if (!wabaId) {
    await persist({ status: "aguardando_webhook", businessToken });
    return { status: "aguardando_webhook" };
  }

  await subscribeAppToWaba({ wabaId, businessToken, graphVersion });

  let registration = { status: "nao_registrado" };
  if (phoneNumberId) {
    try {
      await registerPhoneNumber({ phoneNumberId, businessToken, graphVersion, pin });
      registration = { status: "registrado" };
    } catch (error) {
      // Número já registrado ou PIN divergente não invalida a conexão:
      // a WABA já está assinada e o operador resolve o número depois.
      if (!(error instanceof GraphError)) throw error;
      registration = { status: "falha_no_registro", detail: error.body?.error?.message ?? error.message };
    }
  }

  const details = await fetchWabaDetails({ wabaId, businessToken, graphVersion });

  // TODO(vestia): gravar no banco, associado à loja logada.
  // Guarde businessToken cifrado em repouso — ele dá acesso à conta do cliente.
  await persist({ status: "conectado", businessToken, wabaId, phoneNumberId, registration, ...details });

  return { status: "conectado", wabaId, phoneNumberId, registration, ...details };
}
