import { join } from "path";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config()

const dataBase = new DataSource({
    type: 'better-sqlite3',
    database: process.env.DATABASE || './db/datab.sql',
    logging: true,
    synchronize: true,
    entities: [
        join(__dirname, '..', 'models/*.entity.{ts,js}')
    ]
});

dataBase.initialize()
.then(()=>{
    console.log(`Banco de dados inicializado`);
})
.catch((err)=>{
    console.log(`Aconteceu um erro: ${err}`);
});

export default dataBase;