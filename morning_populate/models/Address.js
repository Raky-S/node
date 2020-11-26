const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose_populate',
    { useUnifiedTopology: true, useNewUrlParser: true })


    
    const adressSchema= new mongoose.Schema ({
        streetName:	String,
        streetNumber: String,
        postCode: String,
        city: String
    })
   
    const AddresstModel = mongoose.model('Address', adressSchema);
    

    module.exports = AddresstModel