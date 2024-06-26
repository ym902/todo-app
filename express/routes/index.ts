import { Request, Response, NextFunction, Router } from 'express';

const router: Router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Express' });
});

export default router;