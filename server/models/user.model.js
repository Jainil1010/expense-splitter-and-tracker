import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User name is required'],
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'User password us required'],
        minLength: [6, 'Password length must be greater then 6']
    }
}, { timestamps: true} );

const User = mongoose.model('User', useSchema);

export default User;