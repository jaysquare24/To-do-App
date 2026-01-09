import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todoSlice";
import { saveItem } from "./features/storages";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
})

store.subscribe(() => {
    const {todos, taskInProgress, taskCompleted} = store.getState().todo;

    saveItem("todos", todos)
    saveItem("tasks", taskInProgress)
    saveItem("taskCompleted", taskCompleted); 
});