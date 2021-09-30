const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const router = require('./routes/router');
const { errorHandler } = require('./lib/error-handler');

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());

app.use('/api', router);
app.use((err, req, res, next) => errorHandler(err, req, res, next));

process.on('SIGINT', () => process.exit(1));

app.listen(port, () => console.log('Server is up and running on port number ' + port));
