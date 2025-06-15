const Sales = require('../models/salesModel');

exports.getAll = (req, res) => {
    Sales.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    Sales.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

exports.create = (req, res) => {
    Sales.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Sales created', id: result.insertId });
    });
};

exports.update = (req, res) => {
    Sales.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Sales updated' });
    });
};

exports.delete = (req, res) => {
    Sales.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Sales deleted' });
    });
};
