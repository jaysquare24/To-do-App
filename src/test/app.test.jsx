import { formatTime } from "../features/utilitiesAndData";
import { addTodo, removeTodo, addTaskInProgress, addTaskCompleted, editTodo, searchTodo, todoSlice, clearAll, clearTodo, clearTaskInProgress, clearTaskCompleted, resumeTask, pauseTask} from "../features/todoSlice";
import { saveItem, loadItem } from "../features/storages";
import { describe, it, vi } from "vitest";
const reducer = todoSlice.reducer;

const createState = () => ({
    todos: [],
    taskInProgress: [],
    taskCompleted: [],
    filteredTodo: [],
    searchValue: null  
});

const createTodo1 = () => ({ id: 1, title: "Buy groceries", description: "This is a test todo 1" });
const createTodo2 = () => ({ id: 2, title: "Clean the house", description: "This is a test todo 2" });
const createTaskInProgress = (startTime) => ({ id: 1, title: "Buy groceries", description: "This is a test todo 1" , startTime, elapsedTime: 0, isRunning: true});
const createCompletedTask = () => ({ id: 1, title: "Buy groceries", description: "This is a test todo 1", startTime: null, elapsedTime: Date.now() - 3600000, isRunning: false, completedAt: new Date().toLocaleTimeString()}) ;      


