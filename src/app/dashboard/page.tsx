"use client";

import React, { useState } from "react";
import { T } from "@/lib/theme";

/* ── MINI GRÁFICO SVG ────────────────────────────────────────── */
const revenueData = [820, 1100, 940, 1380, 1200, 1580, 1840];
const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function MiniChart() {
  const max = Math.max(...revenueData);
  const H = 80, W = 280;
  const pts = revenueData.map((v, i) => [i * (W / 6), H - (v / max) * H]);
  const pathD = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const fillD = pathD + ` L${pts[pts.length - 1][0]},${H} L0,${H} Z`;

  return (
    <svg width={W} height={H + 20} viewBox={`0 0 ${W} ${H + 20}`}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.terra} stopOpacity=".22" />
          <stop offset="100%" stopColor={T.terra} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#chartGrad)" />
      <path d={pathD} stroke={T.terra} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={i === 6 ? T.terra : T.white} stroke={T.terra} strokeWidth="1.5" />
      ))}
      {days.map((d, i) => (
        <text key={i} x={i * (W / 6)} y={H + 16} textAnchor="middle" fontSize="9" fill={T.muted} fontFamily="var(--font-sans)">{d}</text>
      ))}
    </svg>
  );
}

/* ── DADOS MOCK ──────────────────────────────────────────────── */
const kpis = [
  { label: "Agendamentos hoje", value: "14", sub: "+3 vs ontem", up: true, color: T.terra, bg: T.badge, icon: "📅" },
  { label: "Receita do dia", value: "R$ 1.840", sub: "↑ 12% vs semana passada", up: true, color: T.green, bg: T.greenBg, icon: "💰" },
  { label: "Novos clientes", value: "6", sub: "este mês: 38", up: true, color: "#7b6fa0", bg: "#f3f1f8", icon: "👤" },
  { label: "Taxa de ocupação", value: "87%", sub: "2 horários livres hoje", up: false, color: T.yellow, bg: T.yellowBg, icon: "📊" },
];

const appointments = [
  { time: "09:00", name: "Mariana Souza", service: "Corte + Finalização", prof: "Isabela", dur: 60, status: "done" as const },
  { time: "10:00", name: "Fernanda Lima", service: "Coloração Completa", prof: "Camila", dur: 120, status: "done" as const },
  { time: "12:00", name: "Gabriela Torres", service: "Hidratação Profunda", prof: "Isabela", dur: 90, status: "now" as const },
  { time: "13:30", name: "Ana Beatriz Melo", service: "Sobrancelha Design", prof: "Fernanda", dur: 40, status: "next" as const },
  { time: "14:30", name: "Larissa Campos", service: "Escova Progressiva", prof: "Camila", dur: 120, status: "next" as const },
  { time: "16:30", name: "Patrícia Viana", service: "Maquiagem Profissional", prof: "Isabela", dur: 60, status: "next" as const },
  { time: "17:30", name: "Camila Rocha", service: "Balayage + Hidratação", prof: "Camila", dur: 180, status: "next" as const },
];

const statusConfig = {
  done: { label: "Concluído", color: T.muted, bg: "#f0ebe6", dot: "#b0a09a" },
  now:  { label: "Em andamento", color: T.terra, bg: T.badge, dot: T.terra },
  next: { label: "Aguardando", color: T.green, bg: T.greenBg, dot: T.green },
};

const topServices = [
  { name: "Corte + Finalização", count: 38, pct: 92 },
  { name: "Coloração", count: 24, pct: 58 },
  { name: "Hidratação", count: 19, pct: 46 },
  { name: "Sobrancelha", count: 17, pct: 41 },
  { name: "Escova Progressiva", count: 12, pct: 29 },
];

const notifications = [
  { msg: "Larissa Campos confirmou agendamento para hoje às 14:30", time: "5 min atrás", type: "confirm" },
  { msg: "Avaliação 5★ recebida de Fernanda Lima", time: "1h atrás", type: "star" },
  { msg: "Estoque de shampoo abaixo do mínimo", time: "2h atrás", type: "warn" },
];

