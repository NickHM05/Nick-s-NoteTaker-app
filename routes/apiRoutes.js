const router = require("express").Router();
const store = require("../db/store");
const db = require("../db/db.json");
const path = require("path");
const fs = require("fs");
//gonna need an import store file called store.js under the db folder
//gonna need a getAllnotes route.
router.get('/notes', (req, res) => {
    store
        .getNotes()
        .then((notes) => {
            return res.json(notes)
        }).catch((err) => res.status(500).json(err))
    // return res.json(db)



})
router.post('/notes', (req, res) => {
    const newNote = req.body
    console.log(newNote);
    let saveNote = db;
    saveNote.push(newNote);
    console.log(saveNote);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(saveNote));
    return res.json(saveNote)



})


//gonna need a deleteNotes.route


module.exports = router;