describe ("todoSlice reducer", () => {

    it ("should handle initial state", () => {
        expect(reducer(undefined, {})).toEqual(createState());
    });

    it("should handle addTodo", () => {

        //set up
        const expectedState = {
            todos: [createTodo1],
        }

        //exercise
        const newState = reducer(createState(), addTodo(createTodo1));

       //verify
        expect(newState.todos).toEqual(expectedState.todos);
    });

    it("should handle removeTodo", () => {

        //set up
        const initialState = {
            ...createState(),
            todos: [createTodo1(), createTodo2()],
        };

        const expectedState = {
            todos: [createTodo1()]
        };

        //exercise
        const newState = reducer(initialState, removeTodo(2));

        //verify
        expect(newState.todos).toEqual(expectedState.todos);
    });

    it("should handle addTaskInProgress", () => {

        // mock Date.now
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2025-12-30T00:00:00Z'))
        
        //set up
        
        const initialState = {
            ...createState(),
            todos: [createTodo1()],
        };

        const expectedState = {
            taskInProgress: [createTaskInProgress(Date.now())],
            
        };

        //exercise
        const newState = reducer(initialState, addTaskInProgress(1));

        //verify
        expect(newState.taskInProgress).toEqual(expectedState.taskInProgress);
        
        vi.useRealTimers();
    });

    it("should handle addTaskCompleted", () => {

        // mock Date.now
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2025-12-30T00:00:00Z'));
        //set up
       
       
        const completedTask = { id: 1, title: "Buy groceries", description: "This is a test todo 1", startTime: null, elapsedTime: 3600000, isRunning: false, completedAt: new Date().toLocaleTimeString()};      
        
        const initialState = {
           ...createState(),
            taskInProgress: [createTaskInProgress(Date.now() - 3600000)],
          
            
        };

        const expectedState = {
            taskCompleted: [completedTask],
        };
          
        //exercise
        const newState = reducer(initialState, addTaskCompleted(1));

        //verify

        expect(newState.taskCompleted).toEqual(expectedState.taskCompleted);

        vi.useRealTimers();

    });

    it("should handle editTodo", () => {

        //set up
       

        const initialState = {
            ...createState(),
            todos: [createTodo1()],
        };

        const expectedState = {
            todos: [{...createTodo1(), title: "Test Edited Todo ", description: "This is edited test todo"}],
        };

        //exercise
        const newState = reducer(initialState, editTodo({title: "Test Edited Todo ", description: "This is edited test todo", id: 1}));

        //verify
        expect(newState.todos).toEqual(expectedState.todos);
    });

    it("should handle searchTodo", () => {

        //set up
        const initialState = {
            ...createState(),
            todos: [createTodo1(), createTodo2()],
           
        };

        const expectedState = {
            ...createState(),
            todos: [createTodo1(), createTodo2()],
            filteredTodo: [createTodo1()],
            searchValue:"Buy groceries" 
        };

        //exercise
        const newState = reducer(initialState, searchTodo("Buy groceries"));

        //verify
        expect(newState).toEqual(expectedState);
    })

    it(" should clear all sections", () => {
        //set up

        const initialState = {
            ...createState(),
            todos: [createTodo1()],
            taskInProgress: [createTaskInProgress(Date.now())],
            taskCompleted: [createCompletedTask()],
        }
     

        const newState = reducer(initialState, clearAll());

        //verify
        expect(newState).toEqual(createState());
    
    
    })

    it(" should clear todo list", () => {
        //set up
        

        const initialState = {
            ...createState(),
            todos: [createTodo1()],
        };

        const newState = reducer(initialState, clearTodo());

        //verify
        expect(newState.todos).toEqual(createState().todos);

    })

    it(" should clear task in progress list", () => {
        //set up
        
        const initialState = {
            ...createState(),
            taskInProgress: [createTaskInProgress(Date.now())],
        };  
        const newState = reducer(initialState, clearTaskInProgress());

        //verify
        expect(newState.taskInProgress).toEqual(createState().taskInProgress);
    })

    it(" should clear task completed list", () => {
        //set up
        
        const initialState = {
            ...createState(),
            taskCompleted: [createCompletedTask()],
        };  

        //exercise
        const newState = reducer(initialState, clearTaskCompleted());
        //verify
        expect(newState.taskCompleted).toEqual(createState().taskCompleted);
    });

    it(" should handle pauseTask", () => {
        //set up
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2025-12-30T01:00:00Z'));

        const initialState = {
            ...createState(),
            taskInProgress: [createTaskInProgress(Date.now()-3600000)],
        };
       
        //exercise
        const newState = reducer(initialState, pauseTask(1));

        //verify
        expect(newState.taskInProgress[0]).toMatchObject({
            isRunning: false,
            startTime: null,
            elapsedTime: 3600000,
        });
                
        vi.useRealTimers();
    });
    
    it(" should handle resumeTask", () => {
        //set up
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2025-12-30T01:00:00Z'));

        const pauseTask = {
            id: 1,
            title: "Buy groceries",
            description: "This is a test todo 1",
            startTime: null,
            elapsedTime: 3600000,
            isRunning: false,
       };

        const initialState = {
            ...createState(),
            taskInProgress: [pauseTask],
        };
       
        //exercise
        const newState = reducer(initialState, resumeTask(1));

        //verify
        expect(newState.taskInProgress[0]).toMatchObject({
            isRunning: true,
            startTime: Date.now(),
            elapsedTime: 3600000,
        });
        vi.useRealTimers();
    });
    
});

describe("formatTime utility function", () => {
    it("should format time correctly for hours, minutes, and seconds", () => {
        expect(formatTime(3661000)).toBe("1:01:01"); 
    }); 
});

describe(" saveItem storages utility functions", () => {
    beforeEach(() => {
        localStorage.clear();
    }); 

    it("should save item from localStorage", () => {
        const key = "testKey";
        const value = createTodo1();

        saveItem(key, value);
        
        expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
    });

});

describe(" loadItem storages utility function", () => {
    beforeEach(() => {
        localStorage.clear();
    }); 

    it("should load item from localStorage", () => {
        const key = "testKey";
        const value = createTodo1();
        saveItem(key, value);
        const loadedValue = loadItem(key);
        expect(loadedValue).toEqual(value);
    });

    it("should return empty array when loading non-existing key", () => {
        const loadedValue = loadItem("nonExistingKey");
        expect(loadedValue).toEqual([]);
    });
});


