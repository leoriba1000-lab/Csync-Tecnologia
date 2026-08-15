import {
  LayoutGrid,
  MessageSquare,
  Users,
  Headphones,
  BarChart2,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import useReveal from "../hooks/useReveal";

const MENU = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: MessageSquare, label: "Conversas" },
  { icon: Users, label: "Leads" },
  { icon: Headphones, label: "Atendimentos" },
  { icon: BarChart2, label: "Relatórios" },
  { icon: Settings, label: "Configurações" },
];

const STATS = [
  { label: "Conversas", value: "3.482", delta: "+12%" },
  { label: "Atendimentos", value: "1.209", delta: "+8%" },
  { label: "Leads gerados", value: "467", delta: "+21%" },
  { label: "Taxa de resolução", value: "94%", delta: "+3pp" },
];

const BARS = [38, 52, 44, 68, 58, 76, 62, 84, 70, 92, 80, 96];

const CHANNELS = [
  { label: "WhatsApp", value: 62, color: "#22D3EE" },
  { label: "Site", value: 24, color: "#3B6BFF" },
  { label: "Instagram", value: 14, color: "#8B5CF6" },
];

const CONVERSATIONS = [
  { name: "Marina Alves", msg: "Perfeito, obrigada pela ajuda!", time: "agora" },
  { name: "João Pedro", msg: "Consigo agendar para amanhã?", time: "2 min" },
  { name: "Studio Nexa", msg: "Lead qualificado — enviar proposta", time: "9 min" },
  { name: "Bianca Costa", msg: "Qual o prazo de entrega?", time: "24 min" },
];

export default function DashboardMockup() {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal">
      <div className="rounded-2xl border border-ink-line bg-ink-panel shadow-[0_40px_80px_-32px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-ink-line bg-ink-panel2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 text-[11px] font-mono text-mist-faint">
            app.csync.com.br/dashboard
          </span>
        </div>

        <div className="flex">
          {/* sidebar */}
          <aside className="hidden sm:flex w-44 flex-shrink-0 flex-col gap-1 border-r border-ink-line bg-ink-panel2 px-3 py-4">
            {MENU.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] ${
                  item.active
                    ? "bg-sync-gradient-soft text-white"
                    : "text-mist-faint"
                }`}
              >
                <item.icon size={15} strokeWidth={1.8} />
                {item.label}
              </div>
            ))}
          </aside>

          {/* main */}
          <div className="flex-1 p-4 sm:p-6 min-w-0">
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-ink-line bg-ink-panel2 p-3.5"
                >
                  <p className="text-[11px] text-mist-faint">{s.label}</p>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="font-display font-semibold text-lg text-mist">
                      {s.value}
                    </span>
                    <span className="text-[10px] text-sync-cyan font-mono">
                      {s.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid sm:grid-cols-5 gap-3">
              <div className="sm:col-span-3 rounded-xl border border-ink-line bg-ink-panel2 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-mist-faint">Atendimentos por dia</p>
                  <MoreHorizontal size={14} className="text-mist-faint" />
                </div>
                <div className="mt-4 flex items-end gap-1.5 h-20">
                  {BARS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-sync-gradient opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2 rounded-xl border border-ink-line bg-ink-panel2 p-4">
                <p className="text-[11px] text-mist-faint">Canais</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {CHANNELS.map((c) => (
                    <div key={c.label}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-mist-muted">{c.label}</span>
                        <span className="font-mono text-mist-faint">{c.value}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-ink-line overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${c.value}%`, backgroundColor: c.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-ink-line bg-ink-panel2 p-4">
              <p className="text-[11px] text-mist-faint mb-3">Conversas recentes</p>
              <div className="flex flex-col divide-y divide-ink-line/70">
                {CONVERSATIONS.map((c) => (
                  <div key={c.name} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="h-7 w-7 rounded-full bg-sync-gradient-soft flex items-center justify-center text-[10px] font-medium text-sync-cyan flex-shrink-0">
                        {c.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12.5px] text-mist truncate">{c.name}</p>
                        <p className="text-[11px] text-mist-faint truncate">{c.msg}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-mist-faint font-mono flex-shrink-0 ml-2">
                      {c.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
