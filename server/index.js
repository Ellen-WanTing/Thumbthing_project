const cors = require('cors');
const express = require('express');
var _ = require('lodash');
const util = require('util');
require('dotenv').config();

const bodyParser = require('body-parser');
const { result } = require('lodash');
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

var categoryRouter = require('./routes/category');
app.use('/api', categoryRouter);

var authorRouter = require('./routes/author');
app.use('/api', authorRouter);

var bookRouter = require('./routes/book');
app.use('/api', bookRouter);

var summaryRouter = require('./routes/summary');
app.use('/api', summaryRouter);

var commentRouter = require('./routes/comment');
app.use('/api', commentRouter);

var bookmarkRouter = require('./routes/bookmark');
app.use('/api', bookmarkRouter);

var publisherRouter = require('./routes/publisher');
app.use('/api', publisherRouter);

var searchRouter = require('./routes/search');
app.use('/api', searchRouter);

var actionRouter = require('./routes/action');
app.use('/api', actionRouter);

var userRouter = require('./routes/user');
app.use('/api', userRouter);

var googleApi = require('./util/googleApi');
googleApi.getDataDirect();

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
  googleApi.getDataBySchedule();
});

//Post
app.use(bodyParser.urlencoded({extended: false}));
