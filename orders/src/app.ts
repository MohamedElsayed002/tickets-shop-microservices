import express from "express";
import 'express-async-errors'
import dotenv from 'dotenv'
dotenv.config()
import { json } from "body-parser";
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import cors from 'cors'
import { errorHandler, NotFoundError, currentUser } from "@rallycoding/common";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
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
app.use(currentUser)
app.use(indexOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)
app.use(newOrderRouter)


app.all('*', async (req,res,next) => {
  next(new NotFoundError())
})

// app.use(errorHandler)

export { app }