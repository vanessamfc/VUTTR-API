import { Router } from 'express';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';
import ToolsController from '../controllers/ToolsController';
import auth from '../middlewares/auth';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'hello pvt' });
});
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.use(auth);

routes.post('/tools', ToolsController.store);
routes.get('/tools/:toolId', ToolsController.index);
routes.put('/tools/:toolId', ToolsController.update);
routes.delete('/tools/:toolId', ToolsController.delete);
export default routes;
