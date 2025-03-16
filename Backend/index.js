import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import todoRoute from '../Backend/routes/todo.route.js'
import userRoute from '../Backend/routes/user.route.js'

const app = express();
dotenv.config();
const MONGO_URI =process.env.MONGODB_URI

const PORT =process.env.PORT || 4000

try{
    await mongoose.connect(MONGO_URI);
     console.log("Connected to the Database");

}catch(error){
  console.log(error)
}

app.use(express.json())
app.use("/todo",todoRoute);
app.use("/user", userRoute);


app.listen(PORT, ()=>{
    console.log(`App is Listening on the PORT ${PORT}`);
})
