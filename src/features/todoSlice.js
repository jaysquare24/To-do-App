import { createSlice } from "@reduxjs/toolkit";
import { loadItem } from "./storages";
import { priorityRanks } from "./utilitiesAndData";

const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, " ").trim(); 


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

            state.todos.sort(
                (a, b) => priorityRanks[b.priority.toLowerCase()] - priorityRanks[a.priority.toLowerCase()]
            );
             
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
            const query = normalizeText(action.payload);
            state.filteredTodo = state.todos.filter(item =>normalizeText(item.title).includes(query));
            state.searchValue = action.payload;
        },

        editTodo: (state, action) => {
            const editedTodoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);

            if(editedTodoIndex !== -1){
                state.todos[editedTodoIndex] = {
                    ...state.todos[editedTodoIndex], ...action.payload
                };

                state.todos.sort((a, b) => 
                    priorityRanks[b.priority.toLowerCase()] - priorityRanks[a.priority.toLowerCase()]
                )
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