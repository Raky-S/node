const express = require('express');
const exphbrs = require('express-handlebars')
const app = express();
const port = 3000

const students = [];



app.engine('handlebars', exphbrs({
    defaultLayout: false,
    layoutsDir: __dirname + "views/"
}));

app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    console.log('students dans get', students);
    res.render('home', {
        title: 'Welcome to express simple form',
        students: students,
        otherTitle: 'Students list',
    });
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post('/students/add', (req, res) => {
    var username = req.body.username;
    console.log(username);
    students.push(username);
    res.render('studentsadded', {
        username: username
    })
})


app.listen(port, () => {
    console.log('Server started on port: ' + port);
});