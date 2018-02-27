const express = require('express');
const app = express();
const hb = require('express-handlebars');
const bodyParser = require('body-parser');  //body-parser
const multer = require('multer'); //multer
const upload = multer({dest:'uploads/'});
const fileUpload = require('express-fileupload');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

//fileUpload
//app.use(fileUpload());

//parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

//Handle Bar
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/',function(req,res){
    res.render('create-form');
    
})

app.post('/create-new',function(req,res){
    console.log(req.body);
    res.render('edit-page');   
});


const port = 8080;
app.listen(port);
console.log('Start servering on Port '+port);