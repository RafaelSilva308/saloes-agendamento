import { PrismaClient, UserRole, SubscriptionStatus, SubscriptionPlan, DayOfWeek } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Super Admin da plataforma
  const adminHash = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@salonbook.com.br" },
    update: {},
    create: {
      name: "Admin SaaS",
      email: "admin@salonbook.com.br",
      passwordHash: adminHash,
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log("✅ Super Admin criado:", admin.email);

  // Dono do salão de exemplo
  const ownerHash = await bcrypt.hash("salon123", 12);
  const owner = await prisma.user.upsert({
    where: { email: "ana@studiobella.com.br" },
    update: {},
    create: {
      name: "Ana Lima",
      email: "ana@studiobella.com.br",
      passwordHash: ownerHash,
      role: UserRole.SALON_OWNER,
    },
  });

  // Salão de exemplo
  const salon = await prisma.salon.upsert({
    where: { slug: "studio-bella" },
    update: {},
    create: {
      name: "Studio Bella",
      slug: "studio-bella",
      description: "Salão especializado em beleza feminina",
      phone: "(11) 99999-0000",
      email: "contato@studiobella.com.br",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      ownerId: owner.id,
    },
  });
  console.log("✅ Salão criado:", salon.name);

  // Atualiza o owner com o salonId
  await prisma.user.update({
    where: { id: owner.id },
    data: { salonId: salon.id },
  });

  // Assinatura trial
  await prisma.subscription.upsert({
    where: { salonId: salon.id },
    update: {},
    create: {
      salonId: salon.id,
      plan: SubscriptionPlan.STARTER,
      status: SubscriptionStatus.TRIALING,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias
    },
  });

  // Serviços
  const services = await Promise.all([
    prisma.service.create({
      data: {
        salonId: salon.id,
        name: "Corte Feminino",
        description: "Corte e finalização",
        durationMin: 60,
        price: 80.0,
      },
    }),
    prisma.service.create({
      data: {
        salonId: salon.id,
        name: "Coloração",
        description: "Coloração completa com hidratação",
        durationMin: 120,
        price: 180.0,
      },
    }),
    prisma.service.create({
      data: {
        salonId: salon.id,
        name: "Manicure",
        description: "Manicure completa",
        durationMin: 45,
        price: 45.0,
      },
    }),
  ]);
  console.log("✅ Serviços criados:", services.length);

  // Profissional
  const professional = await prisma.professional.create({
    data: {
      salonId: salon.id,
      name: "Camila Santos",
      specialty: "Coloração e Corte",
      bio: "10 anos de experiência em coloração",
      services: {
        create: services.map((s) => ({ serviceId: s.id })),
      },
      availability: {
        create: [
          DayOfWeek.MONDAY,
          DayOfWeek.TUESDAY,
          DayOfWeek.WEDNESDAY,
          DayOfWeek.THURSDAY,
          DayOfWeek.FRIDAY,
        ].map((day) => ({
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "18:00",
        })),
      },
    },
  });
  console.log("✅ Profissional criada:", professional.name);

  // Horários de funcionamento do salão
  await prisma.workingHours.createMany({
    data: [
      { salonId: salon.id, dayOfWeek: DayOfWeek.MONDAY, openTime: "09:00", closeTime: "19:00" },
      { salonId: salon.id, dayOfWeek: DayOfWeek.TUESDAY, openTime: "09:00", closeTime: "19:00" },
      { salonId: salon.id, dayOfWeek: DayOfWeek.WEDNESDAY, openTime: "09:00", closeTime: "19:00" },
      { salonId: salon.id, dayOfWeek: DayOfWeek.THURSDAY, openTime: "09:00", closeTime: "19:00" },
      { salonId: salon.id, dayOfWeek: DayOfWeek.FRIDAY, openTime: "09:00", closeTime: "19:00" },
      { salonId: salon.id, dayOfWeek: DayOfWeek.SATURDAY, openTime: "09:00", closeTime: "16:00" },
      { salonId: salon.id, dayOfWeek: DayOfWeek.SUNDAY, openTime: "00:00", closeTime: "00:00", isOpen: false },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Horários de funcionamento configurados");

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log("──────────────────────────────────");
  console.log("Admin:     admin@salonbook.com.br / admin123");
  console.log("Salão:     ana@studiobella.com.br / salon123");
  console.log("Landing:   /studio-bella");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
