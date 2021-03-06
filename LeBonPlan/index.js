const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models").User;
const Product = require("./models").Product;
const router = express.Router();
const app = express();
const multer = require("multer");
const productsRoutes = require('./controllers/products');
const usersRoutes = require('./controllers/users');
const { session } = require("passport");
const expressValidator = require("express-validator");
const { static } = require("express");
const validationResult = expressValidator.validationResult;
const body = expressValidator.body;
require('dotenv').config();
const { PORT, MONGODB_URI, API_KEY } = process.env;
const port = process.env.PORT || 3000;
mongoose.connect(
    process.env.MONGODB_URI ||
    "MONGODB_URI=mongodb+srv://admin-lebonplan:O7kyv0x9JwxXeuuh@cluster0.gwqfu.mongodb.net/leBonPlan?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        );
        cb(null, Date.now() + ext);
    },
});
let upload = multer({ storage: storage });

app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(
    expressSession({
        secret: "konexioasso07",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// enable Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Express configuration

app.get("/", (req, res) => {
    // console.log("GET /");
    res.render("home", {
        isUserLogged: req.isAuthenticated(),
        username: req.user ? req.user.username : null,
        profilePicture: req.user ? req.user.profilePicture : null,
    });
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);
});


app.get("/profil", (req, res) => {
    console.log("GET /profil");
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.render("profil", {
            surname: req.user.surname,
            firstname: req.user.firstname,
            username: req.user.username,
            isUserLogged: req.isAuthenticated(),
            profilePicture: req.user.profilePicture
        });
    } else {
        res.redirect("/");
    }
});

app.get("/signup", (req, res) => {
    console.log("GET /signup", req.isAuthenticated());
    // console.log(1);
    if (req.isAuthenticated()) {
        res.redirect("/profil");
    } else {
        res.render("signup");
    }
});

const User1= app.post("/signup", upload.single("avatar"), async (req, res, next) => {
    console.log('req.body', req.body);
    const { username, surname, password, firstname } = req.body;

    User.register(new User({
        username,
        surname,
        password,
        firstname,
        profilePicture: req.file.filename,
    }),
        password, // password will be hashed
        (err, user) => {
            if (err) {
                console.log("/signup user register err", err);
                return res.render("signup");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/profil");
                });
            }
        }
    );
});

app.get("/login", (req, res) => {
    // console.log('req.isAuthenticated',req.isAuthenticated);
    if (req.isAuthenticated()) {
        res.redirect("/profil");
    } else {
        res.render("login");
    }
});

app.post("/login",
    // console.log('APPPOST', passport.authenticate),
    passport.authenticate("local", {
        successRedirect: "/profil",
        failureRedirect: "/login",
    }),
    (req, res) => {
        console.log("un message");
    }
);

app.get("/admin", (req, res) => {
    // console.log("GET /admin");
    if (req.isAuthenticated()) {
        // console.log(req.user);
        res.render("admin", {
            isUserLogged: req.isAuthenticated(),
            username: req.user ? req.user.username : null,
            profilePicture: req.user.profilePicture
        });
    } else {
        res.redirect("/");
    }
});

app.post("/admin", upload.single("productPicture"), async (req, res, next) => {
    console.log('reqqqqqqqqqqqq  req.user._id',  req.user._id);

    const { productName, tag, price, } = req.body;

    try {

       const listOfProduct= await Product.create(
            new Product({
                productName,
                tag,
                price,
                userId: req.user._id,
                productPicture: req.file.filename,

            }));
        res.redirect("/product")
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error)
    }
});

app.get('/product', async (req, res) => {
    
    const { productName, tag, price, } = req.body;
    // console.log('req.body.user', req.user);

// console.log('req.body dans app.gettttttttttttttttttttttttt', req)
    try {
        // const listOfProduct = await Product.find({_id: req.user._id}).lean().exec();

        if (req.isAuthenticated()) {
            res.render("product", {
                isUserLogged: req.isAuthenticated(),
                username: req.user ? req.user.username : null,
                profilePicture: req.user.profilePicture,
                productName,
                tag,
                price,
                // productPicture: req.body.productPicture,
                
                // listOfProduct
            });
        } else {
            res.redirect("/");
        }

    }catch (error){
        console.log('error', error);
        res.status(500).json(error)
    }
});

app.post('/product',  async(req, res) => {
    // console.log('req du file product', req.file)
    const { productName, tag, price, } = req.body;
    
    try {
  
        res.render('product', {
            productName,
            tag,
            price,
            // productPicture: req.file.filename,
            // isUserLogged: req.isAuthenticated(),
            // username: req.user ? req.user.username : null,
            // profilePicture: req.user.profilePicture
        })
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error)
    }

});

app.get("/", (req, res) => {
    res.render("home", {
        title: "New user",
    });
});

app.get("/logout", (req, res) => {
    // console.log("GET /logout", req);
    req.logout();
    res.redirect("/");

});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});


