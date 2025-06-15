const Item = require('../models/itemModel');

exports.getAll = (req, res) => {
    Item.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    Item.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

exports.create = (req, res) => {
    Item.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Item created', id: result.insertId });
    });
};

exports.update = (req, res) => {
    Item.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Item updated' });
    });
};

exports.delete = (req, res) => {
    Item.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Item deleted' });
    });
};
