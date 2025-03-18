import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import todoRoute from '../Backend/routes/todo.route.js'
import userRoute from '../Backend/routes/user.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const MONGO_URI =process.env.MONGODB_URI

const PORT =process.env.PORT || 4000

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
       origin:process.env.FRONTEND_URL,
       credentials: true,
       methods:"GET,POST,PUT,DELETE",
       allowedHeaders:["Content-Type", "Authorization"]
}))


try{
    await mongoose.connect(MONGO_URI);
     console.log("Connected to the Database");

}catch(error){
  console.log(error)
}

//routes
app.use("/todo",todoRoute);
app.use("/user", userRoute);


app.listen(PORT, ()=>{
    console.log(`App is Listening on the PORT ${PORT}`);
})
