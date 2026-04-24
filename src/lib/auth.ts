import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          include: {
            ownedSalon: { select: { id: true, slug: true } },
          },
        });

        if (!user || !user.passwordHash) return null;

        const valid = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash
        );
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          salonId: user.ownedSalon?.id ?? user.salonId ?? null,
          salonSlug: user.ownedSalon?.slug ?? null,
        };
      },
    }),
  ],

  callbacks: {
    // Persiste dados extras no token JWT
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id ?? "";
        token.role = (user as { role: UserRole }).role;
        token.salonId = (user as { salonId: string | null }).salonId;
        token.salonSlug = (user as { salonSlug: string | null }).salonSlug;
      }

      // Permite atualizar sessão via update()
      if (trigger === "update" && session) {
        token.salonId = session.salonId;
        token.salonSlug = session.salonSlug;
      }

      return token;
    },

    // Expõe os dados na sessão do lado cliente
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.salonId = token.salonId as string | null;
        session.user.salonSlug = token.salonSlug as string | null;
      }
      return session;
    },
  },
});
