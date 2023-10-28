const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const uuid = require('uuid');

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const db = require('./db/db.json');
// const index = require('./public/assets/js/index.js');
const indexPath = '/public/index.html';
const notesPath = '/public/notes.html';

app.use(express.static('public'));

let notes = [];
if (fs.existsSync(db)) {
  const data = fs.readFileSync(db, 'utf-8');
  notes = JSON.parse(data);
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, `${notesPath}`))
});

app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    if ( title && text ) {
        const newNote = {
            title,
            text,
        }
        newNote.id = uuid.v4();
        db.push(newNote);

    const reviewNote = JSON.stringify(db);

    fs.writeFile('./db/db.json', reviewNote, (err) =>
    err
        ? console.error(err)
        : console.log(
            "Note added."
        )
    );

    res.status(201).json(db);
    } else {
    res.status(500).json('Error.');
    }
});

app.get('/api/notes', (req, res) => {
    return res.json(db);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `${indexPath}`));
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});

app.delete('/api/notes/:id', (req, res) => {
    const notes = db;
    const noteID = req.params.id;
    const noteIndex = notes.findIndex((note) => note.id === noteID);
    notes.splice(noteIndex, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});