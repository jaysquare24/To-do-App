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


    const totalTasks = todos.length + tasksInProgress.length + completedTasks.length;


    return (
        <div className="task-section">
           <div className="sub-header-container completed-header-container">
               <div className="item1"> 
                    <h2>Completed <span>{completedTasks.length}/{totalTasks}</span>{ completedTasks.length >0 && completedTasks.length === totalTasks && (<img src="/resources/icons8-celebrate.gif" className="celebration-gif" alt="celebration gif"/>)}</h2>
                    <button className="clear-list-button" aria-label="Clear List" onClick={() => dispatch(clearTaskCompleted())}> Clear List</button>
                </div>
            </div>

            
            {completedTasks.length === 0 ? (
                <p className="fallback-message">No tasks completed yet.</p>
            ) : (
                <ul className="completed-tasks">
                    {completedTasks.map((task) => (
                        <li key={task.id}>
                            <div className="task-item">
                                <h3 className="task-item1">
                                    {task.title}
                                    <img src="/resources/icons8-done.svg" alt="completed icon" className="completed-icon"/>
                                </h3>
                                
                                <div className="task-time">
                                    <p>Completed at: <span>{task.completedAt}</span></p>
                                    <p>Time used: <span>{formatTime(task.elapsedTime, true)}</span></p> 
                                </div>
                                
                                
                            </div>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}