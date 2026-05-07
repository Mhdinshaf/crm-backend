const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const { validateCreateNote } = require('../middleware/validators');

router.post('/', auth, validateCreateNote, async (req, res) => {
    const { lead_id, content } = req.body;
    const created_by = req.user.id; 

    try {
        const [result] = await db.execute(
            'INSERT INTO notes (lead_id, content, created_by) VALUES (?, ?, ?)',
            [lead_id, content, created_by]
        );
        res.status(201).json({ message: 'Note added successfully!', noteId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding note' });
    }
});


router.get('/lead/:leadId', auth, async (req, res) => {
    const leadId = req.params.leadId;
    
    try {
        const [notes] = await db.execute(`
            SELECT n.*, u.email as created_by_email 
            FROM notes n 
            LEFT JOIN users u ON n.created_by = u.id 
            WHERE n.lead_id = ? 
            ORDER BY n.created_at DESC
        `, [leadId]);
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching notes' });
    }
});

module.exports = router;