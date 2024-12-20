import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.DB_NAME || 'my_database', // Nombre de la base de datos
  process.env.DB_USER || 'root',        // Usuario de la base de datos
  process.env.DB_PASSWORD || '',        // Contraseña de la base de datos
  {
    host: process.env.DB_HOST || 'localhost', // Dirección del servidor de la base de datos
    dialect: 'mysql',                         // Dialecto de Sequelize para MySQL
    logging: false,                           // Deshabilita el log de SQL (opcional)
  }
);

export default db;
