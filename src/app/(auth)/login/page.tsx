"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { T } from "@/lib/theme";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: T.cream,
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* PAINEL ESQUERDO — decorativo (hidden on mobile) */}
      <div
        className="rx-auth-left"
        style={{
          background: `linear-gradient(135deg,${T.brown} 0%,#5a3028 100%)`,
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,.04)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 36,
              fontWeight: 700,
              color: "#fff",
              display: "block",
              marginBottom: 16,
            }}
          >
            Beleza<span style={{ color: T.rose30 }}>RS</span>
          </span>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 28,
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 16,
              maxWidth: 360,
            }}
          >
            Sua beleza,
            <br />
            <em style={{ color: T.rose30 }}>gerenciada com elegância.</em>
          </p>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,.65)",
              lineHeight: 1.7,
              maxWidth: 340,
            }}
          >
            Mais de 2.800 salões confiam no BelezaRS para gerenciar seus agendamentos.
          </p>

          {/* Mini preview */}
          <div
            style={{
              marginTop: 40,
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(10px)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,.12)",
              padding: "20px 24px",
              textAlign: "left",
            }}
          >
            {[
              { t: "09:00", n: "Mariana S.", done: true },
              { t: "12:00", n: "Gabriela T.", now: true },
              { t: "14:30", n: "Ana B. Melo", done: false },
            ].map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "7px 0",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,.08)" : "none",
                  opacity: a.done ? 0.45 : 1,
                }}
              >
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.6)", width: 40 }}>{a.t}</span>
                <div
                  style={{
                    width: 3,
                    height: 28,
                    borderRadius: 2,
                    background: a.now ? T.rose30 : "rgba(255,255,255,.3)",
                  }}
                />
                <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{a.n}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 10,
                    background: a.now ? T.terra : "rgba(255,255,255,.1)",
                    color: "#fff",
                  }}
                >
                  {a.done ? "Concluído" : a.now ? "Em andamento" : "Aguardando"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAINEL DIREITO — formulário */}
      <div className="rx-auth-right" style={{ background: T.white }}>
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ marginBottom: 40 }}>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 30,
                fontWeight: 700,
                color: T.ink,
                marginBottom: 8,
              }}
            >
              Bem-vinda de volta ✦
            </h1>
            <p style={{ fontSize: 15, color: T.muted }}>
              Entre na sua conta para gerenciar seu salão
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* E-mail */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.ink,
                  marginBottom: 7,
                }}
              >
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: `1.5px solid ${T.border}`,
                  borderRadius: 12,
                  fontSize: 14,
                  color: T.ink,
                  outline: "none",
                  background: T.white,
                  fontFamily: "var(--font-sans)",
                  transition: "border-color .2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = T.terra)}
                onBlur={(e) => (e.target.style.borderColor = T.border)}
              />
            </div>

            {/* Senha */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.ink,
                  marginBottom: 7,
                }}
              >
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: `1.5px solid ${T.border}`,
                  borderRadius: 12,
                  fontSize: 14,
                  color: T.ink,
                  outline: "none",
                  background: T.white,
                  fontFamily: "var(--font-sans)",
                  transition: "border-color .2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = T.terra)}
                onBlur={(e) => (e.target.style.borderColor = T.border)}
              />
            </div>

            <div style={{ textAlign: "right", marginBottom: 24 }}>
              <a
                href="#"
                style={{
                  fontSize: 12,
                  color: T.terra,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Esqueci minha senha
              </a>
            </div>

            {/* Erro */}
            {error && (
              <div
                style={{
                  background: T.redBg,
                  border: `1px solid ${T.red}33`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: T.red,
                  marginBottom: 18,
                }}
              >
                {error}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: loading ? T.rose30 : T.terra,
                color: "#fff",
                border: "none",
                borderRadius: 32,
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 6px 24px rgba(193,127,107,.3)",
                transition: "all .2s",
                fontFamily: "var(--font-sans)",
              }}
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "24px 0",
            }}
          >
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ fontSize: 12, color: T.muted }}>ou</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>

          {/* Google */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            style={{
              width: "100%",
              padding: "12px",
              background: T.white,
              border: `1.5px solid ${T.border}`,
              borderRadius: 32,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: T.ink,
              transition: "border-color .2s",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.terra)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: 28,
              fontSize: 14,
              color: T.muted,
            }}
          >
            Não tem conta?{" "}
            <Link
              href="/register"
              style={{ color: T.terra, fontWeight: 600, textDecoration: "none" }}
            >
              Cadastre-se grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
