
import { useState, useEffect } from "react";
import { createTask , updateTask } from "../utils/api";


export default function Taskform({ editableTasks, onSuccess }){

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    useEffect( () => {
        if(editableTasks){
          setTitle(editableTasks.title);
          setDescription(editableTasks.description);  
        }
    }, [editableTasks]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log("🧪 Submitted:", { title, description });
        
        if(editableTasks){
            await updateTask(editableTasks._id, {title , description});
        }else{
            await createTask({ title, description});
        }

        setTitle("");
        setDescription("");
        onSuccess();
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>{editableTasks ? "Edit Task" : "Create Task" }</h2>
            
            
            <input 
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">{ editableTasks ? "UPDATE" : "CREATE"}</button>
            
        </form>
        </>
    )
}

