"use client";

import React, { useState } from "react";
import Link from "next/link";
import { T } from "@/lib/theme";

/* ── PLACEHOLDER ─────────────────────────────────────────────── */
const ImgBox = ({
  h = 280, label = "", radius = 20, style = {},
}: { h?: number; label?: string; radius?: number; style?: React.CSSProperties }) => (
  <div style={{
    height: h, borderRadius: radius, overflow: "hidden",
    background: `repeating-linear-gradient(135deg,${T.rose10} 0,${T.rose10} 12px,${T.rose20} 12px,${T.rose20} 24px)`,
    display: "flex", alignItems: "center", justifyContent: "center", ...style,
  }}>
    <span style={{ fontFamily: "monospace", fontSize: 11, color: T.terra, letterSpacing: 1, opacity: 0.65, textAlign: "center", padding: "0 20px", lineHeight: 1.6 }}>
      {label}
    </span>
  </div>
);

/* ── NAV ─────────────────────────────────────────────────────── */
function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav
        className="rx-nav"
        style={{
          background: scrolled ? "rgba(253,246,240,.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        }}
      >
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: -0.4 }}>
          Beleza<span style={{ color: T.terra }}>RS</span>
        </span>

        {/* Desktop links */}
        <div className="rx-tablet-up" style={{ gap: 32, alignItems: "center" }}>
          {["Como funciona", "Para salões", "Preços", "Blog"].map((l) => (
            <a key={l} href="#"
              style={{ color: T.muted, fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.terra)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >{l}</a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="rx-tablet-up" style={{ gap: 10 }}>
          <Link href="/login" style={{ background: "transparent", color: T.terra, border: `1.5px solid ${T.terra}`, borderRadius: 32, padding: "9px 22px", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", transition: "all .2s" }}>
            Entrar
          </Link>
          <Link href="/register" style={{ background: T.terra, color: "#fff", border: "none", borderRadius: 32, padding: "9px 22px", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", boxShadow: "0 6px 24px rgba(193,127,107,.3)", transition: "all .2s" }}>
            Começar grátis
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="rx-mobile-only rx-touch"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          style={{ background: "transparent", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 10 }}
        >
          <span style={{ width: 22, height: 2, background: T.ink, borderRadius: 2, display: "block" }} />
          <span style={{ width: 22, height: 2, background: T.ink, borderRadius: 2, display: "block" }} />
          <span style={{ width: 22, height: 2, background: T.ink, borderRadius: 2, display: "block" }} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="rx-mobile-menu-overlay">
          <button onClick={() => setMenuOpen(false)}
            style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", cursor: "pointer", fontSize: 32, color: T.ink, lineHeight: 1, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Fechar menu"
          >×</button>

          <span style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, color: T.ink }}>
            Beleza<span style={{ color: T.terra }}>RS</span>
          </span>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%" }}>
            {["Como funciona", "Para salões", "Preços", "Blog"].map((l) => (
              <a key={l} href="#" onClick={() => setMenuOpen(false)}
                style={{ color: T.ink, fontSize: 20, fontWeight: 500, textDecoration: "none", padding: "6px 0" }}
              >{l}</a>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 300 }}>
            <Link href="/login" onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", color: T.terra, border: `1.5px solid ${T.terra}`, borderRadius: 32, padding: "14px", fontSize: 16, fontWeight: 600, textDecoration: "none" }}
            >Entrar</Link>
            <Link href="/register" onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", background: T.terra, color: "#fff", borderRadius: 32, padding: "14px", fontSize: 16, fontWeight: 600, textDecoration: "none" }}
            >Começar grátis</Link>
          </div>
        </div>
      )}
    </>
  );
}

/* ── HERO ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="rx-hero-section" style={{ position: "relative", overflow: "hidden" }}>
      {/* Orbs decorativos */}
      <div style={{ position: "absolute", top: -120, right: -80, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle,${T.rose20} 0%,transparent 70%)`, opacity: 0.6, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${T.rose30} 0%,transparent 70%)`, opacity: 0.3, pointerEvents: "none" }} />

      <div className="rx-hero-inner">
        {/* Esquerda */}
        <div style={{ flex: 1, maxWidth: 620, position: "relative", zIndex: 1 }}>
          <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.badge, border: `1px solid ${T.border}`, borderRadius: 24, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.terra, display: "inline-block" }} />
            <span style={{ fontSize: 12, color: T.terra, fontWeight: 600, letterSpacing: 0.5 }}>+2.800 salões cadastrados no RS</span>
          </div>

          <h1 className="animate-fade-up delay-1 rx-h1" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: T.ink, marginBottom: 24 }}>
            Sua beleza,
            <br />
            <em style={{ color: T.terra }}>no seu tempo,</em>
            <br />
            do seu jeito.
          </h1>

          <p className="animate-fade-up delay-2" style={{ fontSize: 18, color: T.muted, lineHeight: 1.7, marginBottom: 40, maxWidth: 500 }}>
            Agende serviços nos melhores salões femininos com poucos toques. Sem filas, sem ligações — só você e o seu momento.
          </p>

          {/* Barra de busca */}
          <div className="animate-fade-up delay-3" style={{ background: T.white, borderRadius: 40, border: `1.5px solid ${T.borderMid}`, display: "flex", alignItems: "center", padding: "10px 12px 10px 22px", boxShadow: "0 12px 40px rgba(193,127,107,.15)", marginBottom: 20, maxWidth: "100%" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.terra} strokeWidth="2" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span style={{ flex: 1, padding: "0 14px", fontSize: 14.5, color: "#c4ada5" }}>Buscar salão ou serviço…</span>

            {/* Location — hidden on small mobile */}
            <div className="rx-search-loc">
              <div style={{ width: 1, height: 22, background: T.border, marginRight: 14 }} />
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.terra} strokeWidth="2" style={{ marginRight: 8 }}>
                <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" /><circle cx="12" cy="9" r="2.5" />
              </svg>
              <span style={{ fontSize: 13, color: T.terra, fontWeight: 500, marginRight: 14 }}>Porto Alegre</span>
            </div>

            <button style={{ background: T.terra, color: "#fff", border: "none", borderRadius: 28, padding: "10px 20px", fontSize: 13.5, fontWeight: 600, cursor: "pointer", minHeight: 44, whiteSpace: "nowrap" }}>
              Buscar
            </button>
          </div>

          {/* Estatísticas */}
          <div className="animate-fade-up delay-4" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {[["14k+", "Agendamentos realizados"], ["2.8k", "Salões parceiros"], ["4.9★", "Avaliação média"]].map(([v, l], i) => (
              <div key={i} style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: T.ink }}>{v}</span>
                <span style={{ fontSize: 12, color: T.muted }}>{l}</span>
                {i < 2 && <span style={{ color: T.border, fontSize: 18, marginLeft: 8 }}>·</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Direita — hero visual (desktop only) */}
        <div className="animate-fade-up delay-2 rx-desktop-only" style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative", paddingLeft: 60 }}>
          <div className="animate-float" style={{ width: 360, background: T.white, borderRadius: 28, border: `1px solid ${T.border}`, boxShadow: "0 32px 80px rgba(44,26,20,.12)", overflow: "hidden" }}>
            <ImgBox h={220} label="foto de destaque\ndo salão" radius={0} />
            <div style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: T.ink }}>Studio Éclat</p>
                  <p style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>Cabelo · Coloração · Skincare</p>
                </div>
                <span style={{ background: T.badge, color: T.terra, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>4.9 ★</span>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <button style={{ flex: 1, background: T.terra, color: "#fff", border: "none", borderRadius: 24, padding: 11, fontSize: 13, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>Agendar agora</button>
                <button style={{ width: 44, height: 44, borderRadius: "50%", background: T.rose10, border: `1px solid ${T.border}`, cursor: "pointer", fontSize: 17 }}>♡</button>
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", top: 30, right: -20, background: T.white, borderRadius: 16, padding: "10px 16px", border: `1px solid ${T.border}`, boxShadow: "0 8px 24px rgba(44,26,20,.1)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.greenBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: T.green }}>✓</div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>Agendamento confirmado!</p>
              <p style={{ fontSize: 11, color: T.muted }}>Hoje às 14:30 — Isabela Costa</p>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 60, left: 10, background: T.white, borderRadius: 14, padding: "10px 16px", border: `1px solid ${T.border}`, boxShadow: "0 8px 24px rgba(44,26,20,.1)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 22 }}>⭐</div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: T.ink }}>Fernanda L. avaliou</p>
              <p style={{ fontSize: 10, color: T.muted }}>&quot;Experiência incrível!&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── COMO FUNCIONA ───────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section className="rx-section" style={{ background: T.white }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p style={{ fontSize: 12, color: T.terra, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Simples assim</p>
        <h2 className="rx-h2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: T.ink }}>
          Seu agendamento em<br /><em style={{ color: T.terra }}>3 passos</em>
        </h2>
      </div>

      <div className="rx-grid-3" style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
        {/* Connector line — desktop only */}
        <div className="rx-desktop-block" style={{ position: "absolute", top: 60, left: "16%", right: "16%", height: 1, background: `linear-gradient(to right,${T.border},${T.terra},${T.border})`, zIndex: 0 }} />

        {[
          { icon: "🔍", title: "Encontre seu salão", desc: "Busque por localização, especialidade ou profissional de sua preferência." },
          { icon: "✦",  title: "Escolha o serviço",  desc: "Veja todos os serviços, valores, profissionais disponíveis e horários livres." },
          { icon: "✓",  title: "Confirme e vá!",     desc: "Receba confirmação instantânea com lembrete antes do seu horário." },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: i === 1 ? T.terra : T.badge, border: `2px solid ${i === 1 ? T.terra : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28, boxShadow: i === 1 ? "0 12px 32px rgba(193,127,107,.35)" : "none" }}>
              <span style={{ color: i === 1 ? "#fff" : T.terra }}>{s.icon}</span>
            </div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: T.ink, marginBottom: 10 }}>{s.title}</p>
            <p style={{ fontSize: 14.5, color: T.muted, lineHeight: 1.7, maxWidth: 240, margin: "0 auto" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── SALÕES EM DESTAQUE ──────────────────────────────────────── */
function FeaturedSalons() {
  const salons = [
    { name: "Studio Éclat",  spec: "Cabelo · Coloração",    dist: "320m", rating: 4.9, tag: "Destaque", slug: "studio-eclat" },
    { name: "Villa Beauté",  spec: "Sobrancelha · Design",  dist: "510m", rating: 5.0, tag: "Novo",     slug: "villa-beaute" },
    { name: "Maison Glow",   spec: "Maquiagem · Skincare",  dist: "740m", rating: 4.8, tag: "",         slug: "maison-glow" },
    { name: "Rosé Nails",    spec: "Unhas · Nail Art",      dist: "1.1km",rating: 4.8, tag: "",         slug: "rose-nails" },
  ];

  return (
    <section className="rx-section" style={{ background: T.cream }}>
      <div className="rx-section-header">
        <div>
          <p style={{ fontSize: 12, color: T.terra, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Perto de você</p>
          <h2 className="rx-h2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: T.ink }}>
            Salões em <em style={{ color: T.terra }}>destaque</em>
          </h2>
        </div>
        <button style={{ background: "transparent", color: T.terra, border: `1.5px solid ${T.terra}`, borderRadius: 32, padding: "13px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", minHeight: 44, whiteSpace: "nowrap" }}>
          Ver todos os salões →
        </button>
      </div>

      <div className="rx-grid-4">
        {salons.map((s, i) => (
          <Link key={i} href={`/${s.slug}`}
            style={{ background: T.white, borderRadius: 22, overflow: "hidden", border: `1px solid ${T.border}`, textDecoration: "none", display: "block", transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(44,26,20,.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ position: "relative" }}>
              <ImgBox h={170} label={`foto\n${s.name}`} radius={0} />
              {s.tag && <span style={{ position: "absolute", top: 12, left: 12, background: T.terra, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 16 }}>{s.tag}</span>}
              <button style={{ position: "absolute", top: 10, right: 10, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.85)", border: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>♡</button>
            </div>
            <div style={{ padding: "16px 18px 20px" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: T.ink }}>{s.name}</p>
              <p style={{ fontSize: 12, color: T.muted, marginTop: 3, marginBottom: 12 }}>{s.spec}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: T.terra, fontWeight: 600 }}>★ {s.rating}</span>
                <span style={{ fontSize: 11, color: T.muted }}>📍 {s.dist}</span>
              </div>
              <button style={{ width: "100%", padding: 10, background: T.terra, color: "#fff", border: "none", borderRadius: 24, fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 14, minHeight: 44 }}>Agendar</button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── CATEGORIAS ──────────────────────────────────────────────── */
function Categories() {
  return (
    <section className="rx-section" style={{ background: T.white }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 className="rx-h2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: T.ink }}>
          Tudo que você <em style={{ color: T.terra }}>precisa</em>
        </h2>
        <p style={{ fontSize: 16, color: T.muted, marginTop: 12 }}>Mais de 40 categorias de serviços disponíveis</p>
      </div>
      <div className="rx-grid-6" style={{ maxWidth: 1000, margin: "0 auto" }}>
        {[
          { label: "Cabelo",      e: "✂", count: "1.2k salões" },
          { label: "Unhas",       e: "◆", count: "840 salões"  },
          { label: "Sobrancelha", e: "~", count: "620 salões"  },
          { label: "Maquiagem",   e: "◉", count: "490 salões"  },
          { label: "Massagem",    e: "∿", count: "310 salões"  },
          { label: "Depilação",   e: "✦", count: "540 salões"  },
        ].map((c, i) => (
          <div key={i}
            style={{ background: T.cream, border: `1px solid ${T.border}`, borderRadius: 20, padding: "24px 16px", textAlign: "center", cursor: "pointer", transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(44,26,20,.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 16, background: T.badge, border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 20, fontFamily: "monospace", color: T.terra }}>{c.e}</div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 600, color: T.ink, marginBottom: 4 }}>{c.label}</p>
            <p style={{ fontSize: 11, color: T.muted }}>{c.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── PARA SALÕES ─────────────────────────────────────────────── */
function ForSalons() {
  return (
    <section className="rx-section" style={{ background: `linear-gradient(135deg,${T.brown} 0%,#5a3028 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -60, width: 350, height: 350, borderRadius: "50%", background: "rgba(255,255,255,.03)" }} />

      <div className="rx-grid-forsalons">
        <div>
          <p style={{ fontSize: 12, color: T.rose30, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Para proprietárias de salão</p>
          <h2 className="rx-h2xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "#fff", marginBottom: 24 }}>
            Seu salão,<br /><em style={{ color: T.rose30 }}>lotado todos</em><br />os dias.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.65)", lineHeight: 1.8, marginBottom: 40, maxWidth: 440 }}>
            Gerencie agendamentos, equipe, clientes e faturamento em um único lugar. Foque no que você ama — a gente cuida do resto.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/register" style={{ background: "#fff", color: T.brown, borderRadius: 32, padding: "14px 32px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", minHeight: 44 }}>
              Cadastrar meu salão
            </Link>
            <button style={{ background: "transparent", color: "rgba(255,255,255,.75)", border: "1.5px solid rgba(255,255,255,.3)", borderRadius: 32, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>
              Ver demonstração
            </button>
          </div>
        </div>

        {/* Dashboard preview */}
        <div style={{ position: "relative" }}>
          <div style={{ background: "rgba(255,255,255,.08)", backdropFilter: "blur(10px)", borderRadius: 24, border: "1px solid rgba(255,255,255,.12)", padding: 24, overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              {[["R$ 1.840","Hoje"],["14","Agendamentos"],["87%","Ocupação"]].map(([v,l],i) => (
                <div key={i} style={{ flex: 1, background: "rgba(255,255,255,.08)", borderRadius: 14, padding: "14px 16px" }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: "#fff" }}>{v}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 3 }}>{l}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 16, padding: 16 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", fontWeight: 600, marginBottom: 12, letterSpacing: 0.3, textTransform: "uppercase" }}>Agenda de hoje</p>
              {[
                { t: "09:00", n: "Mariana S.",   s: "Corte + Finalização",   done: true,  now: false },
                { t: "12:00", n: "Gabriela T.",  s: "Hidratação Profunda",   done: false, now: true  },
                { t: "14:30", n: "Ana B. Melo",  s: "Sobrancelha Design",    done: false, now: false },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.08)" : "none", opacity: a.done ? 0.45 : 1 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)", width: 44 }}>{a.t}</span>
                  <div style={{ width: 3, height: 34, borderRadius: 2, background: a.now ? T.rose30 : "rgba(255,255,255,.3)" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{a.n}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>{a.s}</p>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 12, background: a.now ? T.terra : "rgba(255,255,255,.1)", color: a.now ? "#fff" : "rgba(255,255,255,.5)" }}>
                    {a.done ? "Concluído" : a.now ? "Em andamento" : "Aguardando"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FUNCIONALIDADES ─────────────────────────────────────────── */
function Features() {
  return (
    <section className="rx-section" style={{ background: T.cream }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p style={{ fontSize: 12, color: T.terra, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Funcionalidades</p>
        <h2 className="rx-h2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: T.ink }}>
          Uma plataforma <em style={{ color: T.terra }}>completa</em>
        </h2>
      </div>
      <div className="rx-grid-3" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {[
          { icon: "◷", title: "Agendamento 24h",          desc: "Suas clientes agendam a qualquer hora, mesmo quando o salão está fechado." },
          { icon: "◎", title: "Lembretes automáticos",     desc: "Notificações por WhatsApp e e-mail para reduzir faltas e cancelamentos." },
          { icon: "◈", title: "Perfil completo do salão",  desc: "Fotos, serviços, equipe, horários, avaliações e formas de pagamento." },
          { icon: "∎", title: "Gestão financeira",         desc: "Acompanhe faturamento diário, semanal e mensal em tempo real." },
          { icon: "⌘", title: "Programa de fidelidade",    desc: "Retenha clientes com pontos, descontos e benefícios exclusivos." },
          { icon: "◉", title: "Relatórios inteligentes",   desc: "Insights de desempenho para você tomar as melhores decisões." },
        ].map((f, i) => (
          <div key={i}
            style={{ background: T.white, borderRadius: 22, border: `1px solid ${T.border}`, padding: "30px 28px", cursor: "pointer", transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(44,26,20,.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 14, background: T.badge, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, fontSize: 20, fontFamily: "monospace", color: T.terra }}>{f.icon}</div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: T.ink, marginBottom: 10 }}>{f.title}</p>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── DEPOIMENTOS ─────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="rx-section" style={{ background: T.white }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 12, color: T.terra, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Quem já usa</p>
        <h2 className="rx-h2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: T.ink }}>
          O que dizem sobre <em style={{ color: T.terra }}>nós</em>
        </h2>
      </div>
      <div className="rx-grid-3" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {[
          { quote: '"Reduzi as faltas em 60% depois que comecei a usar o BelezaRS. As clientes adoram a facilidade de agendar pelo celular."', name: "Isabela Costa", role: "Studio Éclat — Porto Alegre" },
          { quote: '"Finalmente um app pensado pra gente, mulher. Interface bonita, fácil de usar e com tudo que preciso para gerenciar o salão."', name: "Camila Rocha",  role: "Villa Beauté — Caxias do Sul" },
          { quote: '"Minha agenda está sempre cheia. O sistema de lembretes automáticos mudou completamente minha relação com as clientes."', name: "Fernanda Luz",  role: "Maison Glow — Pelotas" },
        ].map((t, i) => (
          <div key={i}
            style={{ background: T.cream, borderRadius: 22, border: `1px solid ${T.border}`, padding: "32px 28px", cursor: "pointer", transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(44,26,20,.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
              {[1,2,3,4,5].map((s) => <span key={s} style={{ color: T.terra, fontSize: 14 }}>★</span>)}
            </div>
            <p style={{ fontSize: 15, color: T.ink, lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>{t.quote}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${T.rose30},${T.terra})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff" }}>{t.name[0]}</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{t.name}</p>
                <p style={{ fontSize: 12, color: T.muted }}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── PREÇOS ──────────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    { name: "Essencial", price: "Grátis",   period: "para sempre", desc: "Para começar",        highlight: false, features: ["Até 30 agendamentos/mês","Perfil básico do salão","Suporte por e-mail"] },
    { name: "Pro",        price: "R$ 89",    period: "/mês",        desc: "Mais popular",        highlight: true,  features: ["Agendamentos ilimitados","Lembretes automáticos","Programa de fidelidade","Relatórios avançados","Suporte prioritário"] },
    { name: "Premium",    price: "R$ 179",   period: "/mês",        desc: "Para redes de salões",highlight: false, features: ["Tudo do Pro","Múltiplas unidades","API e integrações","Gerente de conta dedicado","Onboarding personalizado"] },
  ];

  return (
    <section className="rx-section" style={{ background: T.cream }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 12, color: T.terra, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Planos</p>
        <h2 className="rx-h2" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: T.ink }}>
          Comece <em style={{ color: T.terra }}>grátis,</em> cresça sem limites
        </h2>
        <p style={{ fontSize: 16, color: T.muted, marginTop: 12 }}>Para clientes, o BelezaRS é sempre gratuito</p>
      </div>
      <div className="rx-grid-3" style={{ maxWidth: 960, margin: "0 auto", alignItems: "center" }}>
        {plans.map((p, i) => (
          <div key={i} style={{ background: p.highlight ? T.terra : T.white, borderRadius: 24, border: p.highlight ? "none" : `1px solid ${T.border}`, padding: "36px 28px", position: "relative", boxShadow: p.highlight ? "0 20px 60px rgba(193,127,107,.4)" : "none" }}>
            {p.highlight && (
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: T.brown, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 20, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
                MAIS POPULAR
              </div>
            )}
            <p style={{ fontSize: 12, color: p.highlight ? "rgba(255,255,255,.7)" : T.terra, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>{p.desc}</p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: p.highlight ? "#fff" : T.ink, marginBottom: 6 }}>{p.name}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 700, color: p.highlight ? "#fff" : T.ink }}>{p.price}</span>
              <span style={{ fontSize: 14, color: p.highlight ? "rgba(255,255,255,.6)" : T.muted }}>{p.period}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {p.features.map((f, j) => (
                <div key={j} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: p.highlight ? "rgba(255,255,255,.8)" : T.terra, fontSize: 14, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13.5, color: p.highlight ? "rgba(255,255,255,.85)" : T.muted, lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/register" style={{ display: "block", width: "100%", padding: "13px", borderRadius: 28, border: p.highlight ? "none" : `1.5px solid ${T.terra}`, background: p.highlight ? "#fff" : "transparent", color: T.terra, fontSize: 14, fontWeight: 700, cursor: "pointer", textAlign: "center", textDecoration: "none", transition: "all .2s", boxSizing: "border-box" }}>
              {p.name === "Essencial" ? "Começar grátis" : "Assinar agora"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA FINAL ───────────────────────────────────────────────── */
function CTAFinal() {
  return (
    <section className="rx-section" style={{ background: T.rose10, textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${T.rose30} 0%,transparent 70%)`, opacity: 0.5 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: 12, color: T.terra, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Pronta para começar?</p>
        <h2 className="rx-h2xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: T.ink, marginBottom: 20 }}>
          A beleza que você<br /><em style={{ color: T.terra }}>merece está aqui.</em>
        </h2>
        <p style={{ fontSize: 17, color: T.muted, lineHeight: 1.7, marginBottom: 44, maxWidth: 520, margin: "0 auto 44px" }}>
          Junte-se a mais de 14 mil mulheres que já descobriram a melhor forma de cuidar da beleza.
        </p>
        <div className="rx-cta-row">
          <button style={{ background: T.terra, color: "#fff", border: "none", borderRadius: 32, padding: "16px 40px", fontSize: 16, fontWeight: 600, cursor: "pointer", boxShadow: "0 6px 24px rgba(193,127,107,.3)", minHeight: 48 }}>
            Buscar salões agora
          </button>
          <Link href="/register" style={{ background: "transparent", color: T.terra, border: `1.5px solid ${T.terra}`, borderRadius: 32, padding: "16px 40px", fontSize: 16, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48 }}>
            Cadastrar meu salão
          </Link>
        </div>
        <p style={{ fontSize: 12, color: T.muted, marginTop: 20 }}>Grátis para clientes · Sem cartão de crédito para começar</p>
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function LandingFooter() {
  return (
    <footer style={{ background: T.brown, padding: "clamp(2.5rem,5vw,3.75rem) clamp(1rem,5vw,4.5rem) 2.5rem", color: "rgba(255,255,255,.7)" }}>
      <div className="rx-grid-footer">
        <div>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, color: "#fff", display: "block", marginBottom: 12 }}>
            Beleza<span style={{ color: T.rose30 }}>RS</span>
          </span>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, maxWidth: 260 }}>
            A plataforma de agendamento de salões de beleza mais elegante do Rio Grande do Sul.
          </p>
        </div>
        {[
          { title: "Produto",     links: ["Como funciona","Preços","Aplicativo mobile","API para desenvolvedores"] },
          { title: "Para salões", links: ["Cadastrar salão","Dashboard","Planos e preços","Central de ajuda"] },
          { title: "Empresa",     links: ["Sobre nós","Blog","Carreiras","Contato"] },
        ].map((col, i) => (
          <div key={i}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>{col.title}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l) => (
                <a key={l} href="#"
                  style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)", textDecoration: "none", transition: "color .15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.65)")}
                >{l}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 12 }}>© 2026 BelezaRS. Todos os direitos reservados.</p>
        <div style={{ display: "flex", gap: 16 }}>
          {["Privacidade","Termos","Cookies"].map((l) => (
            <a key={l} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,.5)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <LandingNav />
      <Hero />
      <HowItWorks />
      <FeaturedSalons />
      <Categories />
      <ForSalons />
      <Features />
      <Testimonials />
      <Pricing />
      <CTAFinal />
      <LandingFooter />
    </div>
  );
}
