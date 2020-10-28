const express = require('express');
const port = 3000;

const app = express();

const authorsArr= ['Raky Sy, FR', 'Lawrence Nowell, UK', 'William Shakespeare, UK', 'Charles Dickens, US', 'Oscar Wilde, UK'] ;


app.get('/', (req, res) => {
    res.send('Authors API');
    console.log('Authors API')
});


app.get('/authors/:authorsArr', (req, res) => {
    res.send(`Mes authors: ${authorsArr[req.params.authorsArr]}`)
    console.log( );
});

// app.get('/authors/: 1/', (req, res) => {
//     res.send('Lawrence Nowell, UK' + authorsArr[req.params.authorsArr]);
// });

// app.get('/authors/: 2/', (req, res) => {
//     res.send('William Shakespeare, UK' + authorsArr[req.params.authorsArr]);
// });

// app.get('/authors/: 3/', (req, res) => {
//     res.send('Charles Dickens, US' + authorsArr[req.params.authorsArr]);
// });

// app.get('/authors/: 4/', (req, res) => {
//     res.send('Oscar Wilde, UK' + authorsArr[req.params.authorsArr]);
// });


app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

