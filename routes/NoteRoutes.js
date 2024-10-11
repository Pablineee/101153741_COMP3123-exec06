const Note = require('../models/NotesModel');
const express = require('express');
const router = express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', (req, res) => {
    // Validate request
    const { noteTitle, noteDescription, priority } = req.body;
    if(!noteTitle || !noteDescription || !priority) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note

    const newNote = new Note({
        noteTitle: noteTitle,
        noteDescription: noteDescription,
        priority: priority
    });

    newNote.save((err, result) => {
        if (err){
            console.error(err);
        } else {
            console.log(result);
        }
    });

    res.status(200).send({
        message: "Note successfully created.",
        note: newNote
    });
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', async (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }
    //TODO - Write your code here to returns all note

    try {
        const notes = await Note.find();
        res.status(200).send(notes);
    } catch (err){
        res.status(500).send({
            message: err.message
        });
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', async (req, res) => {
    // Validate request
    const { noteId } = req.params;
    if(!noteId) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to return onlt one note using noteid

    try {
        const note = await Note.findById(noteId);
        res.status(200).send(note);
    } catch (error){
        res.status(500).send({
            message: error.message
        });
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', async (req, res) => {
    
    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if (!note){
        res.status(500).send({ message: "Note not found." });
    }

    const { noteTitle, noteDescription, priority } = req.body;

    if(!noteId || !noteTitle || !noteDescription || !priority) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            {
                noteTitle,
                noteDescription,
                priority
            }
        );
        if (updatedNote){
            const note = await Note.findById(noteId);
            res.status(200).send({
                message: "Note successfully updated.",
                note: note
            });
        }
    } catch(error){
        res.status(500).send({
            message: error.message 
        });
    }

});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', async (req, res) => {
    // Validate request

    const { noteId } = req.params;

    if (!noteId){
        res.status(404).send({ message: "Invalid ID" });
    }
    //TODO - Write your code here to delete the note using noteid

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (deletedNote){
            res.status(200).send({
                message: "Note successfully deleted.",
                deleted: deletedNote
            });
        }
    } catch(err){
        res.status(500).send({ message: err.message });
    }


});

module.exports = router;