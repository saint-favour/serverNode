require("dotenv").config();
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Thought = require('./models/thought');
const { result } = require("lodash");

const app = express()




mongoose.connect(process.env.mongourl)
.then((connect)=> {
    app.listen(3000, () =>{
            console.log('listenig on http://localhost:3000') 
        })
    
})
.catch((err) => console.log(`error connecting to DB ${err}`))


    


app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


app.get('/', (req, res) =>{
    res.render('index', {title: 'Home'})
})
app.get('/about', (req, res) =>{
    // res.send('<p>sererior</p>')
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', {title: 'About'})
})
app.get('/about-us', (req, res) =>{
    // res.send('<p>home page</p>')
    res.redirect('about')
})

app.get('/myThoughts', (req, res) =>{
   Thought.find().sort({createdAt: -1})
   .then((result)=>{
    res.render('thoughts', {title: 'myThoughts', thoughts: result})
   })
   .catch((err) => console.log(err))
})

app.post('/myThoughts', (req, res) => {
    const thought = new Thought(req.body )

    thought.save()
    .then((result) =>{
        res.redirect('/myThoughts')
    })
    .catch((err)=> console.log(err))
})

app.get('/thoughts/create', (req, res) =>{
    res.render('create', {title: 'Creating thought'})
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

