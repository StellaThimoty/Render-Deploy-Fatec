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
    console.log(`Corre baixo na porta ${port} nengue`);
    console.log(dataBase.isInitialized ? "Tô de boa nengue" : "Tô bem não oo")
})