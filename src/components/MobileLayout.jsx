import { Link, Outlet, useLocation } from "react-router-dom";
import { Header } from "./header/Header";
import { selectTodos, selectTaskInProgress, selectTaskCompleted } from "../features/todoSlice"; 
import { useSelector } from "react-redux";

export function MobileLayout() {
  const location = useLocation();
  const todos = useSelector(selectTodos);
  const tasksInProgress = useSelector(selectTaskInProgress);
  const completedTasks = useSelector(selectTaskCompleted);

  const totalTasks = todos.length + tasksInProgress.length + completedTasks.length;

  return (
    <div>
      <Header/>
      <div className="links">
            <Link 
            to="/todos" 
            className={`link${location.pathname === "/todos" || location.pathname === "/" ? " active" : ""}`}
            >
              Todo
              <span>{todos.length}</span>
            </Link>
            <Link 
            to="/in-progress" 
            className={`link${location.pathname === "/in-progress" ? " active" : ""}`}
            >
              In Progress 
              <span>{ tasksInProgress.length}</span>
            </Link>

            <Link 
            to="/completed" 
            className={`link${location.pathname === "/completed" ? " active" : ""}`}
            >
                Completed  
                <span>{ completedTasks.length}/{totalTasks}</span>
            </Link>
      </div>
      <div className="tasks-status-container">
         <Outlet />
      </div>
    </div>
  );
}