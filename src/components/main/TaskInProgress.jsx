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
        <div className="sub-header-container In-progress-header-container">
            <div className="item1"> 
                <h2>In Progress <span>{tasks.length}</span></h2>
                <button className="clear-list-button" aria-label="Clear List" onClick={() => dispatch(clearTaskInProgress())}> Clear List</button>
            </div>
        </div>

        <ul className="in-progress">
            {tasks.length === 0? <p className="fallback-message">No task in-progress yet.</p> : tasks.map((task) => (

                <li key={task.id}> 


                    <div className="task-item">
                        <p className="priority-display" 
                        style={{backgroundColor: `${task.priority === "Average"? "#FEF9C3" : task.priority === "High"? "#FEE2E2" : "#DCFCE7"}`,
                                color: `${task.priority === "Average"? "#A16207" : task.priority === "High"? "#B91C1C" : "#15803D"}`}}
                        > 
                            {task.priority}
                        </p>

                        {task.isRunning ?  
                        <p className="time"
                        >
                            <img src="/resources/icons8-alarm-clock-18.png" alt="running icon" className="running-icon"/> 
                           {formatTime(task.isRunning ? task.elapsedTime + (Date.now() - task.startTime) : task.elapsedTime)}
                            
                        </p> :
                        <p className="time"  style={{backgroundColor: "#fcf4d2ff", color: "#B45309"}}
                        > 
                          <img src="/resources/icons8-pause-18.png" alt="paused icon" className="paused-icon"/>
                          Paused
                        </p> 
                        }
                       
                    </div>
                
                    <h3>{task.title}</h3>

                    <details className="todo-details">
                        <summary className="todo-summary">Description</summary>
                        <p className="description">{task.description}</p>
                    </details>
                    
                    
                   
                    <div className="task-buttons">
                        {task.isRunning ? (
                        <button 
                         onClick={() => dispatch(pauseTask(task.id))}
                         style={{backgroundColor: "#fcf4d2ff", color: "#B45309"}}
                        >
                           <img src="/resources/icons8-pause-18.png" alt="paused icon" className="paused-icon"/>
                           Pause
                        </button>
                        ) : (
                        <button
                         onClick={() => dispatch(resumeTask(task.id))}
                         style={{backgroundColor:"#EEF2FF", color:"#4338CA"}}
                        >
                           <img src="/resources/icons8-play-18.png" alt="play icon" className="play-icon"/>
                           Resume
                        </button>
                        )}

                        <button onClick={() => onShowModal(task.id)}>Done</button>
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