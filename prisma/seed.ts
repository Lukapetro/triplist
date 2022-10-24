import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "test@test.it";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.checklist.deleteMany();

  const hashedPassword = await bcrypt.hash("test1234", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.checklist.create({
    data: {
      title: "Mare",
      description:
        "Stai andando a prendere il sole? ecco tutto quello che ti serve",
      imgUrl: "imgURl here",
    },
  });

  const documentTaskGroup = await prisma.taskGroup.create({
    data: {
      title: "Documenti",
    },
  });

  await prisma.task.create({
    data: {
      title: "Passaporto",
      taskGroup: {
        connect: {
          id: documentTaskGroup.id,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
