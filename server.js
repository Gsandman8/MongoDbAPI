const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set('toJSON', { getters: true });
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});


