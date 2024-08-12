const express= require('express');
const mysql=require('mysql2');
const bodyParser=require('body-parser');
const cors=require('cors');


const app= express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'joshi@2003',
    database: 'flashcards_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

//get all flashcard
app.get('/api/flashcards', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//CREATE A FLASHCARD
app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, result) => {
        if (err) throw err;
        res.sendStatus(201);
    });
});
 
//uodate a flashcard
app.put('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

//delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});