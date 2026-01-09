import { createSlice } from "@reduxjs/toolkit";
import { loadItem } from "./storages";


export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: loadItem("todos"),
        taskInProgress: loadItem("tasks"),
        taskCompleted: loadItem("taskCompleted"), 
        filteredTodo: [],
        searchValue: null 
        
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
            
            todo.startTime = Date.now();
            todo.elapsedTime = 0;
            todo.isRunning = true;
            

            state.taskInProgress.push(todo);

        },
         
        pauseTask: (state, action) => {
         const task = state.taskInProgress.find(task => task.id === action.payload);

          if(task && task.isRunning){
                task.elapsedTime += Date.now() - task.startTime;
                task.startTime = null;
                task.isRunning = false
            };
        },

        resumeTask: (state, action) => {
            const task = state.taskInProgress.find(task => task.id === action.payload);
            
            if(task && !task.isRunning){
                task.startTime = Date.now();
                task.isRunning = true; 

            }
        },

        addTaskCompleted: (state, action) => {
            const task = state.taskInProgress.find((task) => task.id === action.payload);
            state.taskInProgress = state.taskInProgress.filter((task) => task.id !== action.payload);
           
           if (task.isRunning) {
                task.elapsedTime += Date.now() - task.startTime;
            }

            task.isRunning = false;
            task.startTime = null;
            task.completedAt = new Date().toLocaleTimeString();
            
            state.taskCompleted.push(task);
              
        },

        searchTodo: (state, action) => {

            
            const searchItem = state.todos.filter(item => item.title.trim().toLowerCase().includes(action.payload.trim().toLowerCase()));
            state.searchValue = action.payload.trim();
            state.filteredTodo = searchItem;
        },

        editTodo: (state, action) => {
            const editedTodoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);

            if(editedTodoIndex !== -1){
                state.todos[editedTodoIndex] = {
                    ...state.todos[editedTodoIndex], ...action.payload
                }
            }
            
        },

        clearTodo: (state) => {
            state.todos = [];
        },

        clearTaskInProgress: (state) => {
            state.taskInProgress = [];
        },

        clearTaskCompleted: (state) => {
             state.taskCompleted =[];
        },

        clearAll: (state) => {
            state.todos = [];
            state.taskInProgress = [];
            state.taskCompleted =[];
        
        }

    },
});

export const {
    addTodo, removeTodo, 
    toggleTodo, addTaskInProgress, 
    addTaskCompleted, editTodo, searchTodo,
    clearAll, resumeTask, pauseTask,
    clearTodo, clearTaskInProgress, clearTaskCompleted } = todoSlice.actions;
export const selectTodos = (state) => state.todo.todos;
export const selectTaskInProgress = (state) => state.todo.taskInProgress;
export const selectTaskCompleted = (state) => state.todo.taskCompleted;
export const selectFilteredTodo = (state) => state.todo.filteredTodo;
export const selectSearchValue = (state) => state.todo.searchValue;


export default todoSlice.reducer;