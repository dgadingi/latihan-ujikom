const Petugas = require('../models/petugasModel');

exports.getAll = (req, res) => {
    Petugas.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    Petugas.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

exports.create = (req, res) => {
    Petugas.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Petugas created', id: result.insertId });
    });
};

exports.update = (req, res) => {
    Petugas.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Petugas updated' });
    });
};

exports.delete = (req, res) => {
    Petugas.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Petugas deleted' });
    });
};