/* ── COMPONENTES ─────────────────────────────────────────────── */
function KPICard({ label, value, sub, up, color, bg, icon }: typeof kpis[0]) {
  return (
    <div
      style={{
        background: T.white,
        borderRadius: 18,
        padding: "20px 22px",
        border: `1px solid ${T.border}`,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: 11,
            color: up ? T.green : T.yellow,
            fontWeight: 600,
            background: up ? T.greenBg : T.yellowBg,
            padding: "3px 8px",
            borderRadius: 10,
          }}
        >
          {up ? "↑" : "→"} {sub.split(" ")[0]}
        </span>
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 28,
            fontWeight: 700,
            color: T.ink,
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 5 }}>{label}</div>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function AgendaRow({ time, name, service, prof, dur, status }: typeof appointments[0]) {
  const s = statusConfig[status];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 0",
        borderBottom: `1px solid ${T.border}`,
        opacity: status === "done" ? 0.55 : 1,
      }}
    >
      <div style={{ width: 50, textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{time}</div>
        <div style={{ fontSize: 10, color: T.muted }}>{dur}min</div>
      </div>
      <div style={{ width: 2, height: 44, borderRadius: 2, background: s.dot, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {name}
        </div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{service}</div>
      </div>
      <div style={{ fontSize: 11, color: T.muted, flexShrink: 0 }}>{prof}</div>
      <span
        style={{
          background: s.bg,
          color: s.color,
          fontSize: 10,
          fontWeight: 600,
          padding: "3px 10px",
          borderRadius: 20,
          flexShrink: 0,
        }}
      >
        {s.label}
      </span>
    </div>
  );
}

/* ── PAGE ────────────────────────────────────────────────────── */
export default function DashboardHome() {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          background: T.white,
          borderBottom: `1px solid ${T.border}`,
          padding: "0 32px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 700,
              color: T.ink,
            }}
          >
            Bom dia, <em style={{ color: T.terra }}>Isabela</em> ✦
          </span>
          <span style={{ fontSize: 13, color: T.muted, marginLeft: 16 }}>
            Quinta-feira, 23 de abril de 2026
          </span>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Busca */}
          <div
            style={{
              background: T.rose10,
              borderRadius: 24,
              border: `1px solid ${T.border}`,
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.terra} strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span style={{ fontSize: 13, color: T.muted }}>Buscar cliente…</span>
          </div>

          {/* Sino de notificações */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowNotif(!showNotif)}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: showNotif ? T.badge : T.rose10,
                border: `1px solid ${T.border}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.terra} strokeWidth="2">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <span
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                width: 14,
                height: 14,
                background: T.terra,
                borderRadius: "50%",
                fontSize: 8,
                fontWeight: 700,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${T.white}`,
              }}
            >
              3
            </span>

            {showNotif && (
              <div
                style={{
                  position: "absolute",
                  top: 48,
                  right: 0,
                  width: 310,
                  background: T.white,
                  borderRadius: 16,
                  border: `1px solid ${T.border}`,
                  boxShadow: "0 16px 48px rgba(44,26,20,.14)",
                  zIndex: 100,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "14px 18px",
                    borderBottom: `1px solid ${T.border}`,
                    fontSize: 13,
                    fontWeight: 700,
                    color: T.ink,
                  }}
                >
                  Notificações
                </div>
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 18px",
                      borderBottom: i < 2 ? `1px solid ${T.border}` : "none",
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background:
                          n.type === "warn"
                            ? T.yellow
                            : n.type === "star"
                            ? T.terra
                            : T.green,
                        marginTop: 5,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 12, color: T.ink, lineHeight: 1.5 }}>{n.msg}</div>
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            style={{
              background: T.terra,
              color: "#fff",
              border: "none",
              borderRadius: 24,
              padding: "9px 20px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Novo agendamento
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px 32px" }}>

        {/* KPIs */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {kpis.map((k, i) => <KPICard key={i} {...k} />)}
        </div>

        {/* GRID PRINCIPAL */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>

          {/* COLUNA ESQUERDA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* AGENDA DO DIA */}
            <div
              style={{
                background: T.white,
                borderRadius: 20,
                border: `1px solid ${T.border}`,
                padding: "22px 24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: T.ink }}>
                  Agenda de Hoje
                </h2>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{
                      background: T.rose10,
                      color: T.terra,
                      border: `1px solid ${T.border}`,
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Ver semana
                  </button>
                  <button
                    style={{
                      background: T.terra,
                      color: "#fff",
                      border: "none",
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    + Horário
                  </button>
                </div>
              </div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
                14 agendamentos · 2 horários livres
              </div>
              {appointments.map((a, i) => <AgendaRow key={i} {...a} />)}
            </div>

            {/* RECEITA + SERVIÇOS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* GRÁFICO DE RECEITA */}
              <div
                style={{
                  background: T.white,
                  borderRadius: 20,
                  border: `1px solid ${T.border}`,
                  padding: "22px 24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: T.ink }}>
                    Receita Semanal
                  </h2>
                  <span style={{ fontSize: 11, color: T.terra, fontWeight: 600 }}>Semana atual</span>
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, color: T.ink, marginBottom: 4 }}>
                  R$ 9.060
                </div>
                <div style={{ fontSize: 12, color: T.green, marginBottom: 18, fontWeight: 500 }}>
                  ↑ 18% vs semana passada
                </div>
                <MiniChart />
              </div>

              {/* SERVIÇOS EM DESTAQUE */}
              <div
                style={{
                  background: T.white,
                  borderRadius: 20,
                  border: `1px solid ${T.border}`,
                  padding: "22px 24px",
                }}
              >
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 18 }}>
                  Serviços em Destaque
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {topServices.map((s, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: T.ink, fontWeight: 500 }}>{s.name}</span>
                        <span style={{ fontSize: 11, color: T.muted }}>{s.count}x</span>
                      </div>
                      <div style={{ height: 5, background: T.rose10, borderRadius: 4, overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${s.pct}%`,
                            background: i === 0 ? T.terra : T.rose30,
                            borderRadius: 4,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* AÇÕES RÁPIDAS */}
            <div style={{ background: T.white, borderRadius: 20, border: `1px solid ${T.border}`, padding: "22px 22px" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 16 }}>
                Ações Rápidas
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { label: "Novo agend.", color: T.terra, bg: T.badge, icon: "📅" },
                  { label: "Add cliente", color: "#7b6fa0", bg: "#f3f1f8", icon: "👤" },
                  { label: "Relatório", color: T.green, bg: T.greenBg, icon: "📊" },
                  { label: "Promoção", color: T.yellow, bg: T.yellowBg, icon: "🏷️" },
                ].map((a, i) => (
                  <button
                    key={i}
                    style={{
                      background: a.bg,
                      border: `1px solid ${T.border}`,
                      borderRadius: 14,
                      padding: "14px 12px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: T.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                      }}
                    >
                      {a.icon}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STATUS DA EQUIPE */}
            <div style={{ background: T.white, borderRadius: 20, border: `1px solid ${T.border}`, padding: "22px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: T.ink }}>
                  Equipe Hoje
                </h2>
                <span style={{ fontSize: 11, color: T.terra, cursor: "pointer", fontWeight: 500 }}>Ver todas</span>
              </div>
              {[
                { name: "Isabela Costa", role: "Cabeleireira", count: 5, status: "Ocupada", dot: T.terra },
                { name: "Camila Rocha", role: "Colorista", count: 4, status: "Disponível", dot: T.green },
                { name: "Fernanda Luz", role: "Sobrancelha", count: 3, status: "Intervalo", dot: T.yellow },
                { name: "Priscila Melo", role: "Nail Artist", count: 2, status: "Disponível", dot: T.green },
              ].map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: i < 3 ? `1px solid ${T.border}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg,${T.rose30},${T.terra})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {p.name[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{p.role} · {p.count} hoje</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.dot }} />
                    <span style={{ fontSize: 11, color: p.dot, fontWeight: 500 }}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AVALIAÇÕES RECENTES */}
            <div style={{ background: T.white, borderRadius: 20, border: `1px solid ${T.border}`, padding: "22px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: T.ink }}>
                  Avaliações Recentes
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="11" height="11" viewBox="0 0 12 12">
                      <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.3 2.8,11 3.5,7.5 1,5 4.5,4.5" fill={T.terra} />
                    </svg>
                  ))}
                  <span style={{ fontSize: 12, color: T.muted, marginLeft: 4 }}>4.9</span>
                </div>
              </div>
              {[
                { name: "Fernanda Lima", msg: "Atendimento impecável! Amei o resultado da coloração.", stars: 5, time: "há 2h" },
                { name: "Ana Beatriz", msg: "Profissionais incríveis, ambiente aconchegante.", stars: 5, time: "ontem" },
              ].map((r, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: i < 1 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{r.name}</span>
                    <span style={{ fontSize: 11, color: T.muted }}>{r.time}</span>
                  </div>
                  <div style={{ display: "flex", gap: 1, marginBottom: 6 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="10" height="10" viewBox="0 0 12 12">
                        <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.3 2.8,11 3.5,7.5 1,5 4.5,4.5" fill={s <= r.stars ? T.terra : T.border} />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.5 }}>{r.msg}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
