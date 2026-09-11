# Embedded Signup v4 — esqueleto

Fluxo em que a loja parceira conecta o próprio WhatsApp à Vestia sozinha, em
alguns cliques, sem ninguém da Csync tocar na conta dela.

**Este módulo está no repositório do site institucional apenas para revisão.**
Ele pertence ao código da Vestia, que é quem tem sessão autenticada, banco e
backend. Mova-o para lá; nada aqui depende deste repositório.

## Pré-requisitos que não são código

O esqueleto não funciona enquanto estes quatro itens não existirem:

1. **Certificação Tech Provider.** O Embedded Signup só é liberado para Solution
   Partner ou Tech Provider. Sem isso o fluxo nem abre.
2. **Acesso avançado** a `whatsapp_business_management` e
   `whatsapp_business_messaging`, concedido no App Review. Sem o avançado,
   chamadas em WABAs de terceiros retornam erro 200.
3. **Configuração do Facebook Login for Business**, criada no painel do app.
   Ela define as permissões pedidas ao cliente e gera o `config_id`.
4. **Assinatura do webhook `account_update`**, que é disparado quando um cliente
   conclui o fluxo e carrega os dados de que você precisa.

## Arquitetura

```
frontend/embedded-signup.js       abre o fluxo, captura código + IDs da sessão
frontend/ConnectWhatsAppButton.jsx exemplo de uso em React
server/graph.js                   cliente mínimo da Graph API
server/exchange-code.js           código -> token de negócio (servidor a servidor)
server/onboard.js                 assina webhooks, registra número, persiste
server/webhook.js                 verificação de assinatura e account_update
server/routes.example.js          fiação de referência em Express
```

## O caminho feliz

1. A loja clica em "Conectar meu WhatsApp". O SDK abre o popup da Meta.
2. Ela escolhe ou cria a conta do WhatsApp Business e o número.
3. O popup devolve, por `postMessage`, os IDs dos ativos; o `FB.login` devolve
   um **código de troca**.
4. O frontend envia código e IDs ao seu backend **imediatamente**.
5. O backend troca o código por um **token de negócio** escopado àquele cliente.
6. O backend assina o app aos webhooks da WABA e registra o número.
7. A conexão é gravada, associada à loja logada.

## Três armadilhas

**O código expira em 30 segundos.** Não o guarde, não o registre em log, não
espere confirmação do usuário. Do navegador ao `oauth/access_token` direto.

**O `postMessage` nem sempre chega antes do callback.** Em alguns navegadores o
`sessionInfo` vem nulo. Por isso `completeOnboarding` termina em
`aguardando_webhook` em vez de erro: os IDs chegam depois, no `PARTNER_ADDED`.
Tratar isso como falha produz um bug que só aparece em produção, num navegador
que você não testou.

**A assinatura do webhook é calculada sobre o raw body.** Se um middleware
parsear o JSON antes, `JSON.stringify` não reproduz os bytes originais e toda
requisição legítima passa a ser rejeitada. Em Express: `express.raw`.

## Segurança

O `META_APP_SECRET` nunca vai ao navegador — a troca do código é
servidor-a-servidor. O token de negócio também não volta ao frontend: ele dá
acesso à conta do cliente e deve ser cifrado em repouso.

O endpoint `/whatsapp/connect` precisa estar atrás da autenticação da Vestia.
É ele que decide a qual loja a conexão pertence; aberto, permite conectar uma
WABA na conta de outra loja.

## Desconexão

`PARTNER_REMOVED` chega quando o cliente remove o app. O token está revogado:
pare de usá-lo e marque a loja como desconectada. **Não apague os dados** — a
página pública de exclusão de dados trata desconectar e excluir como pedidos
distintos, e apagar sem pedido contradiz o que está publicado.

Quando existir um botão de desconectar dentro da Vestia, a Seção A daquela
página deve voltar a citá-lo.

## Valores a conferir antes de codar

Dois pontos do objeto `extras` mudam entre versões e vale confirmar na página
Version 4 da documentação antes de fechar a implementação: o valor de
`featureType` (vazio no fluxo padrão; `whatsapp_business_app_onboarding` ao
onboardar quem já usa o aplicativo WhatsApp Business) e o de
`sessionInfoVersion`. O resto do fluxo é estável entre v3 e v4.

Data desta anotação: 11/09/2026. O v2 é descontinuado em **15/10/2026**.
