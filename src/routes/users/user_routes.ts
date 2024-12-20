import { Router } from 'express';
import { loginUser, registerUser } from '../../controllers/users/user_controller';

const user_routes = Router();

// Rutas de usuario
user_routes.post('/register', registerUser);
user_routes.post('/login', loginUser);

export default user_routes;
