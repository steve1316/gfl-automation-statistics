import { Sequelize, DataTypes, Model } from 'sequelize';

interface UserAddModel {
  username: string;
  password: string;
  email: string | null;
}

interface UserModel extends Model<UserModel, UserAddModel> {
  id: number;
  username: string;
  password: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

const User = (sequelize: Sequelize) => {
  const user = sequelize.define<UserModel, UserAddModel>(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return user;
};

export { UserAddModel, UserModel, User };
