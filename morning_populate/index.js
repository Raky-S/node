const StudentModel = require('./models/Student');

async function student() {
    const AdressModel = require('./models/Address');
    const StudentModel = require('./models/Student');

    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/mongoose_populate',
        { useUnifiedTopology: true, useNewUrlParser: true })

        
        const Adress1 = new AdressModel({
            streetName: 'Rue Crimée',
            streetNumber: '10',
        postCode: '75015',
        city: 'Paris'
    })

    // let addressID = AdressModel.findOne(Adress1._id, function (err, result) {
        //     console.log('here I am', result.id)
    // })
    // console.log('addressID', addressID);
    const resAdress1 = await Adress1.save()
    
    const Student1 = new StudentModel({
        firstName: 'Lili',
        surname: 'Line',
        address: Adress1._id
    });

    const resStudent = await Student1.save()
    
    
    StudentModel
    .findOne({_id: Student1._id})
    .populate('address')
    .exec((err, result )=> {
        console.log('The info student is',result)
    });
}

student()

// const Adress1 = await AdressModel.create({
//     streetName: 'Rue Crimée',
//     streetNumber: '10',
//     postCode: '75015',
//     city: 'Paris'
// })
//     .then(data => console.log('data', data))
//     .catch(err => console.log(err))

// // let addressID = AdressModel.findOne(Adress1, function (err, result) {
// //     console.log('here I am', result.id)
// // })



// const Student1 = await StudentModel.create({
//     firstName: 'Lilli',
//     surname: 'Line',
//     address: AdressModel.id,

// }).then(data => console.log('data student', data))
//     .catch(err => console.log(err))


