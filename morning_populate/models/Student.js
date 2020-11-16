const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose_populate',
    { useUnifiedTopology: true, useNewUrlParser: true })



    const studentsSchema= new mongoose.Schema ({
        firstName: String,
        surname: String,
        address: {
            type: mongoose.Types.ObjectId,
            ref: "Address"
        }
    })
   
    const StudentModel = mongoose.model('Student', studentsSchema);
    

    module.exports = StudentModel