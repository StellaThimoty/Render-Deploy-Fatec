import { Request, Response } from "express"
import Task from "../../models/task.entity"

export default class TaskController {
    static async store(req: Request, res: Response){
        const {title, completed} = req.body
        const {userId} = req.headers

        if(!userId) return res.status(401).json({erro: 'Usuário não autenticado'})
        if(!title) return res.status(400).json({erro: 'Título é obrigatório'})

        const task = new Task()
        task.title = title
        task.completed = completed ?? false
        task.userId = Number(userId)
        await task.save()

        return res.status(201).json(task)
    }
    static async index(req: Request, res: Response){
        const { userId } = req.headers

        if(!userId) return res.status(401).json({ erro: 'Usuário não autenticado'})

        const tasks = await Task.find({where: { userId: Number(userId)}})

        return res.status(200).json(tasks)
    }
    static async show(req: Request, res: Response){
        const { id } = req.params
        const {userId} = req.headers

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({erro: 'id é obrigatório'})
        }

        if(!userId) return res.status(401).json({ erro: 'Usuário não autenticado'})
        const task = await Task.findOneBy({id: Number(id), userId: Number(userId)})
        // if (!task) {
        //     return res.status(404).json({erro: 'Não encontrado'})
        // } 

        // return res.json(task)
        return !task ? res.status(404).json({erro: 'Não encontrado'}) : res.json(task)
    }
    static async delete(req: Request, res: Response){
        const { id } = req.params
        const { userId } = req.headers

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({erro: 'id é obrigatório'})
        }

        if(!userId) return res.status(401).json({ erro: 'Usuário não autenticado'})

        const task = await Task.findOneBy({id: Number(id), userId: Number(userId)})

        if (!task) {
            return res.status(404).json({erro: 'Não encontrado'})
        } 

        await task.remove()
        return res.status(204).json()
    }
    static async update(req: Request, res:Response){
        const { id } = req.params
        const {userId} = req.headers

        const { title, completed } = req.body


        if (!id || isNaN(Number(id))) {
            return res.status(400).json({erro: 'id é obrigatório'})
        }
        if(!userId) return res.status(401).json({ erro: 'Usuário não autenticado'})

        const task = await Task.findOneBy({id: Number(id), userId: Number(userId)})
        if (!task) {
            return res.status(404).json({erro: 'Não encontrado'})
        } 

        task.title = title ?? task.title
        task.completed = (completed === undefined) ? task.completed : completed
        await task.save()

        return res.json(task)

    }
}