import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcrypt"
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
  email: z.string().email({ errors: "Invalid Email address" }),
  username: z
    .string()
    .min(3, { errors: "Username must contain 3 charectors" }),
  password: z
    .string()
    .min(6, { errors: "Password must contain 6 charectors" }),
});

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    //   console.log(email,password,username)

    if (!email || !username || !password) {
      return res.status(400).json({
        errors: "All fields are required ",
      });
    }
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ message: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: "User Already Registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({ email, username, password:hashedPassword });

    await newUser.save();
    if (newUser) {
     const token =  await generateTokenAndSaveInCookies( newUser._id,res);
      res.status(201).json({
        message: "User Registered Successfully ",
        newUser,
        token
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: "Error Registering User",
    });
  }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
           return res.status(400)
            .json({
              errors:"All Fields are required"
            })
        }

        const user  = await User.findOne({email}).select("+password");
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({
                errors:"Invalid Email or Password"
            });
        }
        const token =  await generateTokenAndSaveInCookies( user._id,res);

        res.status(201).json({
            message:"User Logged in Successfully ",
            user,
            token
        });


    }catch(error){
        console.log(error);  
        res.status(500).json({
          errors: "Error In Login User",
          });
    }
};

export const logout = (req, res) => {

    try{
        res.clearCookie("jwt",{
            path:"/",
        });
        res.status(200).json({
            message:"User Logout Successfully"
        });

    }catch(error){
        console.log(error);  
        res.status(500).json({
            errors: "Error In Logout User",
          });
    }
   
};
