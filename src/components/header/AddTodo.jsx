import { useState } from "react";
import { addTodo } from "../../features/todoSlice"
import { useDispatch } from "react-redux";
import { Modal } from "../Modal";
import { useNavigate } from "react-router-dom";
import { priorityList } from "../../features/utilitiesAndData";





export const AddTodo = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [todoDescription, setTodoDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [priority, setPriority] = useState(priorityList[1]);

    const onShowModal = () => {
        setShowModal(true);
    };

    const onCloseModal = () => {
        setShowModal(false);
    };


    const handleAddTodo = (e) => {
        e.preventDefault();
        
        if (todoTitle.trim()) {
            dispatch(addTodo({ id: Date.now(), 
                               title: todoTitle, 
                               description: todoDescription.trim(),
                               priority: priority
                               
                             }));
            setTodoTitle("");
            setTodoDescription("");
        }else{
            alert("Please enter a task title.");
            return;
            
        }

        navigate("/todos")
        onCloseModal();
    };

    return (
        <div className="add-todo-container">
           <button onClick={onShowModal} className="new-task-button">
            + Add a New Task
           </button>
            {showModal && (
            <Modal open={showModal} className="modal">
                <button className="top-close-modal-button" onClick={onCloseModal} aria-label="Close Modal" role="button">
                    <img src="/resources/Bell.svg" alt="Close modal"/>
                </button>
                <h2 className="modal-header">Create Task</h2>
                   
                <form onSubmit={handleAddTodo} >
                    <label htmlFor="todoTitle" className="todo-title-label">Task Title: </label>
                    <input
                        type="text"
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        placeholder="Task title"
                    /> 
                    <label htmlFor="todoDescription" className="todo-description-label">Task Description: </label>
                    <textarea
                        rows="4"
                        type="text"
                        value={todoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                        placeholder="Enter description (optional)" 
                    /> 
                    <label htmlFor="priority" className="priority-label">Priority: </label>
                    <div className="priority-container" name="priority" >
                        {priorityList.map((priorityItem) => (
                            <p key={priorityItem} 
                                onClick={() => setPriority(priorityItem)}
                                className={`priority-item ${priority === priorityItem ? "selected-priority" : ""}`}>
                                {priorityItem}
                            </p>
                        ))}
                    </div>
                    <div className="buttons">
                        <button type="button" onClick={onCloseModal}>Cancel</button>
                        <button type="submit">Create Task</button>
                    </div>
                </form>
            </Modal>
            )}
        </div>
    );

}