"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = [
            { task: "メール", deadline: new Date("2024-05-22") },
            { task: "買い物", deadline: new Date("2024-05-22") },
            // ↓ タスクを追加していく
        ];
        console.log(`Start seeding...`);
        for (const todo of todos) {
            const createdTodo = yield prisma.todo.create({
                data: todo,
            });
            console.log(`Created todo with id: ${createdTodo.id}`);
        }
        console.log(`Seeding finished.`);
    });
}
seed()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
