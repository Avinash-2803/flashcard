import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './Flashcard.css';

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => {
                setFlashcards(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching flashcards:', error);
                setError('Failed to load flashcards. Please try again later.');
                setLoading(false);
            });
    }, []);

    const nextCard = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % flashcards.length);
    };

    const prevCard = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    if (loading) return <div>Loading flashcards...</div>;
    if (error) return <div>{error}</div>;
    if (flashcards.length === 0) return <div>No flashcards available.</div>;

    return (
        <div className="flashcard-container">
            <Flashcard flashcard={flashcards[currentIndex]} />
            <div className="navigation-buttons">
                <button className="navigation-button" onClick={prevCard}>Previous</button>
                <button className="navigation-button" onClick={nextCard}>Next</button>
            </div>
        </div>
    );
};

export default FlashcardList;
