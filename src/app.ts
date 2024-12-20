import express from 'express';
import dotenv from 'dotenv';
import db from './config/database';
import user_routes from './routes/users/user_routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', user_routes);

const startServer = async () => {
  try {
    // Conexión a la base de datos
    await db.authenticate();
    console.log('Database connected successfully');

    // Sincronizar los modelos con la base de datos
    await db.sync({ alter: true });
    console.log('Models synchronized');

    // Iniciar el servidor en el puerto especificado
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
