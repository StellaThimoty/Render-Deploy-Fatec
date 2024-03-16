import express from 'express';
import dataBase from './database/ormconfig';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 10800;

app.use(express.json());
app.use(cors())
app.use(routes);

app.listen(port, ()=>{
    console.log(`Funcionando na porta ${port}`);
    console.log(dataBase.isInitialized ? "DB Inicializado" : "DB ainda não inicizalizado")
})