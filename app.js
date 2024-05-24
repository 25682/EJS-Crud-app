const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ejs-crud-app', {
    // No need for deprecated options
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

