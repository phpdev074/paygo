import express from 'express';
const authenticationRouter = express.Router();
import { signUp } from '../controller/authenticationController.js';
authenticationRouter.post('/signup', signUp);

export default authenticationRouter;
