const express = require('express');
const app = express();
const session = require('express-session');
const setupPassport = require('./passport');
const bodyParser = require('body-parser');
const router = require('./router')(express);
const bcrypt = require('./bcrypt')
const user = require('./users')
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3030;


app.use(session({
    secret: 'supersecret'
}));

app.use(bodyParser());

setupPassport(app);

app.use(express.static('public'));

app.use('/', router);

app.listen(port);
console.log('listening on port ', port);