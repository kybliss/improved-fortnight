const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3001;

const db = require('./db/db.json');
const homepage = require('./public/index.html');
// const index = require('./public/assets/js/index.js');
const dbPath = './db/db.json';
const indexPath = 'Develop/public/index.html';
const notesPath = 'Develop/public/notes.html';


let notes = [];
if (fs.existsSync(dbFilePath)) {
  const data = fs.readFileSync(dbFilePath, 'utf-8');
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
        notes.push(newNote);

    const reviewNote = JSON.stringify(newNote);

    fs.writeFile('./db/db.json', reviewNote, (err) =>
    err
        ? console.error(err)
        : console.log(
            "Note added."
        )
    );

    const response = {
        status: 'success',
        body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
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

/*

const read = () => {
    const notes = fs.readFileSync(dbFile, 'utf-8');
    return JSON.parse(notes);
}

const write = (notes) => {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync(dbFile, jsonData)
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
    const notes = read();
    res.json(notes);
});

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/db', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
    const notes = read();
    const newNote = req.body;
    notes.push(newNote);
    write(notes);
    res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.delete('../db/db.json:id', (req, res) => {
    const notes = read();
    const noteID = req.params.id;
    const noteIndex = notes.findIndex((note) => note.id === noteID);
    notes.splice(noteIndex, 1);
    write(notes);
    res.json(notes);
})
*/