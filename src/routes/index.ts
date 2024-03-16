import { Router } from "express";
import taskRoutes from './task/task.routes';

const routes = Router();

routes.use('/',taskRoutes);

export default routes