const Customer = require('../models/customerModel');

exports.getAll = (req, res) => {
    Customer.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    Customer.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

exports.create = (req, res) => {
    Customer.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Customer created', id: result.insertId });
    });
};

exports.update = (req, res) => {
    Customer.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Customer updated' });
    });
};

exports.delete = (req, res) => {
    Customer.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Customer deleted' });
    });
};
