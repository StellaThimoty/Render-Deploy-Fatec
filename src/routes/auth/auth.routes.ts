import { Router } from "express";
import AuthController from '../../controllers/auth/auth.controller'
const authRoutes = Router()

authRoutes.post('/register', AuthController.store)
authRoutes.post('/login', AuthController.login)
//authRoutes.get('/:id', AuthController.show)
//authRoutes.delete('/:id', AuthController.delete)
//authRoutes.put('/:id', AuthController.update)

export default authRoutes