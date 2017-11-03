const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect('mongodb://localhost/videojot-dev',{
    useMongoClien: true
})
.then(() => console.log('MongoDB connected..'))
.catch(err => console.log(err));

//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//Index Route
app.get('/', (req, res) =>{
    const title = 'Welcome1';
    res.render('index', {
        title: title
    });
})

//About Route
app.get('/about', (req,res)=>{
    res.render('about');
})

app.listen(port, () =>{
    console.log(`Server started on ${port}`);
});