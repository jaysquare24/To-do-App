import React, { useEffect, useState} from "react"
import { formatTime } from "../../features/utilitiesAndData";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { selectTaskInProgress, addTaskCompleted , clearTaskInProgress, resumeTask,pauseTask} from "../../features/todoSlice"
import { Modal } from "../Modal";


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
        <div className="sub-header-container">
           <h2>Task In Progress <span>({tasks.length})</span></h2>
            <div className="sub-header-controls">
                <button className="clear-list-button" aria-label="Clear List" onClick={() => dispatch(clearTaskInProgress())}> Clear List</button>
            </div>
        </div>

        <ul>
            {tasks.length === 0? <p className="fallback-message">No task in-progress yet.</p> : tasks.map((task) => (

                <li key={task.id}> 
                    
                    <div className="task-item">
                        <h3><span><img src="/resources/icons8-progress-indicator-50.png" className="task-icon" alt="task-icon"/></span>{task.title}</h3>
                        <div className="task-buttons">
                            <p>Time: {formatTime(task.isRunning ? task.elapsedTime + (Date.now() - task.startTime) : task.elapsedTime)}</p>                 
                            
                            {task.isRunning ? (
                            <button onClick={() => dispatch(pauseTask(task.id))}>Pause</button>
                            ) : (
                            <button onClick={() => dispatch(resumeTask(task.id))}>Resume</button>
                            )}

                            <button onClick={() => onShowModal(task.id)}>Done</button>
                        </div>
                    </div>
                
                    <div className="description-container">   
                        <details className="todo-details">
                            <summary className="todo-summary">Description</summary>
                            <p className="description">{task.description}</p>
                        </details>
                        <p className="priority-display" style={{backgroundColor: `${task.priority === "average"? "#d2b721ff" : task.priority === "high"? "#FF4500" : "#7af57aff"}`}}> {task.priority}</p>
                    </div>  
                    
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