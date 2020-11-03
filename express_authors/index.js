const express = require('express');
const port = 3000;

const app = express();

const authorsArr = ['Raky Sy, FR', 'Lawrence Nowell, UK', 'William Shakespeare, UK', 'Charles Dickens, US', 'Oscar Wilde, UK'];
const books = ['Angels of Shery-City', 'Beowulf', 'Hamlet, Othello, Romeo and Juliet, MacBeth', 'Oliver Twist, A Christmas Carol', 'The Picture of Dorian Gray, The Importance of Being Earnest'];


const all=[
  {
    id: 0,
    name: "Raky Sy",
    nationality: "FR"
},

  {
      id: 1,
      name: "Lawrence Nowell",
      nationality: "UK"
  },

  {
      id: 2,
      name: "William Shakespeare",
      nationality: "UK"
  },

  {
      id: 3,
      name: "Charles Dickens",
      nationality: "Us"
  },

  {
      id: 4,
      name: "Oscar Wilde",
      nationality: "UK"
  },
  
]



app.get('/', (req, res) => {
  res.send('Authors API');
  console.log('Authors API')
});

app.get('/authors/:id', (req, res) => {
  res.send('Erreur!!! The author with the ID 12133 does not exist');
});

app.get('/json/authors/:id', (req, res) => {
  res.json(all[req.params.id])

});

app.get('/authors/:authorsArr/', (req, res) => {
  res.send(`Mes authors: ${authorsArr[req.params.authorsArr]}`)
  console.log(authorsArr[req.params.authorsArr]);
});

app.get('/authors/:books/books', (req, res) => {
  res.send(`Books: ${books[req.params.books]}`,)
  console.log(books[req.params.books]);
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

