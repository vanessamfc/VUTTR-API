import { Request, Response } from 'express';
import * as Yup from 'yup';
import validate from '../validator/validator';
import Tools, { ITools } from '../models/tools';

class ToolsController {
  async index(req: Request, res: Response) {
    const { userId } = req;
    const { toolId } = req.params;

    const tool = await Tools.findOne({ user: userId, _id: toolId });

    if (!tool) {
      return res.status(404).json({ message: 'tool not found' });
    }

    return res.json(tool);
  }

  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string(),
      tags: Yup.array().of(Yup.string()),
    });
    const data = await validate(schema, req.body);

    const { userId } = req;

    const tools = await Tools.create({ ...data, user: userId });
    return res.json(tools);

    // return res.status(400).json({ error: 'Registration falied' });
  }

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string(),
      tags: Yup.array().of(Yup.string()),
    });
    let data;
    try {
      data = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: true,
      });
    } catch (error) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { userId } = req;
    const { title, link, description, tags } = data as ITools;
    const { toolId } = req.params;

    const findTool = await Tools.findOne({ user: userId, _id: toolId });

    if (!findTool) {
      return res.status(400).json({ message: 'tool not found' });
    }

    findTool.set({
      title,
      link,
      description,
      tags,
    });
    const response = await findTool.save();
    return res.json(response);
  }

  async delete(req: Request, res: Response) {
    const schema = Yup.object().shape({});

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { userId } = req;
    const { toolId } = req.params;

    const findTool = await Tools.findOne({ user: userId, _id: toolId });

    if (!findTool) {
      return res.status(400).json({ message: 'user or tool not found' });
    }

    await findTool.remove();

    return res.status(204).send();
  }
}
export default new ToolsController();
