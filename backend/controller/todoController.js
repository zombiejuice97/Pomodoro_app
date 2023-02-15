const Todo = require("../models/taskModels")


const createTodo = async function(req,res){
    try {
        const todo = await Todo.create(req.body);
        res.json(todo);
    } catch (error) {
        res.send(error);
    }
}


const deleteTodo = async function(req,res){
    const {id} = req.params;
    const todo =await Todo.findByIdAndDelete(id);
    if(!todo){
        res.send("task not found")
    }
    else{
        res.send("task deleted")
    }
}

const getTodo = async function(req,res){
    try {
        const todo = await Todo.find();
        res.send(todo);
    } catch (error) {
        res.send(error);
    }
} 

const updateTodo = async function(req,res){
    try {
        const {id} = req.params
        const todo = await Todo.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
       if(!todo){
        res.send("item not found")
       }
       else{
        res.send(todo)
       }
    } catch (error) {
        res.send(error);
    }
}


module.exports = {createTodo,deleteTodo,getTodo,updateTodo}