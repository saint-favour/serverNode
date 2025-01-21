const express = require('express')

const app = express()


app.listen(3000)
console.log('listenig on localhost:3000')

app.get('/', (req, res) =>{
    // res.send('<p>home page</p>')
    res.sendFile('./views/index.html', {root: __dirname})
})
app.get('/about', (req, res) =>{
    // res.send('<p>sererior</p>')
    res.sendFile('./views/about.html', {root: __dirname})
})
app.get('/about-us', (req, res) =>{
    // res.send('<p>home page</p>')
    res.redirect('/about')
})

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname})
})

