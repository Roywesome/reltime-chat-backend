const mongoose = require('mongoose');
const  bcrypt =  require('bcrypt');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    }
});

const UserModel = model("User", userSchema);


///Autenticar al usuario
userSchema.methods.checkPassword = async function (passForm) {
    return await bcrypt.compare(passForm, this.password);
  };

module.exports = UserModel;