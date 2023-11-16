import { Request, Response, Router } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World from indexRoute!');
});

export default router;