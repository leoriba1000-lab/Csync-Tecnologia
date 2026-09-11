/**
 * Troca o código do Embedded Signup pelo token de negócio do cliente.
 *
 * O código vive 30 segundos. Esta chamada precisa acontecer assim que ele
 * chega do frontend — sem fila, sem retentativa com espera, sem persistir o
 * código em lugar nenhum.
 *
 * O token resultante é um Business Integration System User access token,
 * escopado ao cliente onboardado. Como Tech Provider, é o único tipo de token
 * que vocês vão usar para operar a conta dele. Ele não expira por tempo, mas é
 * revogado quando o cliente remove o app — trate essa revogação como esperada.
 */
import { graphClient } from "./graph.js";

export async function exchangeCodeForBusinessToken({ code, appId, appSecret, graphVersion }) {
  const graph = graphClient({ graphVersion });

  const result = await graph.get("oauth/access_token", {
    query: { client_id: appId, client_secret: appSecret, code },
  });

  if (!result.access_token) {
    throw new Error("A Meta não devolveu access_token na troca do código.");
  }
  return result.access_token;
}
