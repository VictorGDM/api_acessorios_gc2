const express = require('express');
const acessoriosRoutes = require('./routes/acessorios.routes');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/api/acessorios', acessoriosRoutes);

module.exports = app;