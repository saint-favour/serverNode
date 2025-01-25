const Thought = require('../models/thought');



const thought_mythoughts  = (req, res) =>{
    Thought.find().sort({createdAt: -1})
    .then((result)=>{
     res.render('thoughts', {title: 'myThoughts', thoughts: result})
    })
    .catch((err) => console.log(err))
}

const thought_details = (req, res) => {
    const id = req.params.id
    Thought.findById(id)
    .then((result) =>{
        res.render('details', {thought: result, title: 'thought details'})
    })
    .catch((err) => console.log(err))
} 


const thought_create_get = (req, res) => {
    res.render('create', {title: 'Creating thought'})
} 


const thought_create_post = (req, res) => {
        const thought = new Thought(req.body )
    
        thought.save()
        .then((result) =>{
            res.redirect('/myThoughts')
        })
        .catch((err)=> console.log(err))
} 


const thought_create_delete = (req, res) => {
    const id = req.params.id

    Thought.findByIdAndDelete(id)
    
        .then((result) => {
            res.json({redirect: '/myThoughts'})
        })
        .catch((err) => console.log(err))
} 



module.exports = {
    thought_mythoughts,
    thought_details,
    thought_create_get,
    thought_create_post,
    thought_create_delete
}