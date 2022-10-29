import { prisma } from "~/db.server";

export type { Checklist } from "@prisma/client";

export async function getChecklists() {
  return prisma.checklist.findMany();
}

export async function getChecklist(id: string) {
  return prisma.checklist.findFirst({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      taskGroups: {
        select: {
          id: true,
          title: true,
          isDone: true,
          tasks: true,
        },
      },
    },
  });
}

export async function createChecklist() {
  return prisma.checklist.create({
    data: {
      title: "Mare",
      description:
        "Stai andando a prendere il sole? ecco tutto quello che ti serve",
      imgUrl: "imgURl here",
    },
  });
}

export async function updateChecklist(checklistId: string) {
  return prisma.checklist.update({
    where: { id: checklistId },
    data: {
      title: "test update",
    },
  });
}
