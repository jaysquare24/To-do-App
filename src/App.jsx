import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TaskInProgress } from './components/TaskInProgress';
import { TaskCompleted } from './components/TaskCompleted';
import { MobileLayout } from './components/MobileLayout';
import React,{ useState, useEffect} from 'react';
import './App.scss'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, BrowserRouter } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={< MobileLayout />}>
      <Route index element={<TodoList />} />
      <Route path="todos" element={<TodoList />} />
      <Route path="in-progress" element={<TaskInProgress />} />
      <Route path="completed" element={<TaskCompleted />} />
    </Route>
  )
);


function App() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
    <RouterProvider router={router} />
   )
  } else{
    
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <div className="tasks-status-container">
          <TodoList/>
          <TaskInProgress/>
          <TaskCompleted/>
        </div>
      </div>
    </BrowserRouter>
  )
 }
}

export default App
