import config from '../config/db.config';
import { Dialect, Sequelize } from 'sequelize';
import { User } from './user.model';

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: (config.dialect as Dialect) || 'mysql',
  pool: {
    min: config.pool.min,
    max: config.pool.max,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

export default {
  sequelize: sequelize,
  models: {
    user: User(sequelize),
  },
};
