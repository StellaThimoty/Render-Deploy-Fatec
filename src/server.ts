import express from 'express';
import dataBase from './database/ormconfig';
import routes from './routes';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
dotenv.config()
const port = process.env.PORT || 7500;

app.use(express.json());
app.use(cors())
app.use(routes);

app.listen(port, ()=>{
    console.log(`Funcionando na porta ${port}`);
    console.log(dataBase.isInitialized ? "DB Inicializado" : "DB ainda não inicizalizado")
})