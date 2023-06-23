const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
       await mongoose.connect(process.env.MONGODB_CNN, {
        // useNewUrlParser: true,
        // useUnifieldTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
       }); 

       console.log('DB Online');

    } catch (error) {
        throw new Error(error);
    }


}

module.exports = {
    dbConnection
}