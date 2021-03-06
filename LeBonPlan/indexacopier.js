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
// const upload = multer({ dest: 'public/uploads/' });
const productsRoutes = require('./controllers/products');
const usersRoutes = require('./controllers/users');
const { session } = require("passport");
const expressValidator = require("express-validator");
const { static } = require("express");
const validationResult = expressValidator.validationResult;
const body = expressValidator.body;
const port = process.env.PORT || 3000;
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/leBonPlan",
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

const Product1 = app.post("/admin", upload.single("avatar"), async (req, res, next) => {
    console.log('req.body', req.body);
    const { productName, tag, price } = req.body;
    Product.register(
        new Product({
            productName,
            tag,
            price,
            userId: User1._id,
            productPicture: req.file.filename,

        })
    );
    res.render("/product")
});

app.post('/product', (req, res) => {
    console.log('req du body', req.body)
    const { productName, tag, price, } = req.body;
    res.render('product', {
        productName,
        tag,
        price,
        // productPicture: req.product.productPicture,
        isUserLogged: req.isAuthenticated(),
    })
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

Product
    .findOne({ _id: Product1._id })
    .populate('userId')
    .exec((err, result) => {
        // console.log('The info student is', result)
    });

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});


