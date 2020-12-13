import  mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique : true,
        dropDups: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['student', 'instructions', 'admin'],
        default: 'student'
    },
    password: { 
        type: String,
        required: [true, 'Please add password'],
        minlength: 6,
        select: false
    },
    restPasswordToken: String,
    restPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


userSchema.pre('save', async function(next)
{
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function()
{
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRE
   });
}


userSchema.methods.matchPassword = async function(enteredPassword)
{
   return await bcrypt.compare(enteredPassword, this.password);
}



export default mongoose.model("User", userSchema);