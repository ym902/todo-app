import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const todos = [
    { task: "メール", deadline: new Date("2024-05-22") },
    { task: "買い物", deadline: new Date("2024-05-22") },
    // ↓ タスクを追加していく
  ];

  console.log(`Start seeding...`);
  for (const todo of todos) {
    const createdTodo = await prisma.todo.create({
      data: todo,
    });
    console.log(`Created todo with id: ${createdTodo.id}`);
  }
  console.log(`Seeding finished.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });