const db = require('../config/db');

exports.getAll = (cb) => {
    db.query('SELECT * FROM transaction', cb);
};

exports.getById = (id, cb) => {
    db.query('SELECT * FROM transaction WHERE id_transaction = ?', [id], cb);
};

exports.create = (data, cb) => {
    db.query('INSERT INTO transaction SET ?', [data], cb);
};

exports.update = (id, data, cb) => {
    db.query('UPDATE transaction SET ? WHERE id_transaction = ?', [data, id], cb);
};

exports.delete = (id, cb) => {
    db.query('DELETE FROM transaction WHERE id_transaction = ?', [id], cb);
};

