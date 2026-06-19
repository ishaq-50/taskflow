import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
    }
  });
  console.log(JSON.stringify(tasks, null, 2));
}

main().finally(() => prisma.$disconnect());
