import { Request, Response } from "express";
import Task from "../../models/task.entity";

export default class TaskController {
    static async store(req: Request, res: Response){
        const {title, completed} = req.body;
        if(!title){
            return res.status(400).json({erro: 'Título é obrigatório nengue'});
        }

        const task = new Task();
        task.title = title;
        task.completed = completed ?? false;
        await task.save();

        return res.status(201).json(task);
    }
    static async index(req: Request, res: Response){
        const tasks = await Task.find()
        return res.status(200).json(tasks)
    }
    static async show(req: Request, res: Response){
        const { id } = req.params
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({erro: 'id é obrigatório nengue'})
        }
        const task = await Task.findOneBy({id: Number(id)})
        // if (!task) {
        //     return res.status(404).json({erro: 'Procura baixo nengue'})
        // } 

        // return res.json(task)
        return !task ? res.status(404).json({erro: 'Procura baixo negnue'}) : res.json(task)
    }
    static async delete(req: Request, res: Response){
        const { id } = req.params
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({erro: 'id é obrigatório nengue'})
        }
        const task = await Task.findOneBy({id: Number(id)})
        if (!task) {
            return res.status(404).json({erro: 'Procura baixo nengue'})
        } 

        task.remove()
        return res.status(204).json()
    }
    static async update(req: Request, res:Response){
        const { id } = req.params
        const { title, completed } = req.body


        if (!id || isNaN(Number(id))) {
            return res.status(400).json({erro: 'id é obrigatório nengue'})
        }
        const task = await Task.findOneBy({id: Number(id)})
        if (!task) {
            return res.status(404).json({erro: 'Procura baixo nengue'})
        } 

        task.title = title
        task.completed = (completed === undefined) ? task.completed : completed
        await task.save()

        return res.json(task)

    }
}