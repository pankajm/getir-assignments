const express = require('express');
const app = express();
const route = require('./routes/index')
const morgan = require('morgan');
const logger = require('./startup/logging').logger;
require('./startup/logging').registerGlobalLogging();
require('./startup/database').connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(express.json());
app.use(morgan('tiny'));
app.use('/api', route)