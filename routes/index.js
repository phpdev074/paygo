import express from 'express';
const authenticationRouter = express.Router();
import { signUp } from '../controller/authenticationController.js';
authenticationRouter.post('/', signUp);

export default authenticationRouter;
