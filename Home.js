import axios from "axios";
import React, { useEffect, useState } from "react";
import Create from "./Create";


const Home=()=>{
    const[id,setId]=useState("")
    const[task,setTask]=useState("")
    const[todos,setTodos]=useState([])
    
const handleClick=(e)=>{
    if(e.target.style.textDecoration){
        e.target.style.removeProperty("text-decoration");
        
    }else{
        e.target.style.setProperty("text-decoration","line-through");
    }

};
    useEffect(()=>{
        axios.get("http://localhost:4000/tasks")
        .then((res)=>{
            setTodos(res.data)
            
        })
        
        .catch((err)=>{
            console.log(err);
        })
    })

    const deleteTask=(taskId)=>{
        axios.delete("http://localhost:4000/tasks/"+taskId)
        .then(()=>{alert("task deleted successfully")})
        .catch((err)=>{console.log(err);})

    }
    const editTask=(taskId)=>{
        axios.get("http://localhost:4000/tasks/"+taskId)
        .then((res)=>{
            setId(res.data.id)
            setTask(res.data.task)
        })
        .catch((err)=>{console.log(err);})

    }
    
    const updateTaskInApi=(e)=>{
        e.preventDefault()
        axios.put("http://localhost:4000/tasks/"+id,{id,task} )
        .then(()=>{alert("Task Updated Successfully")})
        .catch((err)=>{console.log(err);})

    }

    
    
    
        
    return(
        <div className="container Home m-auto mt-5 p-3"  >
            <div  >
            <h3 className="text-danger pt-3">TO DO LIST</h3>
            <Create/>
            {
                todos.length === 0 ?
                <div ><h2>No Record</h2></div>:
                todos.map((item)=>{
                    return (
                        <div className="todo">
                            <div className="row">
                                <div className="col-6">
                                <ul>
                                <i class="bi bi-check-square" onClick={handleClick} ><span className="ms-3">{item.task}</span> </i>
                                </ul>
                                </div> 
                                <div className="col-6">
                                <button className="btn rounded-5 bg-secondary" onClick={()=>editTask(item.id)} data-bs-target="#editTaskmodal" data-bs-toggle="modal" ><i class="bi bi-pencil"></i></button>
                                <button className="btn rounded-5 bg-danger ms-3" onClick={()=>{deleteTask(item.id)}} ><i class="bi bi-trash"></i></button>
                                
                                
                                </div>
                            </div>
                            <div className="modal" id="editTaskmodal">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3 className="m-auto">Edit Your Task</h3>
                                            <button className="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                            <div className="modal-body">
                                            <form onSubmit={updateTaskInApi}>
                                            <input type="text" placeholder="Add Tasks" value={task} onChange={(e)=>{setTask(e.target.value)}} className="input"/>
                                            <input type="submit" value="Update" data-bs-dismiss="modal" className="form-control bg-success btn w-75"/>
                                              
                                            </form>

                                            </div>
                                    </div>
                                </div>
                            
                            </div>
                            
                        </div>
                    )
                })
            }   
            </div>

        </div>
    )
}


export default Home