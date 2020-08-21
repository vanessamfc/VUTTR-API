import { Request, Response } from 'express';
import * as Yup from 'yup';
import User from '../models/user';
import Tools from '../models/tools';

class ToolsController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string(),
      tags: Yup.array().of(String),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const tools = await Tools.create(req.body);
    return res.json(user);

    return res.status(400).json({ error: 'Registration falied' });
  }
}
export default new ToolsController();
