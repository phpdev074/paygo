import dotenv from "dotenv"
dotenv.config()
import createError from 'http-errors';
import db from "./config/db.js";
import express from 'express';
import cookieParser from 'cookie-parser';   
import logger from 'morgan';
import authenticationRouter from "./routes/index.js";
import usersRouter from './routes/users.js';
const app = express();
app.use("/images",express.static("uploads"))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', authenticationRouter);
app.use('/users', usersRouter);
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`app is running in the port ${PORT}`)
})
export default app;
