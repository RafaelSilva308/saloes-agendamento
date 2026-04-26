"use client";

import React, { useState } from "react";
import { T } from "@/lib/theme";

/* ── COMPONENTES GRÁFICOS ────────────────────────────────────── */

// Gráfico de Linha/Área: Faturamento Diário
function RevenueAreaChart() {
  const data = [1200, 1500, 1100, 1800, 2200, 2600, 1900];
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const max = Math.max(...data) * 1.1; // Adiciona folga no topo
  const H = 200, W = 600;
  
  const pts = data.map((v, i) => [i * (W / (data.length - 1)), H - (v / max) * H]);
  const pathD = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const fillD = pathD + ` L${W},${H} L0,${H} Z`;

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg width="100%" height={H + 30} viewBox={`0 0 ${W} ${H + 30}`} style={{ minWidth: 500 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={T.terra} stopOpacity=".3" />
            <stop offset="100%" stopColor={T.terra} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line key={i} x1="0" y1={H * p} x2={W} y2={H * p} stroke={T.border} strokeDasharray="4 4" />
        ))}
        {/* Area and Line */}
        <path d={fillD} fill="url(#areaGrad)" />
        <path d={pathD} stroke={T.terra} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "all 0.3s" }} />
        {/* Dots */}
        {pts.map((p, i) => (
          <g key={i} style={{ cursor: "pointer", transition: "all 0.2s" }} className="hover:opacity-80">
            <circle cx={p[0]} cy={p[1]} r="5" fill={T.white} stroke={T.terra} strokeWidth="2.5" />
          </g>
        ))}
        {/* X Axis Labels */}
        {days.map((d, i) => (
          <text key={i} x={i * (W / (days.length - 1))} y={H + 20} textAnchor="middle" fontSize="12" fill={T.muted} fontFamily="var(--font-sans)">
            {d}
          </text>
        ))}
      </svg>
    </div>
  );
}

