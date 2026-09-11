/**
 * Embedded Signup v4 — lançador do lado do cliente.
 *
 * Responsabilidade única: abrir o fluxo da Meta, coletar o código de troca e
 * os identificadores da sessão, e entregá-los ao seu backend. Nada mais.
 *
 * O código de troca expira em 30 SEGUNDOS. Ele precisa chegar ao servidor e
 * ser trocado por um token dentro dessa janela — não o armazene, não o registre
 * em log, não espere confirmação do usuário antes de enviá-lo.
 *
 * Nunca coloque o app secret neste arquivo. A troca é servidor-a-servidor.
 */

const SDK_SRC = "https://connect.facebook.net/en_US/sdk.js";
const MESSAGE_ORIGINS = ["https://www.facebook.com", "https://web.facebook.com"];

let sdkPromise = null;

/** Carrega o SDK JavaScript da Meta uma única vez. */
function loadSdk({ appId, graphVersion }) {
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Embedded Signup exige um navegador."));
      return;
    }
    if (window.FB) {
      resolve(window.FB);
      return;
    }

    window.fbAsyncInit = () => {
      window.FB.init({ appId, autoLogAppEvents: true, xfbml: false, version: graphVersion });
      resolve(window.FB);
    };

    const script = document.createElement("script");
    script.src = SDK_SRC;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onerror = () => reject(new Error("Falha ao carregar o SDK da Meta."));
    document.head.appendChild(script);
  });

  return sdkPromise;
}

/**
 * Escuta os eventos que o popup da Meta publica na janela que o abriu.
 * É por aqui — e não pelo retorno do FB.login — que chegam o WABA ID e o
 * phone number ID. Retorna uma função para cancelar a escuta.
 */
function listenSessionInfo(onEvent) {
  const handler = (event) => {
    if (!MESSAGE_ORIGINS.includes(event.origin)) return;

    let payload;
    try {
      payload = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
    } catch {
      return; // mensagem que não é nossa
    }
    if (!payload || payload.type !== "WA_EMBEDDED_SIGNUP") return;

    // payload.event: 'FINISH' | 'CANCEL' | 'ERROR'
    // payload.data:  { phone_number_id, waba_id, business_id, ... }
    onEvent(payload);
  };

  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
}

/**
 * Abre o fluxo e resolve com { code, sessionInfo } quando o cliente conclui.
 * Rejeita se ele cancelar, se a Meta devolver erro, ou se o login não retornar código.
 *
 * @param {object}   options
 * @param {string}   options.appId          META_APP_ID
 * @param {string}   options.configId       META_ES_CONFIG_ID
 * @param {string}   options.graphVersion   ex.: 'v23.0'
 * @param {object=}  options.extras         sobrepõe o objeto extras (ver README)
 */
export async function launchEmbeddedSignup({ appId, configId, graphVersion, extras = {} }) {
  const FB = await loadSdk({ appId, graphVersion });

  return new Promise((resolve, reject) => {
    let sessionInfo = null;

    const stopListening = listenSessionInfo((payload) => {
      if (payload.event === "FINISH") {
        sessionInfo = payload.data;
        return;
      }
      if (payload.event === "CANCEL") {
        stopListening();
        reject(new Error(`Fluxo cancelado pelo cliente na etapa: ${payload.data?.current_step ?? "desconhecida"}`));
        return;
      }
      if (payload.event === "ERROR") {
        stopListening();
        reject(new Error(payload.data?.error_message ?? "Erro no fluxo da Meta."));
      }
    });

    FB.login(
      (response) => {
        const code = response?.authResponse?.code;
        stopListening();

        if (!code) {
          reject(new Error("Login concluído sem código de troca."));
          return;
        }
        // sessionInfo pode chegar depois do callback em alguns navegadores;
        // quem consome deve tolerar sessionInfo nulo e cair no webhook account_update.
        resolve({ code, sessionInfo });
      },
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "",
          sessionInfoVersion: "3",
          ...extras,
        },
      }
    );
  });
}

/**
 * Caminho completo do lado do cliente: abre o fluxo e entrega o resultado
 * ao seu backend imediatamente, respeitando a janela de 30 segundos.
 */
export async function connectWhatsApp({ appId, configId, graphVersion, endpoint, headers = {} }) {
  const { code, sessionInfo } = await launchEmbeddedSignup({ appId, configId, graphVersion });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ code, sessionInfo }),
  });

  if (!response.ok) {
    throw new Error(`Backend recusou a troca do código (HTTP ${response.status}).`);
  }
  return response.json();
}
