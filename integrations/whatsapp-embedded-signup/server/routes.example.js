/**
 * Exemplo de fiação em Express. Adapte ao runtime da Vestia — o que importa
 * é a ordem das chamadas e o acesso ao raw body no webhook.
 */
import express from "express";
import { exchangeCodeForBusinessToken } from "./exchange-code.js";
import { completeOnboarding } from "./onboard.js";
import { handleVerification, handleWebhook } from "./webhook.js";

const {
  META_APP_ID,
  META_APP_SECRET,
  META_GRAPH_VERSION = "v23.0",
  META_WEBHOOK_VERIFY_TOKEN,
  WHATSAPP_REGISTRATION_PIN,
} = process.env;

export const router = express.Router();

/**
 * Endpoint chamado pelo frontend logo após o cliente concluir o fluxo.
 * Precisa estar atrás da autenticação da Vestia: é aqui que se decide a qual
 * loja a conexão pertence. Sem isso, qualquer um conecta uma WABA na conta alheia.
 */
router.post("/whatsapp/connect", express.json(), async (req, res) => {
  const { code, sessionInfo } = req.body ?? {};
  if (!code) return res.status(400).json({ error: "code ausente" });

  try {
    const businessToken = await exchangeCodeForBusinessToken({
      code,
      appId: META_APP_ID,
      appSecret: META_APP_SECRET,
      graphVersion: META_GRAPH_VERSION,
    });

    const result = await completeOnboarding({
      businessToken,
      sessionInfo,
      graphVersion: META_GRAPH_VERSION,
      pin: WHATSAPP_REGISTRATION_PIN,
      persist: async (connection) => {
        // TODO(vestia): gravar associado a req.user.lojaId, com o token cifrado.
        void connection;
      },
    });

    // Nunca devolva o businessToken ao navegador.
    const { businessToken: _omit, ...safe } = result;
    return res.json(safe);
  } catch (error) {
    // TODO(vestia): logar sem incluir code, token ou corpo da resposta da Meta.
    return res.status(502).json({ error: "Não foi possível concluir a conexão com o WhatsApp." });
  }
});

/** Handshake de verificação da URL de webhook. */
router.get("/whatsapp/webhook", (req, res) => {
  const { status, body } = handleVerification({ query: req.query, verifyToken: META_WEBHOOK_VERIFY_TOKEN });
  res.status(status).send(body);
});

/**
 * Recebimento de eventos. express.raw é obrigatório: a assinatura é calculada
 * sobre os bytes originais, e um body já parseado não os reproduz.
 */
router.post("/whatsapp/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const { status, body } = await handleWebhook({
    rawBody: req.body,
    signatureHeader: req.get("x-hub-signature-256"),
    appSecret: META_APP_SECRET,
    onEvent: async (event) => {
      // TODO(vestia): PARTNER_ADDED completa o onboarding quando o postMessage falhou;
      // PARTNER_REMOVED marca a loja como desconectada sem apagar dados.
      void event;
    },
  });
  res.status(status).send(body);
});
