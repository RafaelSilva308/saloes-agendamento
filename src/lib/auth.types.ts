// Extensão dos tipos do NextAuth v5 / Auth.js para campos customizados
import type { DefaultSession } from "next-auth";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      salonId: string | null;
      salonSlug: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    salonId: string | null;
    salonSlug: string | null;
  }
}

// Augmentação do JWT via @auth/core
declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    salonId: string | null;
    salonSlug: string | null;
  }
}
