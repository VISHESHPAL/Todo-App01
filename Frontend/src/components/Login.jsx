import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) =>{
    e.preventDefault();
    try{ 
       const {data} = await axios.post("http://localhost:3000/user/login",{
        email,
        password
       },{
          withCredentials:true,
          headers :{
               "Content-Type":"application/json"
          }
       })
      //  localStorage.setItem("token", data.token);
       console.log(data)
      toast.success(data.message || "User Logged In Successfully ! ")
      localStorage.setItem("jwt",data.token)
      navigateTo("/");
      setEmail("")
      setPassword("")
    }catch(error){
      console.log(error)
      toast.error( error.response.data.errors || "User Registeration Failed ! ")
    }
  }


  return (
      <div className='flex h-screen items-center justify-center bg-gray-100'>
         <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-5 text-center'>Login Form</h2>
          <form onSubmit={handleRegister} className='signup-form'>


              <div className='mb-4 '>
              <label className="block mb-2 font-semibold" htmlFor="email">Email:</label>  
              <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                 type="email" id='email'
                 placeholder='Enter Email'
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)} 
                 />
              </div>

              <div className='mb-4'>  
              <label className="block mb-2 font-semibold" htmlFor="password">Password:</label>
              <input  className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                 type="password" id='password' 
                 placeholder='Enter Passowrd'
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)} />
              </div>

              <button className='w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3 ' type='submit'>Login</button>

              <p className='mt-4 text-center text-gray-600'>New User ? <Link to="/signup" className='text-blue-600 hover:underline'>SignUp</Link></p>
          </form>
    </div>
      </div>
  )
}

export default Login
