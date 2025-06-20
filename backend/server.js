const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();

require('dotenv').config();

require('./db');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(express.json());

app.use(require('./middleware/checkToken'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profiles'));
app.use('/api/servicerequests', require('./routes/serviceRequests'));
app.use('/api/appliances', require('./routes/appliances'));
app.use('/api/documents', require('./routes/documents'));

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.get('/*splat', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});