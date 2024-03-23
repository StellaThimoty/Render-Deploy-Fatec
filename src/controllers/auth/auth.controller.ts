import User from "../../models/user.entity";
import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import Token from '../../models/token.entity';

export default class AuthController{
    static async store(req:Request, res:Response) {
        const {name, email, password} = req.body
        if (!name) {return res.status(400).json({erro: "Nome obrigatório"})}
        if (!email) {return res.status(400).json({erro: "Email obrigatório"})}
        if (!password) {return res.status(400).json({erro: "Password obrigatório"})}
        
        const user = new User()
        user.name = name
        user.email = email
        user.password = bcrypt.hashSync(password,10)
        await user.save()

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email
        })

    }

    static async login(req: Request, res: Response) {
        const {email, password} = req.body

        if(!email || !password) return res.status(400).json({erro: "Usuário ou Senha inválidos"})

        const user = await User.findOneBy({email})
        if(!user) return res.status(401).json({erro: "Usuário ou Senha inválidos"})
        const passChk = bcrypt.compareSync(password, user.password)
        if(!passChk) return res.status(401).json({erro: "Usuário ou Senha inválidos"})

        await Token.delete({user: {id: user.id}})

        const token = new Token()
        const rand = user.id + new Date().getTime().toString()
        token.token = bcrypt.hashSync(rand,1).slice(-30)
        token.expiresAt = new Date(Date.now() + 60*60*1000)
        token.refreshToken = bcrypt.hashSync(2+rand,1).slice(-30)
        token.user = user
        await token.save()

        return res.json({
            token: token.token,
            expiresAt: token.expiresAt,
            refreshToken: token.refreshToken
        })
    }
}