import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

export interface IUserAttributes {
  id?: string;
  username: string;
  email: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  confirmed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInstance
  extends Sequelize.Instance<IUserAttributes>,
    IUserAttributes {}

export default function UserModel(
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<IUserInstance, IUserAttributes> {
  return sequelize.define<IUserInstance, IUserAttributes>(
    'Users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      firstname: { type: DataTypes.STRING },
      lastname: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING, allowNull: false },
      confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      hooks: {
        beforeCreate: async (user: any) => {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  );
}
