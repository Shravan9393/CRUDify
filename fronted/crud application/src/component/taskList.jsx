import { useEffect, useState } from "react";
import { getTask , deleteTask } from "../utils/api.js";

 export default function TaskList({ onEdit }){
    const [tasks, setTasks] = useState([]);

    const loadTask = async () => {
        const data = await getTask();
        setTasks(data);
    }


    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTask();
    };

    useEffect( () =>{
        loadTask();
    }, []);


    return (
        <>
        <div>
            <h2>All Task</h2>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id} className="task-item">
                        <strong>{task.title}</strong>: {task.description}
                        <button className="edit-button" onClick={() => onEdit(task)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
 }

