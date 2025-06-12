import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos:[],
        taskInProgress:[],
        taskCompleted: [],
        
        
        
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        addTaskInProgress: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            state.taskInProgress.push(todo);
            todo.startTime = Date.now();
            todo.endTime = null; // Not completed yet
            
        },
        addTaskCompleted: (state, action) => {
            const task = state.taskInProgress.find((task) => task.id === action.payload);
            state.taskInProgress = state.taskInProgress.filter((task) => task.id !== action.payload);
            state.taskCompleted.push(task);
            task.endTime = Date.now();
            task.completedAt = new Date().toLocaleTimeString(); // Set completedAt to current time
            
        },
    },
});

export const { addTodo, 
               removeTodo, 
               toggleTodo, 
               addTaskInProgress, 
               addTaskCompleted } = todoSlice.actions;
export const selectTodos = (state) => state.todo.todos;
export const selectTaskInProgress = (state) => state.todo.taskInProgress;
export const selectTaskCompleted = (state) => state.todo.taskCompleted;


export default todoSlice.reducer;