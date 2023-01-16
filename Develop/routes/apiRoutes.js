const store = require("../db/store");

const router= require ("express").Router;
//gonna need an import store file called store.js under the db folder
//gonna need a getAllnotes route.
router.get('/notes', (req,res)=> {
    store
    .getNotes()
    .then((notes)=>{
        return res.json(notes)
    }).catch ((err)=> res.status(500).json(err))
}) 
//gonna need a postNotes.route
//gonna need a deleteNotes.route


module.exports = router;