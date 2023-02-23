
import React from "react";

// import 'reactjs-popup/dist/index.css';


function Tasks({ todo, deleteTodo, bringToForm, timerHandler }) {
    return (
        <div>
            <div class="card" styles="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{todo.name}  </h5>
                    <p class="card-text">Completed? {todo.completed? "Yes": "No" }</p>
                   
                    <br />
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    <button onClick={() => bringToForm(todo)}>Edit</button>
                    <button onClick={() => timerHandler(todo.name)}>Timer</button>
                </div>
            </div>
        </div>
    )
}


export default Tasks;