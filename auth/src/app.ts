import express from "express";
import 'express-async-errors'
import dotenv from 'dotenv'
dotenv.config()
import { json } from "body-parser";
import mongoose from 'mongoose'
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
// import { errorHandler } from "./middlewares/error-handler";
import cookieSession from 'cookie-session'
import cors from 'cors'
import { errorHandler , NotFoundError  } from "tickets-validator";

  // docker build -t moham/client .
// docker push moham/client 

const app = express();
app.set('trust proxy', true);
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true
}));
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
)
app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(errorHandler)


app.all('*', async (req,res,next) => {
  next(new NotFoundError())
})

app.use(errorHandler)

export { app }