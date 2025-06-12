import React, { useEffect, useState} from "react"
import { formatTime } from "../features/utilitiesAndData";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { selectTaskInProgress, addTaskCompleted } from "../features/todoSlice"
import { Modal } from "./Modal";


export const TaskInProgress = () => { 
   const tasks= useSelector(selectTaskInProgress);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [showModal, setShowModal] = useState(null);
   const [tick, setTick] = useState(0);

    // Force update every second
    useEffect(() => {
        const interval = setInterval(() => setTick(tick => tick + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const onShowModal = (id) => {
        setShowModal(id);
    };
    
    const onCloseModal = () => {
        setShowModal(null);
    }

    const handleTaskCompleted = (id) => {
        dispatch(addTaskCompleted(id));
        navigate("/completed")
        onCloseModal();
    }

 return (
    <div className="task-section">
        <h2>Task In Progress <span>({tasks.length})</span></h2>
        <ul>
            {tasks.length === 0? <p className="fallback-message">No task in-progress yet.</p> : tasks.map((task) => (
                <li key={task.id}> 
                    
                    <div className="task-item">
                        <h3><span><img src="/resources/icons8-progress-indicator-50.png" className="task-icon" alt="task-icon"/></span>{task.title}</h3>
                        <div className="task-buttons">
                        <p>Time: {formatTime(Date.now() - (task.startTime || Date.now()))}</p>                 
                        <button onClick={() => onShowModal(task.id)}>Done</button>
                        </div>
                    </div>
                
                   <details className="todo-details">
                        <summary className="todo-summary">Description</summary>
                        <p className="description">{task.description}</p>
                    </details>   
                    
                    {showModal=== task.id && (
                    <Modal open={showModal===task.id} className="modal">
                        <h3>Are you sure you want to complete this task?</h3>
                        <div className="buttons">
                            <button onClick={() => handleTaskCompleted(task.id)}>Yes</button>
                            <button onClick={onCloseModal}>No</button>
                        </div>
                    </Modal>
                    )}
                </li>
                
            ))
            
            }
        </ul>

    </div>
 );

}