const db = require('../config/db');

exports.getAll = (cb) => {
    db.query('SELECT * FROM customer', cb);
};

exports.getById = (id, cb) => {
    db.query('SELECT * FROM customer WHERE id_customer = ?', [id], cb);
};

exports.create = (data, cb) => {
    db.query('INSERT INTO customer SET ?', [data], cb);
};

exports.update = (id, data, cb) => {
    db.query('UPDATE customer SET ? WHERE id_customer = ?', [data, id], cb);
};

exports.delete = (id, cb) => {
    db.query('DELETE FROM customer WHERE id_customer = ?', [id], cb);
};
