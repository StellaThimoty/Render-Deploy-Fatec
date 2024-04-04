import { Request, Response } from "express"
import Profile from "../../models/profile.entity"
import Gender from "../../types/gender.type"
import User from "../../models/user.entity"


export default class ProfileController {
    static async store(req: Request, res: Response){
        const {age, gender, picture, bio} = req.body
        const {id} = req.params

        const user = await User.findOneBy({id: Number(id)})
        if(!user) return res.status(400).json({erro: 'Usuário não encontrado'})
        if(!age) return res.status(400).json({erro: 'Idade é obrigatória'})
        if(age<=18) return res.status(400).json({erro: 'Idade tem que ser maior ou igual que 18'})
        if(!gender) return res.status(400).json({erro: 'Gênero é obrigatório'})
        // if(!<Gender>gender) return res.status(400).json({erro: 'Insira um gênero válido'})
        const profile = new Profile()
        profile.userId = Number(user.id)
        profile.age = age ?? 18
        profile.gender = gender ?? "O"
        profile.bio = bio ?? ""
        profile.picture = picture ?? "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg"
        await profile.save()

        return res.status(201).json({
            age: profile.age,
            gender: profile.gender,
            bio: profile.bio,
            picture: profile.picture
        })
    }

    static async show(req: Request, res: Response){
        const { id } = req.params
        const { userId } = req.headers

        if(!userId) return res.status(401).json({ erro: 'Usuário não autenticado'})
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({erro: 'id é obrigatório'})
        }

        const profile = await Profile.findOneBy({userId: Number(id)})

        return !profile ? res.status(404).json({erro: 'Não encontrado'}) : res.status(200).json({
            age: profile.age,
            gender: profile.gender,
            bio: profile.bio,
            picture: profile.picture
        })

    }

    static async update(req: Request, res: Response){
        const { id } = req.params
        const { userId } = req.headers
        const {age, gender, picture, bio} = req.body

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({erro: 'id é obrigatório'})
        }
        if(!userId) return res.status(401).json({ erro: 'Usuário não autenticado'})
        // if(!<Gender>gender) return res.status(400).json({erro: 'Insira um gênero válido'})
        if(age<=18) return res.status(400).json({erro: 'Idade tem que ser maior ou igual que 18'})

        const profile = await Profile.findOneBy({id: Number(id), userId: Number(userId)})
        if (!profile) {
            return res.status(404).json({erro: 'Não encontrado'})
        } 

        profile.age = age ?? profile.age
        profile.gender = gender ?? profile.gender
        profile.bio = bio ?? profile.bio
        profile.picture = picture ?? profile.picture
    
        await profile.save()

        return res.status(200).json({
            age: profile.age,
            gender: profile.gender,
            bio: profile.bio,
            picture: profile.picture
        })
    }
}