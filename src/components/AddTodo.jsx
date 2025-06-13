import { useState } from "react";
import { addTodo } from "../features/todoSlice"
import { useDispatch } from "react-redux";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";





export const AddTodo = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [todoDescription, setTodoDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

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
                        placeholder="Add a task title"
                    /> <br/> <br/>
                    <textarea
                        rows="4"
                        type="text"
                        value={todoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                        placeholder="Add task description (optional)" 
                    /> <br/><br/>
                    <div className="buttons">
                        <button type="submit">Add Task</button>
                        <button type="button" onClick={onCloseModal}>Cancel</button>
                    </div>
                </form>
            </Modal>
            )}
        </div>
    );

}