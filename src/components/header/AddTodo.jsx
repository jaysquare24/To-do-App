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
            Add a New Task
           </button>
            {showModal && (
            <Modal open={showModal} className="modal">  
                <form onSubmit={handleAddTodo} >
                    <input
                        type="text"
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        placeholder="Task title"
                    /> <br/> <br/>
                    <textarea
                        rows="4"
                        type="text"
                        value={todoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                        placeholder="Task description (optional)" 
                    /> <br/>
                    
                    <label htmlFor="priority" className="priority-label">Priority: </label>
                    <select id="priority" name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        {priorityList.map((priorityItem) => (
                            <option key={priorityItem} value={priorityItem}>
                                {priorityItem}
                            </option>
                        ))}
                    </select> <br/><br/> 
                    <div className="buttons">
                        <button type="button" onClick={onCloseModal}>Cancel</button>
                        <button type="submit">Add Task</button>
                    </div>
                </form>
            </Modal>
            )}
        </div>
    );

}