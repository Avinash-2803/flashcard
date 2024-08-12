import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [formData, setFormData] = useState({ question: '', answer: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => console.error('Error fetching flashcards:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            axios.put(`http://localhost:5000/api/flashcards/${editId}`, formData)
                .then(() => {
                    setFlashcards(flashcards.map(fc => fc.id === editId ? { ...fc, ...formData } : fc));
                    setEditId(null);
                });
        } else {
            axios.post('http://localhost:5000/api/flashcards', formData)
                .then(() => {
                    setFlashcards([...flashcards, formData]);
                });
        }
        setFormData({ question: '', answer: '' });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/flashcards/${id}`)
            .then(() => {
                setFlashcards(flashcards.filter(fc => fc.id !== id));
            });
    };

    const handleEdit = (id) => {
        const cardToEdit = flashcards.find(fc => fc.id === id);
        setFormData({ question: cardToEdit.question, answer: cardToEdit.answer });
        setEditId(id);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Question"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                />
                <button type="submit">{editId ? 'Update' : 'Add'} Flashcard</button>
            </form>
            <ul>
                {flashcards.map(flashcard => (
                    <li key={flashcard.id}>
                        {flashcard.question} - {flashcard.answer}
                        <button onClick={() => handleEdit(flashcard.id)}>Edit</button>
                        <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
