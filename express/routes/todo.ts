import express, { Request, Response, NextFunction, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

/* GET users listing. */
// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.send('Hello');
// });

// GET (/api/tasks)
router.get('/api/tasks', async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// GET ID (/api/tasks/{task_id})
router.get('/api/tasks/:id', async (req: Request, res: Response) => {
  // パラメーター(:id)のid取得
  const id = parseInt(req.params.id);
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  res.json(todo);
});

// POST (/api/tasks)
router.post('/api/tasks', async (req: Request, res: Response) => {
  const { task, deadline }: { task: string; deadline: string; } = req.body;
  console.log("POST");
  console.log(deadline);
  try {
    const newTodo = await prisma.todo.create({
      data: {
        task: task,
        deadline: new Date(deadline),
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('タスク作成エラー:', error);
    res.status(500).json({ message: 'タスク作成時にエラーが発生しました' });
  }
});

// PUT (/api/tasks/{task_id})
router.put('/api/tasks/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { task, deadline, status } = req.body;
  console.log("statusの値:", status);
  try {
    const updatedTodo = await prisma.todo.update({
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
  } catch (error) {
    res.status(500).json({ message: 'タスクの変更ができませんでした。' });
  }
});

// DELETE (/api/tasks/{task_id})
router.delete('/api/tasks/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ message: 'タスクの削除ができませんでした。' });
  }
});

export default router;
