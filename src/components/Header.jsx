import React,{ useState, useEffect} from 'react';
import { AddTodo } from './AddTodo';
import { quotes } from '../features/utilitiesAndData';

export const Header =() => {
    const randomIndex = Math.floor(Math.random()* quotes.length);
    const [currentQuote, setCurrentQuote] = useState(randomIndex);

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
             <AddTodo/>
        </header>
    );
}