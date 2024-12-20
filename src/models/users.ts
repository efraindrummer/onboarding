import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/database';

// Define la interfaz para el modelo
interface UserAttributes {
  user_id: number;
  user_name: string;
  user_last_name_p: string;
  user_last_name_m: string;
  user_password: string;
  user_email: string;
  user_image?: string | null; // Campo opcional
}

// Define los atributos opcionales al crear
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

// Extiende el modelo con Sequelize y tus atributos
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public user_name!: string;
  public user_last_name_p!: string;
  public user_last_name_m!: string;
  public user_password!: string;
  public user_email!: string;
  public user_image!: string | null;
}

// Define el modelo
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    user_last_name_p: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    user_last_name_m: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    user_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Users',
    freezeTableName: true,
    timestamps: false,
  }
);

// Hook para encriptar contraseñas antes de crear
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.user_password = await bcrypt.hash(user.user_password, salt);
});

// Hook para encriptar contraseñas antes de actualizar
User.beforeUpdate(async (user) => {
  if (user.changed('user_password')) {
    const salt = await bcrypt.genSalt(10);
    user.user_password = await bcrypt.hash(user.user_password, salt);
  }
});

export default User;
