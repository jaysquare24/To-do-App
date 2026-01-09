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
                >Clear all Task</button>
            </div>  
        </header>
    );
}