// Donut Chart: Novos vs Recorrentes
function DonutChart() {
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  const novos = 35; // 35%
  const recorrentes = 65; // 65%
  
  const novosDash = (novos / 100) * circumference;
  const recorrentesDash = (recorrentes / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={T.rose30}
          strokeWidth={strokeWidth}
          strokeDasharray={`${novosDash} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={T.terra}
          strokeWidth={strokeWidth}
          strokeDasharray={`${recorrentesDash} ${circumference}`}
          strokeDashoffset={-novosDash}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: T.ink, fontFamily: "var(--font-serif)" }}>65%</span>
        <span style={{ fontSize: 11, color: T.muted, marginTop: -2 }}>Recorrentes</span>
      </div>
    </div>
  );
}

// Progress Ring para Ocupação
function ProgressRing({ progress, color }: { progress: number, color: string }) {
  const size = 48;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={T.border} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: T.ink }}>
        {progress}%
      </div>
    </div>
  );
}

/* ── DADOS MOCK ──────────────────────────────────────────────── */
const teamData = [
  { name: "Isabela Costa", atends: 45, fat: "R$ 4.200", comissao: "R$ 1.680", aval: 4.9 },
  { name: "Camila Rocha", atends: 38, fat: "R$ 3.800", comissao: "R$ 1.520", aval: 4.8 },
  { name: "Fernanda Luz", atends: 30, fat: "R$ 2.450", comissao: "R$ 980", aval: 4.7 },
  { name: "Priscila Melo", atends: 22, fat: "R$ 2.000", comissao: "R$ 800", aval: 5.0 },
];

const topServices = [
  { name: "Corte + Coloração", volume: 45, valor: "R$ 6.750", pct: 100 },
  { name: "Mechas / Balayage", volume: 28, valor: "R$ 5.600", pct: 82 },
  { name: "Escova Progressiva", volume: 32, valor: "R$ 4.800", pct: 71 },
  { name: "Hidratação Profunda", volume: 55, valor: "R$ 3.300", pct: 48 },
];

/* ── PAGE ────────────────────────────────────────────────────── */
export default function RelatoriosPage() {
  const [period, setPeriod] = useState("Ultimos 7 dias");

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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: T.ink }}>
            Inteligência de Negócio
          </h1>
          <div style={{ width: 1, height: 24, background: T.border }} className="rx-desktop-block" />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rx-desktop-block"
            style={{
              background: T.rose10,
              border: `1px solid ${T.border}`,
              color: T.ink,
              fontSize: 13,
              fontWeight: 500,
              padding: "6px 30px 6px 14px",
              borderRadius: 20,
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a7068' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            }}
          >
            <option>Hoje</option>
            <option>Últimos 7 dias</option>
            <option>Último Mês</option>
            <option>Personalizado</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              background: T.white,
              color: T.ink,
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.rose10)}
            onMouseLeave={(e) => (e.currentTarget.style.background = T.white)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Exportar Relatório
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="rx-dash-scroll" style={{ flex: 1, overflowY: "auto", padding: "24px clamp(1rem,3vw,2rem) 32px" }}>
        
        {/* IA SUGGESTION CARD */}
        <div
          style={{
            background: `linear-gradient(to right, ${T.terra}, ${T.terraDark})`,
            borderRadius: 16,
            padding: "16px 24px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 4px 12px rgba(160, 96, 78, 0.2)",
            color: T.white,
          }}
        >
          <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
            ✨
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Sugestão Inteligente</h3>
            <p style={{ fontSize: 13, opacity: 0.9 }}>
              Sua próxima quinta-feira tem baixa ocupação (apenas 40%). Que tal criar uma promoção relâmpago de hidratação para este dia?
            </p>
          </div>
          <button style={{ background: T.white, color: T.terraDark, border: "none", padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
            Criar Promoção
          </button>
        </div>

        {/* METRICS TOP ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
          {/* Faturamento Total */}
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>Faturamento Total</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.greenBg, color: T.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💰</div>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: T.ink }}>R$ 12.450</div>
            <div style={{ fontSize: 12, color: T.green, fontWeight: 600, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
              <span>↑ 15.3%</span> <span style={{ color: T.muted, fontWeight: 400 }}>vs período anterior</span>
            </div>
          </div>

          {/* Ticket Médio */}
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>Ticket Médio</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.rose10, color: T.terra, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏷️</div>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: T.ink }}>R$ 185</div>
            <div style={{ fontSize: 12, color: T.green, fontWeight: 600, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
              <span>↑ 5.2%</span> <span style={{ color: T.muted, fontWeight: 400 }}>vs período anterior</span>
            </div>
          </div>

          {/* Taxa de Ocupação */}
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.02)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: 13, color: T.muted, fontWeight: 500, display: "block", marginBottom: 8 }}>Taxa de Ocupação</span>
              <div style={{ fontSize: 12, color: T.ink, fontWeight: 500 }}>
                Agenda cheia!
              </div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
                Restam 8 horários.
              </div>
            </div>
            <ProgressRing progress={82} color={T.green} />
          </div>

          {/* No-Show Rate */}
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.dangerBg}`, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: T.danger, fontWeight: 600 }}>No-Show Rate</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.dangerBg, color: T.danger, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚠️</div>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: T.danger }}>12.5%</div>
            <div style={{ fontSize: 12, color: T.danger, fontWeight: 500, marginTop: 6 }}>
              Atenção: Acima da meta de 10%
            </div>
          </div>
        </div>

        {/* CHARTS BODY */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, marginBottom: 24 }} className="lg:grid-cols-3">
          
          {/* Main Line Chart */}
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }} className="lg:col-span-2">
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: T.ink, marginBottom: 6 }}>
              Evolução de Faturamento vs. Agendamentos
            </h2>
            <p style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>Comparativo diário de desempenho nos últimos 7 dias.</p>
            <RevenueAreaChart />
          </div>

          {/* Donut Chart */}
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: T.ink, marginBottom: 6, alignSelf: "flex-start" }}>
              Retenção
            </h2>
            <p style={{ fontSize: 13, color: T.muted, marginBottom: 32, alignSelf: "flex-start" }}>Novos vs. Recorrentes</p>
            <DonutChart />
            <div style={{ display: "flex", gap: 20, marginTop: 32, width: "100%", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.terra }} />
                <span style={{ fontSize: 12, color: T.ink }}>Recorrentes (65%)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.rose30 }} />
                <span style={{ fontSize: 12, color: T.ink }}>Novos (35%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM CHARTS AND TABLE */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="lg:grid-cols-3">
          
          {/* Horizontal Bar Chart (Serviços mais Rentáveis) */}
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: T.ink, marginBottom: 6 }}>
              Serviços Mais Rentáveis
            </h2>
            <p style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>Volume vs. Valor Gerado</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {topServices.map((svc, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ fontWeight: 600, color: T.ink }}>{svc.name}</span>
                    <span style={{ fontWeight: 700, color: T.terra }}>{svc.valor}</span>
                  </div>
                  <div style={{ height: 8, background: T.rose10, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${svc.pct}%`, height: "100%", background: i === 0 ? T.terra : T.rose30, borderRadius: 4 }} />
                  </div>
                  <div style={{ fontSize: 11, color: T.muted }}>{svc.volume} realizados</div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance Table */}
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }} className="lg:col-span-2">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: T.ink }}>
                Desempenho da Equipe
              </h2>
              <span style={{ fontSize: 12, color: T.terra, fontWeight: 600, cursor: "pointer" }}>Ver todos</span>
            </div>
            
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.border}`, textAlign: "left" }}>
                    <th style={{ padding: "0 12px 12px 0", fontSize: 12, color: T.muted, fontWeight: 500 }}>Profissional</th>
                    <th style={{ padding: "0 12px 12px", fontSize: 12, color: T.muted, fontWeight: 500 }}>Total Atendimentos</th>
                    <th style={{ padding: "0 12px 12px", fontSize: 12, color: T.muted, fontWeight: 500 }}>Faturamento</th>
                    <th style={{ padding: "0 12px 12px", fontSize: 12, color: T.muted, fontWeight: 500 }}>Comissão</th>
                    <th style={{ padding: "0 0 12px 12px", fontSize: 12, color: T.muted, fontWeight: 500 }}>Avaliação Média</th>
                  </tr>
                </thead>
                <tbody>
                  {teamData.map((member, i) => (
                    <tr 
                      key={i} 
                      style={{ borderBottom: i < teamData.length - 1 ? `1px solid ${T.border}` : "none", transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = T.rose10)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 12px 14px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${T.rose30}, ${T.terra})`, color: T.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                            {member.name[0]}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{member.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 12px", fontSize: 13, color: T.ink }}>{member.atends}</td>
                      <td style={{ padding: "14px 12px", fontSize: 13, fontWeight: 600, color: T.ink }}>{member.fat}</td>
                      <td style={{ padding: "14px 12px", fontSize: 13, color: T.muted }}>{member.comissao}</td>
                      <td style={{ padding: "14px 0 14px 12px", fontSize: 13, color: T.ink }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.3 2.8,11 3.5,7.5 1,5 4.5,4.5" fill={T.terra} />
                          </svg>
                          <span style={{ fontWeight: 600 }}>{member.aval}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
