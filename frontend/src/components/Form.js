import React from "react";

function Form ({handleChange,createTask,name,isEditing, updateTask}){
    return(
        <div>
            <form onSubmit={isEditing? updateTask : createTask} className="task_form">
            <input
                type="text"
                placeholder="Enter the task name here"
                value={name}
                name="name"
                onChange={(e)=>handleChange(e)}   
            />
              <button>{isEditing? "Edit" : "Add"}</button>  
            </form>
        </div>
    )
}


export default Form;