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
