const express = require('express');
//native node lib
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// ________________________________________________________________________________
// DB Setup
// ________________________________________________________________________________
// connects mongoose to a db instance named auth
mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true });


// ________________________________________________________________________________
// App Setup
// ________________________________________________________________________________
// -express setup
 
//app.use -> registers passed arguments as middleware
// morgan logs requests, used for debugging
app.use(morgan('combined'));
//enable cors for all urls
app.use(cors());
// parses all request types as json
app.use(bodyParser.json({ type: '*/*' }))
router(app);



// ________________________________________________________________________________
// Server Setup
// ________________________________________________________________________________
// -setup communication between our server and requesting clients

const port = process.env.PORT || 3090;
// Create http server that receives requests and forwards it to our app
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);