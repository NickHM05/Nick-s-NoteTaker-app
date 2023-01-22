const router = require("express").Router();
const store = require("../db/store");
const db = require("../db/db.json");
const path = require("path");
const fs = require("fs");
//this uuid being called is questionable. I dont know why it comes from my typescript/4.9/node_modules/@types/uuid/index when i thought it was supposed to come through just the json but package. 

const { v1: uuidv1 } = require("uuid");
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
    //const newNote = req.body
    const { title, text } = req.body;
    //console.log(newNote);
    const newNote = {
        title,
        text,
        id: uuidv1(),
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        // get data from storage
        const saveFile = JSON.parse(data);
        // add the new to the array
        saveFile.push(newNote);

        fs.writeFile(
            './db/db.json', JSON.stringify(saveFile, null, 1),
            (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('New Note has been added.')
        );

        //update the note data again after the post then assemble the proper response. 
        note = saveFile;

        const response = {
            status: 'success',
            body: newNote,
        };
        res.status(201).json(response);

    });
});

// Delete function
router.delete('/notes/:id', (req, res) => {
    // Was the post recieved? If yes, then console log it. 
    console.log(`${req.method} your delete request was made:\n${req.params.id}`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        //Get the data we had before. 
        let httpNote = JSON.parse(data);
        // gonna have this delete the index when not needed on deletion.
        let indeci = httpNote.findIndex(p => p.id === req.params.id);
        if (indeci === -1) {
            const response = {
                status: `The id cannot be found.`,
            };
            res.status(404).json(response);
            console.log('The delete request was recieved for an id that was no longer found.')
            //the page needs to be returned to after. 
            return;
        }

        //The id from the array needs to go away here. 
        httpNote.splice(indeci, 1);

        //Update the note after the post was made here. 
        note = httpNote;

        fs.writeFile(
            './db/db.json', JSON.stringify(httpNote, null, 1),
            (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Note was actually deleted. ')
        );

        //here is where if the id was deleted we will get a response in from json that the id has been deleted. 
        const response = {
            status: `${req.params.id}, the id is gone.`,
        };
        res.json(response);

    });
});
//Old code function but it was removed to try something new. Might be usable in another version but its left more for sentimental reasons for now. 
//     let saveNote = db;
//     saveNote.push(newNote);
//     console.log(saveNote);
//     fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(saveNote));
//     return res.json(saveNote)
// })

//export the code through router again. 
module.exports = router;