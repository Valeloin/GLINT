const express = require ('express');
const app = express();

require ('./models/dbconfig');
const path = require('path');
const cors = require ('cors');
app.use((req, res, next) =>
{
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
const authsRoutes = require('./routes/authsRoutes');
const saucesRoutes = require('./routes/saucesRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authsRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;
