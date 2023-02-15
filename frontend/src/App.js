import React from "react";
import { useState } from "react";

import Header from "./components/Header";
import axios from "axios";
import { useEffect } from "react";
import Tasks from "./components/Tasks";
import Form from "./components/Form";
import Timer from "./components/Timer/Timer";



function App() {
    const [todos, setTodo] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })
    const { name } = formData;
    const [isEditing, setIsEditing] = useState("");
    const [taskId, setTaskId] = useState("");
    // const [timerState,setTimerState] = useState(false)
    const [timerOn,setTimerOn] = useState(false)
    
    let createTask = async (e) => {
        e.preventDefault();
        try {
            const todo = await axios.post('http://localhost:5000/api/todo', formData);
            setFormData({ ...formData, name: '' });
            getTodos();
        } catch (error) {
            console.log(error)
        }
        return
    }

    function timerHandler(){
        timerOn===false? setTimerOn(true) : setTimerOn(false)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const getTodos = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/todos/')
            setTodo(data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTodo = async (id) => {
        try {
            const todo = await axios.delete(`http://localhost:5000/api/todo/${id}`);
            getTodos();
        } catch (error) {
            console.log(error);
        }
    }

    const bringToForm = async (task) => {
        setFormData({ name: task.name, completed: false })
        setIsEditing(true)
        setTaskId(task._id)

    }

    

    const updateTask = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/todo/${taskId}`, formData);
            setFormData({ ...formData, name:""});
            setIsEditing(false);
            getTodos();
        } catch (error) {
            console.log(error)
        }
    }

    function render_todo(){
        return (
        todos.map((todo, index) => <Tasks key={todo._id} todo={todo} index={index} deleteTodo={deleteTodo} bringToForm={bringToForm} timerHandler={timerHandler}/>)
        );  
    }

    useEffect(() => {
        getTodos()
    }, [todos])

    return (
        <div className="App">
            <div className="container">
                <Header />
                <Form handleChange={handleChange} createTask={createTask} name={name} isEditing={isEditing} updateTask={updateTask} />
                {timerOn?<Timer timerHandler={timerHandler}/> : render_todo()}
                {/* {todos.map((todo, index) => <Tasks key={todo._id} todo={todo} index={index} deleteTodo={deleteTodo} bringToForm={bringToForm}/>)} */}
            </div>
        </div>
    );
}

export default App;