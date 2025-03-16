import express from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo}  from '../controllers/todo.controller.js';

const router = express.Router();

router.post("/create",createTodo)
router.get("/gettodos", getTodos)
router.put("/update/:id", updateTodo)
router.delete("/delete/:id", deleteTodo)




export default router;