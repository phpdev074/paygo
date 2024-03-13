import dotenv from "dotenv"
dotenv.config()
import createError from 'http-errors';
import db from "./config/db.js";
import express from 'express';
import cookieParser from 'cookie-parser';   
import logger from 'morgan';
import ejs from "ejs";
import fileUpload from 'express-fileupload';
import authenticationRouter from "./routes/index.js";
const app = express();
app.use("/images",express.static("uploads"))
app.use(logger('dev'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use('/api', authenticationRouter);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`app is running in the port ${PORT}`)
})
export default app;
