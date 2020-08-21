import { Router } from 'express';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';
import auth from '../middlewares/auth';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'hello pvt' });
});
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.use(auth);

export default routes;
