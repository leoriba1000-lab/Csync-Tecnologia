/**
 * Webhook da Meta: verificação de assinatura e tratamento de account_update.
 *
 * Duas obrigações inegociáveis:
 *   - validar a assinatura X-Hub-Signature-256 contra o RAW body, byte a byte,
 *     antes de interpretar qualquer coisa. Body já parseado por middleware não
 *     serve: JSON.stringify não reproduz os bytes originais.
 *   - responder 200 rápido. Processamento demorado vai para fila; a Meta
 *     reentrega o que demora e você acaba processando duas vezes.
 */
import crypto from "node:crypto";

/** Handshake de verificação (GET) que a Meta faz ao cadastrar a URL. */
export function handleVerification({ query, verifyToken }) {
  const mode = query["hub.mode"];
  const token = query["hub.verify_token"];
  const challenge = query["hub.challenge"];

  if (mode === "subscribe" && token === verifyToken) {
    return { status: 200, body: challenge };
  }
  return { status: 403, body: "Forbidden" };
}

/** Compara a assinatura em tempo constante. rawBody precisa ser Buffer ou string crua. */
export function isValidSignature({ rawBody, signatureHeader, appSecret }) {
  if (!signatureHeader?.startsWith("sha256=")) return false;

  const expected = crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex");
  const received = signatureHeader.slice("sha256=".length);

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Interpreta um evento account_update.
 *
 * Eventos que importam para o onboarding:
 *   PARTNER_ADDED    — cliente concluiu o Embedded Signup; traz os IDs dos ativos.
 *                      É a rede de segurança para quando o postMessage não chega.
 *   PARTNER_REMOVED  — cliente desconectou. Pare de tentar usar o token, marque a
 *                      loja como desconectada e não apague os dados sem pedido
 *                      expresso: desconectar e excluir são pedidos diferentes.
 */
export function parseAccountUpdate(payload) {
  const events = [];

  for (const entry of payload?.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "account_update") continue;
      const value = change.value ?? {};
      events.push({
        wabaId: entry.id,
        event: value.event,
        phoneNumber: value.phone_number,
        disconnectionInfo: value.disconnection_info ?? null,
        raw: value,
      });
    }
  }
  return events;
}

/**
 * Handler do POST. Devolve { status, body } e delega o trabalho real.
 * `onEvent` deve ser rápido ou apenas enfileirar.
 */
export async function handleWebhook({ rawBody, signatureHeader, appSecret, onEvent = async () => {} }) {
  if (!isValidSignature({ rawBody, signatureHeader, appSecret })) {
    return { status: 401, body: "Assinatura inválida" };
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch {
    return { status: 400, body: "JSON inválido" };
  }

  for (const event of parseAccountUpdate(payload)) {
    // TODO(vestia): enfileirar em vez de processar inline quando o volume crescer.
    await onEvent(event);
  }

  return { status: 200, body: "EVENT_RECEIVED" };
}
