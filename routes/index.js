import express from 'express';
const authenticationRouter = express.Router();
import { signUp,uploadImage } from '../controller/authenticationController.js';
authenticationRouter.post('/signup', signUp);
authenticationRouter.post('/upload-image', uploadImage);
export default authenticationRouter;
