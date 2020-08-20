import { Request, Response } from 'express';

import User from '../models/user';

class UserController {
  async store(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Registration falied' });
    }
  }
}
export default new UserController();
