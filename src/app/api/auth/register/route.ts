import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  salonName: z.string().min(2),
  phone: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos." },
        { status: 400 }
      );
    }

    const { name, email, password, salonName, phone } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Gera slug único para o salão
    let slug = slugify(salonName);
    const slugExists = await prisma.salon.findUnique({ where: { slug } });
    if (slugExists) slug = `${slug}-${Date.now()}`;

    // Cria usuário + salão em transação
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          phone,
          role: "SALON_OWNER",
        },
      });

      const salon = await tx.salon.create({
        data: {
          name: salonName,
          slug,
          ownerId: newUser.id,
        },
      });

      await tx.user.update({
        where: { id: newUser.id },
        data: { salonId: salon.id },
      });

      // Trial de 14 dias
      await tx.subscription.create({
        data: {
          salonId: salon.id,
          plan: "STARTER",
          status: "TRIALING",
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });

      return newUser;
    });

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      { status: 500 }
    );
  }
}
