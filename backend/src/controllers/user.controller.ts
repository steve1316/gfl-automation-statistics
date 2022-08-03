import { Request, Response } from 'express';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserAddModel } from 'src/models/user.model';

const user = db.models.user;

export const create = async (req: Request, res: Response) => {
  // Validate the request.
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: 'Missing username or password parameter.',
    });
    return;
  }

  // Create the new user along with hashing their password.
  const salt = await bcrypt.genSalt();
  const newUser: UserAddModel = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, salt),
    email: req.body.email ? req.body.email : null,
  };

  await user
    .create(newUser)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          'An error occurred while creating a new user but could not parse the error message.',
      });
    });
};

export const login = async (req: Request, res: Response) => {
  // Validate the request.
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: 'Missing username or password parameter.',
    });
    return;
  }

  const foundUser = await user.findOne({
    where: { username: req.body.username },
  });

  if (foundUser) {
    const isValid = await bcrypt.compare(req.body.password, foundUser.password);
    if (isValid) {
      let token = jwt.sign(
        {
          id: foundUser.id,
          username: foundUser.username,
          password: foundUser.password,
        },
        process.env.JWT_SECRET as string
      );

      res.status(200).json(token);
    } else {
      res.status(400).json({
        message: 'Password incorrect.',
      });
    }
  } else {
    res.status(404).json({
      message: `User ${req.body.username} does not exist.`,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'User has logged out.' });
};
