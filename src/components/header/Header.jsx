import React,{ useState, useEffect} from 'react';
import { AddTodo } from './AddTodo';
import { quotes } from '../../features/utilitiesAndData';
import { clearAll } from '../../features/todoSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Header =() => {
    const randomIndex = Math.floor(Math.random()* quotes.length);
    const [currentQuote, setCurrentQuote] = useState(randomIndex);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="header">
            <div className="app-title-container">
                <h1 className="app-title"><img src="/resources/icons8-test-60.png" alt="TaskFlow Logo" className="app-logo"/>TaskFlow</h1>
            </div>
            <div className="quote-container">
                <p>{quotes[currentQuote]}</p>
            </div>
            <div className="header-actions">
                <AddTodo/>
                <button className='clear-all-button'
                onClick={() => {
                    dispatch(clearAll());
                    navigate("/todos");
                }}
                > <img src="/resources/icons8-delete.svg" alt="Clear all tasks" className="clear-all-icon"/> Clear all Task</button>
            </div>  
        </header>
    );
}