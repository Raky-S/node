const express = require('express');
const router = express.Router();


router.get('/hotel', (req, res) => {
    res.send('here is hotel')


    router.get('/:id', (req, res) => {
        res.send('id fonctionne')
    })


    router.post('/', (req, res) => {
        res.send('ici router home')
    })
    return router
})  
