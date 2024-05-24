const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Index route
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({});
        res.render('index', { items });
    } catch (err) {
        console.error(err);
        res.send('Error retrieving items');
    }
});

// New item form
router.get('/new', (req, res) => {
    res.render('new');
});

// Create item
router.post('/', async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description
        });
        await newItem.save();
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.send('Error creating item');
    }
});

// Show item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            res.render('show', { item });
        } else {
            res.send('Item not found');
        }
    } catch (err) {
        console.error(err);
        res.send('Error retrieving item');
    }
});

// Edit item form
router.get('/:id/edit', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            res.render('edit', { item });
        } else {
            res.send('Item not found');
        }
    } catch (err) {
        console.error(err);
        res.send('Error retrieving item');
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description
        }, { new: true });
        if (item) {
            res.redirect(`/items/${item._id}`);
        } else {
            res.send('Item not found');
        }
    } catch (err) {
        console.error(err);
        res.send('Error updating item');
    }
});

// Delete item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndRemove(req.params.id);
        if (item) {
            res.redirect('/items');
        } else {
            res.send('Item not found');
        }
    } catch (err) {
        console.error(err);
        res.send('Error deleting item');
    }
});

module.exports = router;
