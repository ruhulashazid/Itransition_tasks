const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, position } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, position) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, position], (err, result) => {
        if (err) return res.status(400).send(err);
        res.send('User registered');
    });
});

// Login User
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).send('User not found');
        const user = results[0];
        if (user.status === 'blocked') return res.status(403).send('User is blocked');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password');
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
