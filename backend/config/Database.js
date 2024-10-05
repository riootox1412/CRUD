import { Sequelize } from "sequelize";

const db = new Sequelize("yoo_crud", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
