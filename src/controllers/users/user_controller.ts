import { Request, Response } from 'express';
import User from '../../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_name, user_last_name_p, user_last_name_m, user_password, user_email, user_image } = req.body;

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { user_email } });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    // Crear el nuevo usuario
    const newUser = await User.create({
      user_name,
      user_last_name_p,
      user_last_name_m,
      user_password,
      user_email,
      user_image,
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      user: { id: newUser.user_id, email: newUser.user_email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { user_email, user_password } = req.body;
  
      // Buscar el usuario por correo
      const user = await User.findOne({ where: { user_email } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
  
      // Comparar la contraseña
      const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
  
      // Generar un token JWT
      const token = jwt.sign({ id: user.user_id, email: user.user_email }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
  
      res.status(200).json({
        message: 'Inicio de sesión exitoso.',
        token,
        user: { id: user.user_id, email: user.user_email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
  };
