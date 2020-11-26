var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('list of products');
});

// router.get('/:id', function(req, res) {
//   res.send('student id: '+req.params.id);
// });

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Product = require('../models/product');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
//     cb(null, Date.now() + ext)
//   }
// })

// router.get('/home', (req, res) => {
//   res.render('home')
// })




// module.exports = router;