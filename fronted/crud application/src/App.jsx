import { useState } from 'react';
import TaskList from './component/taskList';
import Taskform from './component/taskForm';


import './App.css'

function App() {
  const [editingTask, setEdititngTask] = useState(null);
  const [refresh, setRefresh] = useState(false);
  
  const triggerRefresh = () => {
    setEdititngTask(null)
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="App">
        <h1>CRUDify - Task Manager</h1>
        <Taskform editableTasks={editingTask} onSuccess={triggerRefresh} />
        <TaskList onEdit={setEdititngTask} key={refresh} />
      </div>
        
    </>
  );
}

export default App
