import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authConfig from '../../config/auth';
import User from '../models/user';

class SessionController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }

    const verification = await bcrypt.compare(password, user.password);

    if (!verification) {
      return res.status(400).json({ msg: 'error' });
    }

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({ token });
  }
}
export default new SessionController();
