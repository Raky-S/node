const express = require('express');
const exphbrs = require('express-handlebars')
const translation = require('./translations.json')
// console.log(translation);
const port = 3000;

const app = express();

app.engine('handlebars', exphbrs({
    defaultLayout: false,
    layoutsDir: __dirname + "views/"
}));

app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    // console.log(translation);
    res.render('home', {
        pageTitle: 'Try Me or else',
        title: 'ru fr en es ch sw',
    }
    );
});

app.get('/:lang?', (req, res) => {
    // console.log(translation);
    res.render('landinglang', {
        newBonjour: translation[req.params.lang],
    });
});

app.get('/all', (req, res) => {
    // console.log(translation);
    res.render('alloflang', {
        allBonjour: translation,
    });
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.listen(port, () => {
    console.log('Server started on port: ' + port);
});