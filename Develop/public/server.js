const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3001;

const dbFile = require('../db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const read = () => {
    const notes = fs.readFileSync(dbFile, 'utf-8');
    return JSON.parse(notes);
}

const write = (notes) => {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync(db, jsonData)
}

app.get('/notes', (req, res) => {
    const notes = read();
    res.json(notes);
});

app.get('*', (req, res) => {
    res.send('<a href="/">Go back home?</a>');
})

app.get('/api/notes', (req, res) => {
    res.json(dbFile);
})

app.post('../db/db.json', (req, res) => {
    const notes = read();
    const newNote = req.body;
    notes.push(newNote);
    write(notes);
    res.json(notes);
});

/*
app.delete('../db/db.json:id', (req, res) => {
    const notes = read();
    const noteID = req.params.id;
    const noteIndex = notes.findIndex((note) => note.id === noteID);
    notes.splice(noteIndex, 1);
    write(notes);
    res.json(notes);
})
*/

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});