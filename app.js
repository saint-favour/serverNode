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
app.use(morgan('dev'))


app.get('/add-thought', (req, res) =>{
    const thought = new Thought({
        title: 'new thought',
        snippet: 'if pigs could fly',
        body: 'pigs flying would make man what to fly it'
    })
    thought.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})
 


app.get('/', (req, res) =>{
    const thoughts = [
        {title: "Tommy lost keys", snippet: 'Lorem ipsum, dolor sit '},
        {title: "Lost treasure", snippet: 'Lorem ipsum, dolor sit '},
        {title: "Game boy", snippet: 'story of a game fan, who created his own game '}
    ]
    // res.send('<p>home page</p>')
    // res.sendFile('./views/index.html', {root: __dirname})
    res.render('index', {title: 'Home', thoughts})
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

app.get('/thoughts/create', (req, res) =>{
    res.render('create', {title: 'Creating thought'})
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

