import { Router } from "express";
import ProfileController from '../../controllers/user/profile.controller'
import authMiddleware from "../../middleware/auth.middleware";
const userRoutes = Router()

userRoutes.get('/:id', authMiddleware, ProfileController.show)
userRoutes.post('/:id', authMiddleware, ProfileController.store)
userRoutes.put('/:id', authMiddleware, ProfileController.update)

export default userRoutes