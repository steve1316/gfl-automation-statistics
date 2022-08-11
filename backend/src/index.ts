import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import db from './models/index';
import userRoutes from './routes/user.routes';

dotenv.config();

////////////////////
// Middleware
const app = express();

// Parse incoming data.
app.use(express.json());

// CORS middleware.
app.use(
  cors({
    origin: ['http://localhost:4200', 'https://gfl-automation-statistics.com'],
    credentials: true,
  })
);

// Allow requests of Content-Type: "application/x-www-form-urlencoded".
app.use(express.urlencoded({ extended: true }));

// Sync up the Sequelize models with MySQL.
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced database.');
  })
  .catch((err: Error) => {
    console.error('Failed to sync database: ', err.message);
  });

app.use('/api/auth/user', userRoutes);

////////////////////
// Start the Express server on the specified port.
app.listen(process.env.EXPRESS_PORT || 5200, () => {
  console.log(
    `Express server started on port ${process.env.EXPRESS_PORT || 5200}.`
  );
});
