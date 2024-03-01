const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { query, matchedData, validationResult, body } = require('express-validator');
const router = express.Router();
const Notes = require("../models/Notes");

// Route 1: Get all the notes using: GET "/api/notes/fetchall". Login required.
router.get('/fetchall', fetchuser, async (req, res) => {
    try {
        // console.log(req.user.id);
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");        
    }
});


// Route 2: Add a note using: POST "/api/notes/addnote". Login required.
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Enter description of 5 or more character').isLength({min: 5}),
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const { title, description, tag } = req.body;
            // await Notes.create({
            //     title,
            //     description,
            //     tag,
            //     user: req.user.id
            // });

            const note = new Notes({
                title, description, tag, user: req.user.id
            });

            const savedNote = await note.save();
            res.status(200).json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");        
        }
});


// Route 3: Update a note using: PUT "/api/notes/updatenote". Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    const newNote = {};
    if(title) newNote.title = title;
    if(description) newNote.description = description;
    if(tag) newNote.tag = tag;
    
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) return res.status(404).send("Not Found");

        if(note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        // console.log(note);
        res.status(200).json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");        
    }
});


// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);

        // checks if note id(to be deleted) is valid
        if(!note) return res.status(404).send("Not Found");

        // checks if correct user is trying to delete the note
        if(note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

        await Notes.findByIdAndDelete(req.params.id);

        res.status(200).json({msg: "Deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");        
    }
});

module.exports = router