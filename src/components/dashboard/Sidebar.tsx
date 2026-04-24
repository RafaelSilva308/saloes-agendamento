"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/lib/theme";

const navItems = [
  {
    href: "/dashboard",
    label: "Início",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/dashboard/agenda",
    label: "Agenda",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    badge: 5,
  },
  {
    href: "/dashboard/clientes",
    label: "Clientes",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/relatorios",
    label: "Relatórios",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/servicos",
    label: "Serviços",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/configuracoes",
    label: "Configurações",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

interface SidebarProps {
  salonName?: string;
  ownerName?: string;
  plan?: string;
}

export default function Sidebar({
  salonName = "Studio Éclat",
  ownerName = "Isabela Costa",
  plan = "Pro",
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="rx-sidebar-wrap"
      style={{ background: "#fff", borderRight: `1px solid ${T.border}` }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 24px 24px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22,
            fontWeight: 700,
            color: T.ink,
            letterSpacing: -0.3,
          }}
        >
          Beleza<span style={{ color: T.terra }}>RS</span>
        </div>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 3, letterSpacing: 0.3 }}>
          Painel do Salão
        </div>
      </div>

      {/* Info do salão */}
      <div
        style={{
          padding: "16px 20px",
          margin: 12,
          background: T.rose10,
          borderRadius: 14,
          border: `1px solid ${T.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: `linear-gradient(135deg,${T.rose30},${T.terra})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "#fff",
              fontWeight: 700,
              fontFamily: "var(--font-serif)",
            }}
          >
            {salonName[0]}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>
              {salonName}
            </div>
            <div style={{ fontSize: 11, color: T.terra, fontWeight: 500 }}>
              ✦ Plano {plan}
            </div>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "11px 20px",
                cursor: "pointer",
                background: isActive ? T.rose10 : "transparent",
                borderRight: isActive
                  ? `3px solid ${T.terra}`
                  : "3px solid transparent",
                color: isActive ? T.terra : T.muted,
                fontWeight: isActive ? 600 : 400,
                fontSize: 13.5,
                textDecoration: "none",
                transition: "all .15s",
                position: "relative",
              }}
            >
              <span style={{ color: isActive ? T.terra : T.muted }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    background: T.terra,
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Perfil */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: `linear-gradient(135deg,${T.rose30},${T.terraDark})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {ownerName[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: T.ink,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ownerName}
          </div>
          <div style={{ fontSize: 11, color: T.muted }}>Proprietária</div>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={T.muted}
          strokeWidth="1.8"
          style={{ flexShrink: 0, cursor: "pointer" }}
        >
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9" />
        </svg>
      </div>
    </aside>
  );
}

/* ── BOTTOM NAV (mobile) ─────────────────────────────────────── */
export function BottomNav() {
  const pathname = usePathname();
  const bottomItems = navItems.slice(0, 5);

  return (
    <nav className="rx-bottom-nav">
      {bottomItems.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "4px 12px",
              color: isActive ? T.terra : T.muted,
              textDecoration: "none",
              position: "relative",
              minWidth: 44,
              minHeight: 44,
              justifyContent: "center",
            }}
          >
            <span style={{ color: isActive ? T.terra : T.muted }}>{item.icon}</span>
            <span style={{ fontSize: 9, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
            {item.badge && (
              <span style={{ position: "absolute", top: 2, right: 6, background: T.terra, color: "#fff", fontSize: 8, fontWeight: 700, width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
