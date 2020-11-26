var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('list of users');
});

// router.get('/:id', function(req, res) {
//   res.send('student id: '+req.params.id);
// });

module.exports = router;





// const express = require('express');
// const router = express.Router();

// module.exports = function (passport, User) {


//   router.post("/signup",  async (req, res, next) => {
//     // console.log('req.body', req.body);
//     const { username, surname, password, firstname } = req.body;

//     User.register(new User({
//       username,
//       surname,
//       password,
//       firstname,
//       profilePicture: req.file.filename,
//     }),
//       password, // password will be hashed
//       (err, user) => {
//         if (err) {
//           console.log("/signup user register err", err);
//           return res.render("signup");
//         } else {
//           passport.authenticate("local")(req, res, () => {
//             res.redirect("/profil");
//           });
//         }
//       }
//     );
//   });

//   router.get('/', function (req, res) {
//     res.send('list of users');
//   });



//   return router;
// }