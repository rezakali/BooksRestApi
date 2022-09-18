const mongoose = require("mongoose")

/**Creating Schema */
const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    age:{
        type:Number,
        required:true,
        min:20,
        max:85
    }
})


module.exports = new mongoose.model("Author", AuthorSchema)