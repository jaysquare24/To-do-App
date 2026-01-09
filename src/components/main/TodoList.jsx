import React,{ useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { Modal } from "../Modal";
import { selectTodos, removeTodo, addTaskInProgress, editTodo, clearTodo, searchTodo, selectSearchValue, selectFilteredTodo } from "../../features/todoSlice";
import { useNavigate } from "react-router-dom";

export const TodoList = () => {
    const todos = useSelector(selectTodos);
    const filteredTodos = useSelector(selectFilteredTodo);
    const searchValue = useSelector(selectSearchValue); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const displayTodos = searchValue? filteredTodos : todos;

    const [showTodoModal, setShowTodoModal] = useState(null);
    const [showEditTodoModal, setShowEditTodoModal] = useState(null);

    const [editTodoTitle, setEditTodoTitle] = useState("");
    const [editTodoDescription, setEditTodoDescription] = useState("");

    const handleEditTodo = (todo) => {
        setShowEditTodoModal(todo.id);
        setEditTodoTitle(todo.title);
        setEditTodoDescription(todo.description);
       
    }

    const handleSubmitEditedTodo = (e, id) => {
        e.preventDefault();
        // Implementation for editing todo
        dispatch(editTodo({ id, title: editTodoTitle, description: editTodoDescription }));
        onCloseTodoModal();
        setEditTodoTitle("");
        setEditTodoDescription("");
    }
    

    const onShowTodoModal = (id) => {
        setShowTodoModal(id);
    };

    const onCloseTodoModal = () => {
        setShowTodoModal(null);
        setShowEditTodoModal(null);
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
            <div className="sub-header-container">
                <h2>Todo List <span>({todos.length})</span></h2>
                <div className="sub-header-controls">
                    <button className="clear-list-button" aria-label="Clear List" onClick={() => dispatch(clearTodo())}> Clear List</button>
                    <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    className="search-bar" 
                    value={searchValue}
                    onChange={(e) => {
                        dispatch(searchTodo(e.target.value));
                    }}/>
                    <button className="search-icon" type="button"><img src="/resources/icons8-search.svg"  alt="search-icon"/></button>
                </div>
            </div>
            
            <ul>
                {  displayTodos.length === 0 && searchValue ? 
                    (<>
                    <p className="fallback-message">No tasks match your search.</p>
                    <button onClick={() => dispatch(searchTodo(""))} className="fallback-button">Clear Search</button>
                    </>)
                  : displayTodos.length === 0? <p className="fallback-message">No tasks available. Add a new task!</p>
                  : displayTodos.map((todo) => (
                    <li key={todo.id}>
                        
        
                        <div className="task-item">
                            <h3><span><img src="/resources/icons8-task-50.png" className="task-icon" alt="task-icon"/></span>{todo.title}</h3>
                            <div className="todo-buttons">
                                <button className="edit-button" onClick={() => handleEditTodo(todo)}><img src="/resources/icons8-edit-pencil.svg" className="edit-icon" alt="edit-icon"/></button>
                                <button onClick={() => onShowTodoModal(todo.id)}>Start</button>
                                <button className="remove-button" onClick={() => handleRemoveTodo(todo.id)}><img src="/resources/icons8-cancel.svg" className="remove-icon" alt="remove-icon"/></button>
                            </div>
                        </div>
                        <div className="description-container">   
                            <details className="todo-details">
                                <summary className="todo-summary">Description</summary>
                                <p className="description">{todo.description}</p>
                            </details>
                            <p className="priority-display" style={{backgroundColor: `${todo.priority === "average"? "#d2b721ff" : todo.priority === "high"? "#FF4500" : "#7af57aff"}`}}> {todo.priority}</p>
                        </div>
                        
                        {showTodoModal ===todo.id && (
                            <Modal open={showTodoModal === todo.id} onClose={onCloseTodoModal}>
                                <h3>Are you sure you want to start this task?</h3>
                                <div className="buttons">
                                    <button onClick={() => handleAddTaskInProgress(todo.id)}>Yes</button>
                                    <button onClick={onCloseTodoModal}>No</button>
                                </div>
                            </Modal>
                        )}

                        {showEditTodoModal === todo.id &&(
                            <Modal open={showEditTodoModal === todo.id} onClose={onCloseTodoModal}>
                                <h2>Edit Task</h2>
                                <form onSubmit={(e) => handleSubmitEditedTodo(e, todo.id)} className="edit-form">
                                    <input
                                        type="text"
                                        value={editTodoTitle}
                                        onChange={(e) => setEditTodoTitle(e.target.value)}
                                    />
                                    <textarea
                                        value={editTodoDescription}
                                        onChange={(e) => setEditTodoDescription(e.target.value)}
                                    />
                                    <button type="submit">Save Changes</button>
                                </form>
                            </Modal>
                        )}
                        
                    </li>
                ))}

                
                
                    
            </ul>
        </div>
    );
}