import type {
  User,
  Salon,
  Service,
  Professional,
  Appointment,
  Subscription,
  UserRole,
  AppointmentStatus,
  SubscriptionStatus,
  SubscriptionPlan,
} from "@prisma/client";

// Re-exports dos tipos gerados pelo Prisma
export type {
  User,
  Salon,
  Service,
  Professional,
  Appointment,
  Subscription,
  UserRole,
  AppointmentStatus,
  SubscriptionStatus,
  SubscriptionPlan,
};

// Tipos compostos para uso nas páginas
export type SalonWithRelations = Salon & {
  owner: User;
  subscription: Subscription | null;
  _count: {
    professionals: number;
    services: number;
    appointments: number;
  };
};

export type AppointmentWithRelations = Appointment & {
  service: Service;
  professional: Professional;
  client: User | null;
};

export type ProfessionalWithServices = Professional & {
  services: { service: Service }[];
};

// Payload da sessão NextAuth estendida
export type SessionUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  salonId: string | null;
  salonSlug: string | null;
};

// Input para criação de agendamento (landing page)
export type BookingInput = {
  salonId: string;
  serviceId: string;
  professionalId: string;
  date: string;         // ISO string
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  notes?: string;
};

// Slot de horário disponível retornado pela API
export type TimeSlot = {
  time: string;        // "09:00"
  available: boolean;
};
