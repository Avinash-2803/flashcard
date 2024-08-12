
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/flashcards');
            setFlashcards(response.data);
        } catch (error) {
            console.error('Error fetching flashcards:', error);
        }
    };

    const handleAddFlashcard = async () => {
        try {
            await axios.post('http://localhost:5000/api/flashcards', { question, answer });
            setQuestion('');
            setAnswer('');
            fetchFlashcards();
        } catch (error) {
            console.error('Error adding flashcard:', error);
        }
    };

    const handleEditFlashcard = async () => {
        try {
            await axios.put(`http://localhost:5000/api/flashcards/${editId}`, { question, answer });
            setQuestion('');
            setAnswer('');
            setEditId(null);
            fetchFlashcards();
        } catch (error) {
            console.error('Error updating flashcard:', error);
        }
    };

    const handleDeleteFlashcard = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
            fetchFlashcards();
        } catch (error) {
            console.error('Error deleting flashcard:', error);
        }
    };

    return (
        <div>
            <h1>Flashcard Dashboard</h1>
            <div>
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button onClick={editId ? handleEditFlashcard : handleAddFlashcard}>
                    {editId ? 'Update Flashcard' : 'Add Flashcard'}
                </button>
            </div>
            <ul>
                {flashcards.map(fc => (
                    <li key={fc.id}>
                        <strong>Question:</strong> {fc.question} <br />
                        <strong>Answer:</strong> {fc.answer}
                        <button onClick={() => { setEditId(fc.id); setQuestion(fc.question); setAnswer(fc.answer); }}>
                            Edit
                        </button>
                        <button onClick={() => handleDeleteFlashcard(fc.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
