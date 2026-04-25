"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { T } from "@/lib/theme";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    salonName: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (form.password.length < 6) {
      setError("A senha deve ter ao menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          salonName: form.salonName,
          phone: form.phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao criar conta.");
        return;
      }

      router.push("/login?registered=1");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const field = (
    name: keyof typeof form,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: T.ink,
          marginBottom: 7,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        required
        placeholder={placeholder}
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
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: T.cream,
        fontFamily: "var(--font-sans)",
        padding: "40px 20px",
      }}
    >
      {/* Orb decorativo */}
      <div
        style={{
          position: "fixed",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle,${T.rose20} 0%,transparent 70%)`,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: T.white,
          borderRadius: 28,
          border: `1px solid ${T.border}`,
          boxShadow: "0 32px 80px rgba(44,26,20,.08)",
          padding: "48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 26,
              fontWeight: 700,
              color: T.ink,
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 12,
            }}
          >
            Beleza<span style={{ color: T.terra }}>RS</span>
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 26,
              fontWeight: 700,
              color: T.ink,
              marginBottom: 6,
            }}
          >
            Cadastre seu salão
          </h1>
          <p style={{ fontSize: 14, color: T.muted }}>
            14 dias grátis, sem cartão de crédito
          </p>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: T.badge,
            border: `1px solid ${T.border}`,
            borderRadius: 24,
            padding: "8px 16px",
            marginBottom: 28,
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: T.green,
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 12, color: T.terra, fontWeight: 600 }}>
            +2.800 salões já cadastrados no RS
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="rx-register-grid">
            {field("name", "Seu nome", "text", "Ex: Isabela Costa")}
            {field("salonName", "Nome do salão", "text", "Ex: Studio Éclat")}
          </div>

          {field("email", "E-mail profissional", "email", "contato@meusalao.com")}
          {field("phone", "Telefone / WhatsApp", "tel", "(51) 9 9999-9999")}

          <div className="rx-register-grid">
            {field("password", "Senha", "password", "Mínimo 6 caracteres")}
            {field("confirmPassword", "Confirmar senha", "password", "Repita a senha")}
          </div>

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
              marginBottom: 16,
            }}
          >
            {loading ? "Criando conta…" : "Começar grátis →"}
          </button>

          <p
            style={{
              fontSize: 11,
              color: T.muted,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Ao se cadastrar, você concorda com nossos{" "}
            <a href="#" style={{ color: T.terra, textDecoration: "none" }}>
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" style={{ color: T.terra, textDecoration: "none" }}>
              Política de Privacidade
            </a>
          </p>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 14,
            color: T.muted,
          }}
        >
          Já tem conta?{" "}
          <Link
            href="/login"
            style={{ color: T.terra, fontWeight: 600, textDecoration: "none" }}
          >
            Entrar
          </Link>
        </p>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: T.muted }}>
          <Link href="/" style={{ color: T.terra, textDecoration: "none" }}>
            ← Voltar para o início
          </Link>
        </p>
      </div>
    </div>
  );
}
