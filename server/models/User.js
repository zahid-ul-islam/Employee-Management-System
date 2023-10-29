const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        first_Name:{
            type: String
        },
        last_Name:{
            type: String
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        
    },
    {timestamps:true}
)
module.exports = User =mongoose.model("User", UserSchema);