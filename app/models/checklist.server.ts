import { prisma } from "~/db.server";

export type { Checklist } from "@prisma/client";

export async function getChecklists() {
  return prisma.checklist.findMany();
}

export async function getChecklist(id: string) {
  return prisma.checklist.findUnique({ where: { id } });
}
