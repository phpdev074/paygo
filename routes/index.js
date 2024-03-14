import express from 'express';
const authenticationRouter = express.Router();
import { signUp,uploadImage,login,checkUserEmail } from '../controller/authenticationController.js';
authenticationRouter.post('/signup', signUp);
authenticationRouter.post('/upload-image', uploadImage);
authenticationRouter.post('/login', login);
authenticationRouter.post('/login', checkUserEmail);
export default authenticationRouter;
