import { join } from "path";
import { DataSource } from "typeorm";

const dataBase = new DataSource({
    type: 'sqlite',
    database: process.env.DATABASE   || './src/database/db.sqlite',
    logging: true,
    synchronize: true,
    entities: [
        join(__dirname, '..', 'models/*.entity.{ts,js}')
    ]
});

dataBase.initialize()
.then(()=>{
    console.log(`Banco de dados inicializado nengue`);
})
.catch((err)=>{
    console.log(`Deu ruim aí nengue, tás maluco é? ${err}`);
});

export default dataBase;