import { Link, Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { selectTodos, selectTaskInProgress, selectTaskCompleted } from "../features/todoSlice"; 
import { useSelector } from "react-redux";

export function MobileLayout() {
  const location = useLocation();
  const todos = useSelector(selectTodos);
  const tasks = useSelector(selectTaskInProgress);
  const completedTasks = useSelector(selectTaskCompleted);

  return (
    <div>
      <Header/>
      <div className="links">
            <Link 
            to="/todos" 
            className={`link${location.pathname === "/todos" || location.pathname === "/" ? " active" : ""}`}
            >
              Todo List 
              <span> ({ todos.length})</span>
            </Link>
            <Link 
            to="/in-progress" 
            className={`link${location.pathname === "/in-progress" ? " active" : ""}`}
            >
              Tasks In Progress 
              <span> ({ tasks.length})</span>
            </Link>

            <Link 
            to="/completed" 
            className={`link${location.pathname === "/completed" ? " active" : ""}`}
            >
                Completed Tasks 
                <span> ({ completedTasks.length})</span>
            </Link>
      </div>
      <div className="tasks-status-container">
         <Outlet />
      </div>
    </div>
  );
}