import mongoose from 'mongoose'
import { app } from './app'


const start = async () => {

  // if(!process.env.JWT_KEY) {
  //   throw new Error('JWT_KEY must be defined')
  // }


  // console.log(process.env.JWT_KEY)
  try {
      await mongoose.connect(process.env.MONGO_URL!)
      console.log('Connected to mongodb')
  }catch(error) {
    console.error(error)
  }

  app.listen(3001, () => {
  console.log("Listening on port 3000!!");
});


}

start()


