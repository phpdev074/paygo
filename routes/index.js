import express from 'express';
const authenticationRouter = express.Router();
import { signUp,uploadImage,login,checkUserEmail,loginFromIos } from '../controller/authenticationController.js';
authenticationRouter.post('/signup', signUp);
authenticationRouter.post('/upload-image', uploadImage);
authenticationRouter.post('/login', login);
authenticationRouter.post('/check-email', checkUserEmail);
authenticationRouter.post('/login-ios', loginFromIos);
export default authenticationRouter;
