"use client";

import React, { useState } from "react";
import Link from "next/link";
import { T } from "@/lib/theme";

/* ── PLACEHOLDER ─────────────────────────────────────────────── */
const ImgBox = ({
  h = 200,
  label = "",
  radius = 0,
  style = {},
}: {
  h?: number;
  label?: string;
  radius?: number;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      height: h,
      borderRadius: radius,
      background: `repeating-linear-gradient(135deg,${T.rose10} 0,${T.rose10} 12px,${T.rose20} 12px,${T.rose20} 24px)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    <span
      style={{
        fontFamily: "monospace",
        fontSize: 11,
        color: T.terra,
        letterSpacing: 1,
        opacity: 0.65,
        textAlign: "center",
        padding: "0 20px",
        lineHeight: 1.6,
      }}
    >
      {label}
    </span>
  </div>
);

/* ── DADOS MOCK DO SALÃO ─────────────────────────────────────── */
const salonData = {
  name: "Studio Éclat",
  slug: "studio-eclat",
  rating: 4.9,
  reviews: 212,
  distance: "320m",
  address: "Rua Oscar Freire, 123 — Jardins, São Paulo/SP",
  phone: "(11) 94567-8901",
  instagram: "@studioeclat",
  amenities: ["Wi-Fi", "Estacionamento", "Acessível", "Atende crianças"],
  payments: ["Dinheiro", "Cartão", "PIX", "Vale"],
  workingHours: [
    ["Seg–Sex", "09:00 – 20:00"],
    ["Sábado", "09:00 – 18:00"],
    ["Domingo", "Fechado"],
  ],
  professionals: [
    { id: "any", name: "Qualquer profissional", role: "" },
    { id: "isabela", name: "Isabela Costa", role: "Cabeleireira" },
    { id: "camila", name: "Camila Rocha", role: "Colorista" },
    { id: "fernanda", name: "Fernanda Luz", role: "Sobrancelha" },
  ],
  services: [
    { id: "1", name: "Corte + Finalização", price: "R$ 95", time: "60 min", cat: "Cabelo", tag: "Mais pedido" },
    { id: "2", name: "Hidratação Express", price: "R$ 80", time: "45 min", cat: "Cabelo", tag: "" },
    { id: "3", name: "Coloração Completa", price: "R$ 260", time: "150 min", cat: "Cor", tag: "" },
    { id: "4", name: "Balayage", price: "A partir de R$ 350", time: "240 min", cat: "Cor", tag: "" },
    { id: "5", name: "Sobrancelha Design", price: "R$ 55", time: "40 min", cat: "Sobrancelha", tag: "Tendência" },
    { id: "6", name: "Maquiagem Profissional", price: "R$ 140", time: "60 min", cat: "Maquiagem", tag: "" },
  ],
};

/* ── STARS ───────────────────────────────────────────────────── */
function Stars({ n, size = 10 }: { n: number; size?: number }) {
  const full = Math.floor(n);
  return (
    <span style={{ display: "inline-flex", gap: 1, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.3 2.8,11 3.5,7.5 1,5 4.5,4.5"
            fill={i <= full ? T.terra : T.border}
            stroke={i <= full ? T.terra : T.borderMid}
            strokeWidth="0.5"
          />
        </svg>
      ))}
      <span style={{ fontSize: size - 1, color: T.muted, marginLeft: 3 }}>{n}</span>
    </span>
  );
}

/* ── BADGE ───────────────────────────────────────────────────── */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: T.badge,
        color: T.terra,
        fontSize: 10,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 20,
        letterSpacing: 0.3,
      }}
    >
      {children}
    </span>
  );
}

/* ── PAGE ────────────────────────────────────────────────────── */
export default function SalonClient({ slug }: { slug: string }) {
  const [tab, setTab] = useState("Serviços");
  const [selectedProf, setSelectedProf] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const tabs = ["Serviços", "Profissionais", "Avaliações", "Pacotes"];

  const salon = salonData; // TODO: fetch real salon by slug

  // Agrupa serviços por categoria
  const grouped = salon.services.reduce(
    (acc: { cat: string; items: typeof salon.services }[], s) => {
      const last = acc[acc.length - 1];
      if (!last || last.cat !== s.cat) acc.push({ cat: s.cat, items: [s] });
      else last.items.push(s);
      return acc;
    },
    []
  );

  return (
    <div style={{ background: "#f8f4f1", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>
      {/* STICKY HEADER */}
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        {/* CAPA */}
        <div style={{ height: 220, position: "relative" }}>
          <ImgBox h={220} label={`capa — ${salon.name}`} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom,rgba(44,26,20,.3) 0%,transparent 50%,rgba(44,26,20,.5) 100%)",
            }}
          />
          <div style={{ position: "absolute", top: 16, left: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              href="/"
              style={{
                background: "rgba(255,255,255,.2)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                padding: "8px 14px",
                borderRadius: 20,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              ← Voltar
            </Link>
          </div>
          <div style={{ position: "absolute", top: 16, right: 20, display: "flex", gap: 8 }}>
            <button
              onClick={() => setFavorited(!favorited)}
              style={{
                background: "rgba(255,255,255,.2)",
                backdropFilter: "blur(8px)",
                color: favorited ? T.terra : "#fff",
                border: "none",
                borderRadius: 20,
                padding: "8px 16px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {favorited ? "♥" : "♡"}
            </button>
            <button
              style={{
                background: T.terra,
                color: "#fff",
                border: "none",
                borderRadius: 20,
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(193,127,107,.4)",
              }}
            >
              Agendar agora
            </button>
          </div>
        </div>

        {/* FAIXA DE INFO DO SALÃO */}
        <div className="rx-salon-info-bar">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: T.rose10,
                border: `2px solid ${T.border}`,
                overflow: "hidden",
              }}
            >
              <ImgBox h={56} radius={14} />
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: T.ink,
                }}
              >
                {salon.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                <Stars n={salon.rating} />
                <span style={{ fontSize: 12, color: T.muted }}>
                  {salon.reviews} avaliações · {salon.distance} · Aberto agora
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {salon.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                style={{
                  background: T.rose10,
                  color: T.terra,
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: `1px solid ${T.border}`,
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="rx-salon-layout">
        {/* ESQUERDA */}
        <div style={{ padding: "28px clamp(1rem,4vw,2.5rem) 48px" }}>

          {/* ESCOLHA A PROFISSIONAL */}
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontSize: 12,
                color: T.muted,
                fontWeight: 600,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Escolha a profissional
            </p>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
              {salon.professionals.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProf(i)}
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: `2.5px solid ${selectedProf === i ? T.terra : T.border}`,
                      overflow: "hidden",
                      transition: "border-color .2s",
                    }}
                  >
                    <ImgBox h={56} style={{ borderRadius: "50%" }} />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: selectedProf === i ? T.terra : T.muted,
                      fontWeight: selectedProf === i ? 600 : 400,
                      textAlign: "center",
                      maxWidth: 70,
                    }}
                  >
                    {p.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TABS */}
          <div
            style={{
              display: "flex",
              background: "#fff",
              borderRadius: 14,
              padding: 4,
              marginBottom: 24,
              border: `1px solid ${T.border}`,
              width: "fit-content",
            }}
          >
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? T.terra : "transparent",
                  color: tab === t ? "#fff" : T.muted,
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: tab === t ? 600 : 400,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* LISTA DE SERVIÇOS */}
          {tab === "Serviços" && (
            <div>
              {grouped.map((group, gi) => (
                <div key={gi}>
                  <p
                    style={{
                      fontSize: 11,
                      color: T.terra,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      margin: "16px 0 10px",
                    }}
                  >
                    {group.cat}
                  </p>
                  {group.items.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        background: "#fff",
                        borderRadius: 16,
                        border: `1px solid ${T.border}`,
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 4,
                          }}
                        >
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: T.ink,
                            }}
                          >
                            {s.name}
                          </p>
                          {s.tag && <Badge>{s.tag}</Badge>}
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span
                            style={{
                              fontSize: 13,
                              color: T.terra,
                              fontWeight: 600,
                            }}
                          >
                            {s.price}
                          </span>
                          <span style={{ fontSize: 12, color: T.muted }}>
                            · ⏱ {s.time}
                          </span>
                        </div>
                      </div>
                      <button
                        style={{
                          background: "transparent",
                          color: T.terra,
                          border: `1.5px solid ${T.terra}`,
                          borderRadius: 20,
                          padding: "8px 18px",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all .2s",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = T.terra;
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = T.terra;
                        }}
                      >
                        + Adicionar
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* PROFISSIONAIS */}
          {tab === "Profissionais" && (
            <div className="rx-grid-3">
              {salon.professionals.slice(1).map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: `1px solid ${T.border}`,
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 12px",
                      border: `2px solid ${T.border}`,
                    }}
                  >
                    <ImgBox h={64} style={{ borderRadius: "50%" }} />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: T.ink,
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </p>
                  <p style={{ fontSize: 12, color: T.muted }}>{p.role}</p>
                  <button
                    style={{
                      marginTop: 12,
                      width: "100%",
                      background: T.badge,
                      color: T.terra,
                      border: `1px solid ${T.border}`,
                      borderRadius: 20,
                      padding: "7px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Selecionar
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* AVALIAÇÕES */}
          {tab === "Avaliações" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { name: "Mariana S.", rating: 5, date: "15 abr", comment: "Amei o resultado do corte! Isabela é incrível, super atenciosa e o ambiente do salão é lindo." },
                { name: "Fernanda L.", rating: 5, date: "12 abr", comment: "Coloração ficou perfeita. Já é minha 3ª vez aqui e sempre saio satisfeita." },
                { name: "Gabriela T.", rating: 4, date: "8 abr", comment: "Ótimo atendimento. Só acho que poderia ter mais horários disponíveis aos sábados." },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: `1px solid ${T.border}`,
                    padding: "18px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                        }}
                      >
                        {r.name[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{r.name}</p>
                        <Stars n={r.rating} size={9} />
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: T.muted }}>{r.date}</span>
                  </div>
                  <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR DIREITA */}
        <div className="rx-salon-sidebar-panel">
          {/* HORÁRIOS */}
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.ink,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Horários
            </p>
            {salon.workingHours.map(([d, h], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "7px 0",
                  borderBottom:
                    i < salon.workingHours.length - 1
                      ? `1px solid ${T.border}`
                      : "none",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: h === "Fechado" ? T.muted : T.ink,
                    fontWeight: 500,
                  }}
                >
                  {d}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: h === "Fechado" ? T.red : T.muted,
                  }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>

          {/* PAGAMENTO */}
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.ink,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Formas de pagamento
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {salon.payments.map((p) => (
                <span
                  key={p}
                  style={{
                    background: T.badge,
                    color: T.terra,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: 20,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* CONTATO */}
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.ink,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Contato
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, color: T.muted }}>
                  📞 {salon.phone}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: T.terra,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Copiar
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, color: T.muted }}>
                  💬 WhatsApp
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: T.terra,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Abrir
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, color: T.muted }}>
                  📸 {salon.instagram}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: T.terra,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Seguir
                </span>
              </div>
            </div>
          </div>

          {/* MAPA */}
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.ink,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Localização
            </p>
            <ImgBox h={120} label="mapa" radius={14} />
            <p
              style={{
                fontSize: 11,
                color: T.muted,
                marginTop: 8,
                lineHeight: 1.6,
              }}
            >
              {salon.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
