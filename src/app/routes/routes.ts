import { Router } from 'express';
import UserController from '../controllers/UserController';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'hello pvt' });
});
routes.post('/user', UserController.store);

export default routes;
