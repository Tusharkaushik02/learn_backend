const express = require('express');
const Note = require('./models/note.model');
const app = express();

app.use(express.json());

app.post('/notes', async (req, res) => {
    try {
        const { title, description } = req.body;

        const note = await Note.create({
            title,
            description
        });

        res.status(201).json({
            message: 'Note created successfully',
            note
        });
    } catch (err) {
        res.status(400).json({
            message: 'Failed to create note',
            error: err.message
        });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Notes fetched successfully',
            notes
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch notes',
            error: err.message
        });
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note deleted successfully',
            note
        });
    } catch (err) {
        res.status(400).json({
            message: 'Failed to delete note',
            error: err.message
        });
    }
});

app.patch('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note updated successfully',
            note
        });
    } catch (err) {
        res.status(400).json({
            message: 'Failed to update note',
            error: err.message
        });
    }
});

module.exports = app;
