const express = require("express");
const exphbrs = require("express-handlebars");
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/upload", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.set("view engine", "handlebars");

app.engine("handlebars", exphbrs());

app.use(express.static("public"));
app.use(express.static("uploads"));


let userarr = [];
let imag = '';

app.get("/", (req, res) => {
    res.render("home", {
        title: "New user",
    });
});

// const uploadSchema = new mongoose.Schema({
//   username: String,
//   firstName: String,
//   surname: String,
//   profilePicture: String,
// });

// const UserModel = mongoose.model('User', uploadSchema);

// UserModel.create({
//     username: 'XENA',
//     firstName: 'Warrior',
//     surname: 'supernana',
//     profilePicture:'/img/xena.jpg'
// }).then(data=>console.log(data))
// .catch(err=>console.log(err))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/upload", upload.single('avatar'), (req, res, next) => {
    let uservar = req.body.username;
    userarr.push(uservar)
    let img1 = req.file.img
    console.log(img1);
    res.render("uploadded", {
        username: uservar,
        avatar: img1
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
