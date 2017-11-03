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
    console.log(req.body);
    res.send('ok');
});

app.listen(port, () =>{
    console.log(`Server started on ${port}`);
});