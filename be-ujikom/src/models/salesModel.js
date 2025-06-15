const db = require('../config/db');

exports.getAll = (cb) => {
    db.query('SELECT * FROM sales', cb);
};

exports.getById = (id, cb) => {
    db.query('SELECT * FROM sales WHERE id_sales = ?', [id], cb);
};

// exports.create = (data, cb) => {
//     db.query('INSERT INTO sales SET ?', [data], cb);
// };

// Perbaikan bagian INSERT:
exports.create = (data, cb) => {
    const { tgl_sales, id_customer, do_number, status } = data;
    db.query(
        'INSERT INTO sales (tgl_sales, id_customer, do_number, status) VALUES (?, ?, ?, ?)',
        [tgl_sales, id_customer, do_number, status],
        cb
    );
};

// exports.update = (id, data, cb) => {
//     db.query('UPDATE sales SET ? WHERE id_sales = ?', [data, id], cb);
// };

// Perbaikan bagian UPDATE:
exports.update = (id, data, cb) => {
    const { tgl_sales, id_customer, do_number, status } = data;
    db.query(
        'UPDATE sales SET tgl_sales = ?, id_customer = ?, do_number = ?, status = ? WHERE id_sales = ?',
        [tgl_sales, id_customer, do_number, status, id],
        cb
    );
};

exports.delete = (id, cb) => {
    db.query('DELETE FROM sales WHERE id_sales = ?', [id], cb);
};
