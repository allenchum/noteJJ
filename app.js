const express = require('express');
const app = express();

const hb = require('express-handlebars');

app.engine('handlebars',hb({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.static('public'));

app.get('/edit-page.html',function(req,res){
    console.log(req.serialize());
})


app.listen(8080);

