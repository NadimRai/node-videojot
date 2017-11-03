const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
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

//load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

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

//Idea Route
app.get('/ideas/add', (req,res) =>{
    res.render('ideas/add');
})

//Process Form
app.post('/ideas', (req,res) =>{
    let errors = [];

    if(!req.body.title){
        errors.push({text: 'Please add a title'});
    }
    if(!req.body.details){
        errors.push({text: 'Please add details'});
    }

    if(errors.length > 0){
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    }else{
        res.send('passed');
    }
});

app.listen(port, () =>{
    console.log(`Server started on ${port}`);
});