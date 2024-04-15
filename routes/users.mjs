import express from 'express';
import db from './db.mjs';
import UserController from '../controllers/userController.mjs';

const usersRouter = express.Router();
const uController = new UserController(db);

usersRouter.post('/login', uController.findUserByLogin.bind(uController));

// Logout route
usersRouter.post('/logout', uController.logoutUser.bind(uController));

// 'GET' login route - useful for clients to obtain currently logged in user
usersRouter.get('/login', uController.findUserBySession.bind(uController));

export default usersRouter;