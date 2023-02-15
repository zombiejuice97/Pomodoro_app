const express = require("express");
const router = express.Router();
const {createTodo, deleteTodo, getTodo, updateTodo} = require("../controller/todoController");


router.post('/api/todo', createTodo);
router.delete('/api/todo/:id',deleteTodo);
router.patch('/api/todo/:id',updateTodo);
router.get('/api/todos/',getTodo)





module.exports = router;