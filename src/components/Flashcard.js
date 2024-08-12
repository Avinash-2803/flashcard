import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ flashcard }) => {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => setFlipped(!flipped);

    return (
        <div 
            className={`flashcard ${flipped ? 'flipped' : ''}`} 
            onClick={handleClick}
        >
            <div className="flashcard-front">
                {flashcard.question}
            </div>
            <div className="flashcard-back">
                {flashcard.answer}
            </div>
        </div>
    );
};

export default Flashcard;
