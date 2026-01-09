import React, { useState, useEffect } from "react"; 
import { useSelector } from "react-redux";  
import { selectTaskCompleted, selectTodos, selectTaskInProgress, clearTaskCompleted } from "../../features/todoSlice";
import { formatTime } from "../../features/utilitiesAndData";
import { useDispatch } from "react-redux";


export const TaskCompleted = () => {
    const completedTasks = useSelector(selectTaskCompleted);
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();
    const tasksInProgress = useSelector(selectTaskInProgress);

    
    const [celebratedTasks, setCelebratedTasks] = useState([]);
    const [recentlyCompleted, setRecentlyCompleted] = useState([]);


    
   useEffect(() => {
    // Only run if there are completed tasks
    if (completedTasks.length === 0) return;

    // Find tasks not already in recentlyCompleted
    const newCompletions = completedTasks
        .map(task => task.id)
        .filter(id => !recentlyCompleted.includes(id));

    // For each new completion, show icon for 3 seconds
    newCompletions.forEach(id => {
        setRecentlyCompleted(prev => [...prev, id]);
         const timeout = setTimeout(() => {
            setRecentlyCompleted(prev => prev.filter(tid => tid !== id));
        }, 3000);});
    }, [completedTasks]);

    const totalTasks = todos.length + tasksInProgress.length + completedTasks.length;


    return (
        <div className="task-section">
           <div className="sub-header-container">
                <h2>Completed Tasks <span>({completedTasks.length}/{totalTasks})</span>{ completedTasks.length >0 && completedTasks.length === totalTasks && (<img src="/resources/icons8-celebrate.gif" className="celebration-gif" alt="celebration gif"/>)}</h2>
                <div className="sub-header-controls">
                    <button className="clear-list-button" aria-label="Clear List" onClick={() => dispatch(clearTaskCompleted())}> Clear List</button>
                </div>
            </div>

            
            {completedTasks.length === 0 ? (
                <p className="fallback-message">No tasks completed yet.</p>
            ) : (
                <ul>
                    {completedTasks.map((task) => (
                        <li key={task.id}>
                            <div className="task-item">
                                <h3 className="task-item1">
                                    <img src="/resources/icons8-task-completed-50.png" className="task-icon" alt="task-icon"/>
                                    {task.title}
                                </h3>
                                <div className="task-item2">
                                    <div className="task-time">
                                        <p>Completed at: {task.completedAt}</p>
                                        <p>Time used: {formatTime(task.elapsedTime)}</p> 
                                    </div>
                                    {recentlyCompleted.includes(task.id) && (
                                     <img src="/resources/icons8-celebrate.gif" className="celebration-png" alt="celebration icon"/>
                                    )}
                                </div>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}