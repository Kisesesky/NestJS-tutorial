import { join } from "path";
import { DataSource } from "typeorm";

const entity = join(__dirname, '/**/*.entity{.ts,.js}')
const migration = join(__dirname, './migrations/**/*{.ts,.js}'); 


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: `tjdgh1324!`,
    database: 'nest_test2',
    // synchronize: true, //Migrations = synchronize: false
    entities: [entity],
    migrations: [migration]
});