import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/config/db.config';
import Auth from './auth';

export class User extends Model {
  public id!: number;
  public cpf!: string;
  public name!: string;
  public birth_date!: Date;
  public street!: string;
  public house_number!: string;
  public complement!: string;
  public neighborhood!: string;
  public city!: string;
  public state!: string;
  public zip_code!: string;
  public status!: boolean;
  public created_at!: Date;
  public created_by!: number;
  public updated_at!: Date | null;
  public updated_by!: number | null;
  public deleted_at!: Date | null;
  public deleted_by!: number | null;

  public readonly createdBy?: Auth;
  public readonly updatedBy?: Auth;
  public readonly deletedBy?: Auth;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    house_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auth',
        key: 'id',
      },
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'auth',
        key: 'id',
      },
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'auth',
        key: 'id',
      },
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  }
);

User.belongsTo(Auth, { foreignKey: 'created_by', as: 'createdBy' });
User.belongsTo(Auth, { foreignKey: 'updated_by', as: 'updatedBy' });
User.belongsTo(Auth, { foreignKey: 'deleted_by', as: 'deletedBy' });

export default User;
