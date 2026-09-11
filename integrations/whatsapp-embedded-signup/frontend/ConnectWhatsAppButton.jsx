/**
 * Componente React de exemplo. Estados que a interface precisa cobrir:
 * ocioso, conectando, conectado, cancelado pelo cliente e erro.
 */
import { useState } from "react";
import { connectWhatsApp } from "./embedded-signup.js";

const CONFIG = {
  appId: import.meta.env.VITE_META_APP_ID,
  configId: import.meta.env.VITE_META_ES_CONFIG_ID,
  graphVersion: import.meta.env.VITE_META_GRAPH_VERSION ?? "v23.0",
  endpoint: "/api/whatsapp/connect",
};

export default function ConnectWhatsAppButton({ onConnected }) {
  const [state, setState] = useState({ status: "ocioso" });

  async function handleClick() {
    setState({ status: "conectando" });
    try {
      const result = await connectWhatsApp(CONFIG);
      setState({ status: "conectado", result });
      onConnected?.(result);
    } catch (error) {
      setState({ status: "erro", message: error.message });
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick} disabled={state.status === "conectando"}>
        {state.status === "conectando" ? "Conectando…" : "Conectar meu WhatsApp"}
      </button>

      {state.status === "erro" && <p role="alert">{state.message}</p>}
      {state.status === "conectado" && <p>WhatsApp conectado. A Lara já pode atender.</p>}
    </div>
  );
}
