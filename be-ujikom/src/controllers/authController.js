const db = require('../config/db');

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM petugas WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: 'Server error' });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Username atau password salah' });
        }

        const user = results[0];
        res.json({
            id_user: user.id_user,
            nama_user: user.nama_user,
            username: user.username,
            level: user.level
        });
    });
};