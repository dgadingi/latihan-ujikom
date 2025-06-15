const db = require('../config/db');

exports.getAll = (cb) => {
    db.query('SELECT * FROM petugas', cb);
};

exports.getById = (id, cb) => {
    db.query('SELECT * FROM petugas WHERE id_user = ?', [id], cb);
};

exports.create = (data, cb) => {
    db.query('INSERT INTO petugas SET ?', [data], cb);
};

exports.update = (id, data, cb) => {
    db.query('UPDATE petugas SET ? WHERE id_user = ?', [data, id], cb);
};

exports.delete = (id, cb) => {
    db.query('DELETE FROM petugas WHERE id_user = ?', [id], cb);
};
