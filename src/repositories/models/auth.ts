import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/config/db.config';

class Auth extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
}

export interface AuthModel extends Model {
  id: number;
  username: string;
  password: string;
}


Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'auth',
    timestamps: false,
    sequelize,
  }
);

export default Auth;
