const db = require('../config/db');

exports.getAll = (cb) => {
    db.query('SELECT * FROM item', cb);
};

exports.getById = (id, cb) => {
    db.query('SELECT * FROM item WHERE id_item = ?', [id], cb);
};

exports.create = (data, cb) => {
    db.query('INSERT INTO item SET ?', [data], cb);
};

exports.update = (id, data, cb) => {
    db.query('UPDATE item SET ? WHERE id_item = ?', [data, id], cb);
};

exports.delete = (id, cb) => {
    db.query('DELETE FROM item WHERE id_item = ?', [id], cb);
};