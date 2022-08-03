import dotenv from 'dotenv';

dotenv.config();

export default {
  HOST: process.env.HOST!,
  USER: process.env.USER!,
  PASSWORD: process.env.PASSWORD!,
  DB: process.env.DB!,
  dialect: process.env.dialect!,

  // For Sequelize pool configuration.
  pool: {
    min: 0, // Minimum number of connection in pool.
    max: 5, // Maximum number of connection in pool.
    acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released.
    idle: 10000, // Maximum time, in milliseconds, that the pool will try to get connection before throwing an error.
  },
};
