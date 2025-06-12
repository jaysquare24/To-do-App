import React,{ useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { Modal } from "./Modal";
import { selectTodos, removeTodo, addTaskInProgress } from "../features/todoSlice";
import { useNavigate } from "react-router-dom";

export const TodoList = () => {
    const todos = useSelector(selectTodos);;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showTodoModal, setShowTodoModal] = useState(null);
    

    const onShowTodoModal = (id) => {
        setShowTodoModal(id);
    };

    const onCloseTodoModal = () => {
        setShowTodoModal(null);
    };

    const handleRemoveTodo = (id) => {
         dispatch(removeTodo(id));
    }

    const handleAddTaskInProgress = (id) => {
        dispatch(addTaskInProgress(id));
        navigate("/in-progress")
        onCloseTodoModal();
        
    }

    return (
        <div className="todo-list task-section">
            <h2>Todo List <span>({todos.length})</span></h2>
            <ul>
                { todos.length === 0? <p className="fallback-message">No tasks available. Add a new task!</p>: todos.map((todo) => (
                    <li key={todo.id}>
                        
        
                        <div className="task-item">
                            <h3><span><img src="/resources/icons8-task-50.png" className="task-icon" alt="task-icon"/></span>{todo.title}</h3>
                            <div className="todo-buttons">
                                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                                <button onClick={() => onShowTodoModal(todo.id)}>Start Task</button>
                            </div>
                        </div>
                            
                        <details className="todo-details">
                            <summary className="todo-summary">Description</summary>
                            <p className="description">{todo.description}</p>
                        </details>
                        
                        {showTodoModal ===todo.id && (
                            <Modal open={showTodoModal === todo.id} onClose={onCloseTodoModal}>
                                <h3>Are you sure you want to start this task?</h3>
                                <div className="buttons">
                                    <button onClick={() => handleAddTaskInProgress(todo.id)}>Yes</button>
                                    <button onClick={onCloseTodoModal}>No</button>
                                </div>
                            </Modal>
                        )}
                        
                    </li>
                ))}

                
                
                    
            </ul>
        </div>
    );
}