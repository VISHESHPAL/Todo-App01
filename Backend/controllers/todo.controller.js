import Todo from "../model/todo.model.js";

export const createTodo = async (req, res)=>{
    const todo =new Todo({
        text:req.body.text,
        completed:req.body.completed
    })

    try{
        const newTodo = await todo.save();
        res.status(201)
        .json({
             message:"Todo Is Created SuccessFully",
             newTodo
            });
    }
    catch(error){
         console.log(error)
         res.status(400)
         .json({
            message:"Error In Creating the Todo"
         })
    }
}


export const getTodos = async(req,res) =>{
    try{
        const todos = await Todo.find()
        res.status(201)
        .json({
             message:"Todo Is Retrived  SuccessFully",
             todos
            });
    }catch(error){
        console.log(error)
        res.status(400)
        .json({
           message:"Error In Retriving  the Todo"
        })
    }
}

export const updateTodo = async (req,res)=>{
     try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })
        res.status(201)
        .json({
             message:"Todo Is Updated SuccessFully",
             todo
            });

     }
     catch(error){
        console.log(error)
        res.status(400)
        .json({
           message:"Error In Updation of  the Todo"
        })
     }
}
export const deleteTodo = async (req,res) =>{
    try{
         await Todo.findByIdAndDelete(req.params.id)
         res.status(201)
         .json({
              message:"Todo Is Deleted  SuccessFully"
             });
    }
    catch(error){
        console.log(error)
        res.status(400)
        .json({
           message:"Error In Deletion  the Todo"
        })
    }
}