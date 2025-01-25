const express = require('express')
const thougthController = require('../controllers/thoughtController')


const router = express.Router()

router.get('/myThoughts', thougthController.thought_mythoughts )

router.post('/myThoughts', thougthController.thought_create_post)

router.get('/thoughts/create', thougthController.thought_create_get)

router.get('/thoughts/:id', thougthController.thought_details )

router.delete('/thoughts/:id', thougthController.thought_create_delete)




module.exports = router