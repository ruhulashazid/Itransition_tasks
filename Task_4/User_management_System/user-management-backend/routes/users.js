const express = require('express');
const db = require('../config/db');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Get all users
router.get('/', verifyToken, (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) return res.status(400).send(err);
        res.json(results);
    });
});

// Block/Unblock User
router.post('/block', verifyToken, (req, res) => {
    const { userIds, action } = req.body;
    const status = action === 'block' ? 'blocked' : 'active';
    const sql = `UPDATE users SET status = ? WHERE id IN (?)`;
    db.query(sql, [status, userIds], (err, result) => {
        if (err) return res.status(400).send(err);
        res.send('Users updated');
    });
});

// Delete User
router.post('/delete', verifyToken, (req, res) => {
    const { userIds } = req.body;
    const sql = `DELETE FROM users WHERE id IN (?)`;
    db.query(sql, [userIds], (err, result) => {
        if (err) return res.status(400).send(err);
        res.send('Users deleted');
    });
});

module.exports = router;
