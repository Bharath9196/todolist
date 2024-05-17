import axios from "axios";
import React, { useState } from "react";

const Create =()=>{
    const[task,setTask]=useState()
    const handleAdd=()=>{
        axios.post("http://localhost:4000/tasks", {task})
        .then(()=>{
            alert("Task Added Successfully")
            setTask("")
        })

        .catch((err)=>console.log(err))
    }
    return(
        <div className="input-holder">
            <input type="text" placeholder="Add Tasks" value={task} onChange={(e)=>{setTask(e.target.value)}} className="input"/>
            <button className="button" onClick={handleAdd}>+</button>
        </div>
    )
}

export default Create