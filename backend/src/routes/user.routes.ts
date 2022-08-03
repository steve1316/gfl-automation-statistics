import express from 'express';
import * as controller from '../controllers/user.controller';

const router = express.Router();

router.post('/register', controller.create);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

export default router;
