const Transaction = require('../models/transactionModel');

exports.getAll = (req, res) => {
    Transaction.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    Transaction.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

exports.create = (req, res) => {
    Transaction.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Transaction created', id: result.insertId });
    });
};

exports.update = (req, res) => {
    Transaction.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Transaction updated' });
    });
};

exports.delete = (req, res) => {
    Transaction.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Transaction deleted' });
    });
};