import React,{ useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import { Modal } from "../Modal";
import { selectTodos, removeTodo, addTaskInProgress, editTodo, clearTodo, searchTodo, selectSearchValue, selectFilteredTodo } from "../../features/todoSlice";
import { useNavigate } from "react-router-dom";
import { priorityList } from "../../features/utilitiesAndData";

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
    const [editPriority, setEditPriority] = useState("");


    const handleEditTodo = (todo) => {
        setShowEditTodoModal(todo.id);
        setEditTodoTitle(todo.title);
        setEditTodoDescription(todo.description);
        setEditPriority(todo.priority)
       
    }

    const handleSubmitEditedTodo = (e, id) => {
        e.preventDefault();
        // Implementation for editing todo
        dispatch(editTodo({ id, title: editTodoTitle, description: editTodoDescription, priority:editPriority }));
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
                <div className="item1"> 
                  <h2>Todo <span>{todos.length}</span></h2>
                  <button className="clear-list-button" aria-label="Clear List" onClick={() => dispatch(clearTodo())}> Clear List</button>
                </div>
                <div className="item2">
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
                            <p className="priority-display" 
                            style={{backgroundColor: `${todo.priority === "Average"? "#FEF9C3" : todo.priority === "High"? "#FEE2E2" : "#DCFCE7"}`,
                                   color: `${todo.priority === "Average"? "#A16207" : todo.priority === "High"? "#B91C1C" : "#15803D"}`}}
                            > 
                             {todo.priority}
                            </p>

                            <div className="todo-buttons">
                                <button className="edit-button" onClick={() => handleEditTodo(todo)}><img src="/resources/icons8-edit-pencil.svg" className="edit-icon icon" alt="edit-icon"/> Edit</button>
                                <button className="remove-button" onClick={() => handleRemoveTodo(todo.id)}><img src="/resources/icons8-delete.svg" className="remove-icon icon" alt="remove-icon"/> Remove</button>
                            </div>
                        </div>
                
                        <h3>{todo.title}</h3>

                        <details className="todo-details">
                            <summary className="todo-summary">Description</summary>
                            <p className="description">{todo.description}</p>
                        </details>
                        
                        <button className="start-button" onClick={() => onShowTodoModal(todo.id)}>Start Task</button>
                        
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

                                    <label htmlFor="priority" className="priority-label">Priority: </label>
                                    <select id="priority" name="priority" value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                                        {priorityList.map((priorityItem) => (
                                            <option key={priorityItem} value={priorityItem}>
                                                {priorityItem}
                                            </option>
                                        ))}
                                    </select> <br/><br/> 
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