// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'
// import axios from 'axios'

// const Home = () => {
//        const [todos, setTodos] = useState([]);
//        const [error , setError] = useState(null);
//        const [loading, setLoading] = useState(false);
//        const [newTodo, setNewTodo] = useState("")
//        useEffect(()=>{
         
//         const fetchTodos = async() => {
//             try{
//                 setLoading(true);
//                 const response = await axios.get("http://localhost:3000/todo/gettodos",{
//                     withCredentials: true,
//                     headers:{
//                         "Content-Type": "application/json",
//                     },
//                 })
//                 console.log(response.data.todos);
//                 setTodos(response.data.todos);
//                 setError(null)

//             }catch(error){
//                  setError("Failed to Fetch the Data");
//             }
//             finally{
//                 setLoading(false)
//             }
//         };
//         fetchTodos();
//        },[])
    
//        const createTodo = async () =>{
//            try{
//                const response = await axios.post("http://localhost:3000/todo/create",{
//                 text: newTodo,
//                 completed: false,
//                },{
//                  withCredentials:true
//                })

//                setNewTodo([...todos,response.data]);
//                setNewTodo("");
//            }catch(error){
//               setError("Failed to Create the Todo")
//            }
//        }

//        const todoStatus = async () =>{
//         const todo = todos.find((t)=> t._id === id)
//         try{
//            const response = await axios.post(`http://localhost:3000/todo/update/${id}`, {
//             ...todo,
//             completed:!todo.completed
//            },{
//             withCredentials:true
//            });
//            setTodos(todos.map(()=>t._id===id?response.data:t))
//         } catch(error){
//            setError("falied to Create todo")
//         }
//        }

//        const deleteTodo = async (id)=>{
//            try{
//              await axios.delete(`http://localhost:3000/todo/delete/${id}`,{
//                 withCredentials:true
//              })
//              setTodos(todos.filter((t)=>t._id!==id));
//            }
//            catch(error){
//                 setError("Failed to Deleted to Todo")
//            }
//        }

//        return (
//        <div   className='bg-gray-100 max-w-lg lg:max-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6' >
//               <h1 className='text-2xl font-semibold text-center'>Task Management Application</h1>

//               <div className='mb-4 flex mt-4 gap-1.5'>
//                 <input type="text"  placeholder='Add a new todo' className='flex-grow p-2 border rounded-md focus:outline-none '/>
//                 <button className='h-14 bg-blue-600 border rounded-md text-white px-4 py-2 hover:bg-blue-900 duration-300'>Add</button>
//               </div>

//               <ul className='space-y-2'>
//                 {todos.map((todo,index)=>{
//                      <li key={todo._id || index} className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>
//                      <div className='flex items-center'>
//                          <input type="checkbox" name="" id=""  className='mr-2'/>
//                          <span className='text-gray-500'>{todo.text}</span>
//                      </div>
//                      <button className='text-red-500 hover:text-red-700 duration-300'>Delete</button>
//                  </li>
//                 })}
//               </ul>

//               <p className='mt-4 text-center text-sm text-gray-700 '> 0 Todo Remaining</p>
//               <button className='mt-6 px-4 py-2 bg-red-500 rounded-md hover:bg-red-800 duration-300 mx-auto block'>Logout</button>
//        </div>
//        )
// }

// export default Home
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/todo/gettodos", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(response.data.todos);
                setTodos(response.data.todos);
                setError(null);
            } catch (error) {
                setError("Failed to Fetch the Data");
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const createTodo = async () => {
        try {
            const response = await axios.post("http://localhost:3000/todo/create", {
                text: newTodo,
                completed: false,
            }, {
                withCredentials: true
            });

            setTodos([...todos, response.data.newTodo]);  // ✅ Correctly updating todos
            setNewTodo("");  // ✅ Clear input field
        } catch (error) {
            setError("Failed to Create the Todo");
        }
    };

    const todoStatus = async (id) => {  // ✅ Added 'id' parameter
        const todo = todos.find((t) => t._id === id);
        try {
            const response = await axios.put(`http://localhost:3000/todo/update/${id}`, {
                ...todo,
                completed: !todo.completed
            }, {
                withCredentials: true
            });
            setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));  // ✅ Fix mapping logic
        } catch (error) {
            setError("Failed to update todo");
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/todo/delete/${id}`, {
                withCredentials: true
            });
            setTodos(todos.filter((t) => t._id !== id));
        } catch (error) {
            setError("Failed to Delete the Todo");
        }
    };

    const navigateTo = useNavigate();
    const logout = async () =>{
        try{
            await axios.get("http://localhost:3000/user/logout",{
                withCredentials:true
            })
            toast.success("User Logout Successfully !");
            navigateTo("/login");
            localStorage.removeItem("jwt");
        }catch(error){
            toast.error("Error in the Logout")
        }
    }

    return (
        <div className= ' my-10 bg-gray-100 max-w-lg lg:max-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6'>
            <h1 className='text-2xl font-semibold text-center'>Task Management Application</h1>

            <div className='mb-4 flex mt-4 gap-1.5'>
                <input 
                    type="text"  
                    placeholder='Add a new todo' 
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}  // ✅ Controlled input
                    onKeyPress={(e)=>e.key==="Enter" && createTodo()}
                    className='flex-grow p-2 border rounded-md focus:outline-none'
                />
                <button 
                    onClick={createTodo} 
                    className='h-14 bg-blue-600 border rounded-md text-white px-4 py-2 hover:bg-blue-900 duration-300'
                >
                    Add
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
             
             {/* {loading? (<div><span>Loading..</span></div>):error?(<div></div>):} */}
            <ul className='space-y-2'>
                {todos.map((todo, index) => (  // ✅ Use '()' to return JSX
                    <li key={todo._id || index} className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>
                        <div className='flex items-center'>
                            <input 
                                type="checkbox" 
                                checked={todo.completed}
                                onChange={() => todoStatus(todo._id)}  // ✅ Toggle status
                                className='mr-2'
                            />
                            <span className={todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}>
                                {todo.text}
                            </span>
                        </div>
                        <button 
                            onClick={() => deleteTodo(todo._id)} 
                            className='text-red-500 hover:text-red-700 duration-300'
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <p className='mt-4 text-center text-sm text-gray-700'>
                {todos.filter(todo => !todo.completed).length} Todo(s) Remaining
            </p>
            <button onClick={logout} className='mt-6 px-4 py-2 bg-red-500 rounded-md hover:bg-red-800 duration-300 mx-auto block'>
                Logout
            </button>
        </div>
    );
};

export default Home;
