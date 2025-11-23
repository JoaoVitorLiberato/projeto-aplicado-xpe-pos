import pg from "pg"
import dotenv from "dotenv";
import { Sequelize, Dialect } from "sequelize";

dotenv.config();

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => parseInt(value, 10));
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => parseFloat(value));

const Database = new Sequelize(
  process.env.APPLICATION_DB_INTEGRATION as string,
  {
    dialect: process.env.APPLICATION_DB_INTEGRATION_DIALECT as Dialect,
    dialectOptions: {
      useUTC: false,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)

export const ConnectDatabase = async () => {
  try {
    await Database.authenticate();
    // await Database.sync({ force: true }); // caso queira deletar todos os dados do banco de dados
    // await Database.sync({
    //   alter: {
    //     drop: false
    //   }
    // }); // caso queira apenas sicronizar do banco de dados
  } catch {
    console.error("Houve um erro ao conectar com o banco de dados, por favor, tente novamente.");
  }
}

Object.assign(Database, { ConnectDatabase });

export default Database;
