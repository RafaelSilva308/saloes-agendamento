import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formata preço em BRL
export function formatCurrency(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num);
}

// Gera slug a partir de um nome
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

// Formata data para exibição em pt-BR
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

// Formata hora HH:MM
export function formatTime(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

// Verifica se um horário de início + duração conflita com um agendamento existente
export function hasTimeConflict(
  newStart: Date,
  durationMin: number,
  existingStart: Date,
  existingEnd: Date
): boolean {
  const newEnd = new Date(newStart.getTime() + durationMin * 60 * 1000);
  return newStart < existingEnd && newEnd > existingStart;
}
