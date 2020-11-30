const express = require('express');
const mongoose = require('mongoose');


const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/trippy_basics",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
);

const app = express();


const hotelRoute = require('./controller/hotels');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// app.get('/add', (req, res) => {
//     res.send('RAKY est dans la place!!!!');
//     console.log('RAKY est dans la place!!!!');
    
// })

// app.use('/users', userRoute( User));
app.use('/hotels', hotelRoute( hotel));
// app.use('/', Route(passport, Product));
app.use('/', viewRoute);


app.listen(PORT, () => {
    console.log('Server started on port: ' + PORT);
  });