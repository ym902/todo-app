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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
/* GET users listing. */
// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.send('Hello');
// });
// GET (/api/tasks)
router.get('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const todos = yield prisma.todo.findMany();
    res.json(todos);
}));
// GET ID (/api/tasks/{task_id})
router.get('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // パラメーター(:id)のid取得
    const id = parseInt(req.params.id);
    const todo = yield prisma.todo.findUnique({
        where: {
            id,
        },
    });
    res.json(todo);
}));
// POST (/api/tasks)
router.post('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, deadline } = req.body;
    console.log("POST");
    console.log(deadline);
    try {
        const newTodo = yield prisma.todo.create({
            data: {
                task: task,
                deadline: new Date(deadline),
            },
        });
        res.status(201).json(newTodo);
    }
    catch (error) {
        console.error('タスク作成エラー:', error);
        res.status(500).json({ message: 'タスク作成時にエラーが発生しました' });
    }
}));
// PUT (/api/tasks/{task_id})
router.put('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { task, deadline, status } = req.body;
    console.log("statusの値:", status);
    try {
        const updatedTodo = yield prisma.todo.update({
            where: {
                id: id,
            },
            data: {
                task: task,
                deadline: new Date(deadline),
                status: status,
            },
        });
        res.json(updatedTodo);
    }
    catch (error) {
        res.status(500).json({ message: 'タスクの変更ができませんでした。' });
    }
}));
// DELETE (/api/tasks/{task_id})
router.delete('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const deletedTodo = yield prisma.todo.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(deletedTodo);
    }
    catch (error) {
        res.status(500).json({ message: 'タスクの削除ができませんでした。' });
    }
}));
exports.default = router;
