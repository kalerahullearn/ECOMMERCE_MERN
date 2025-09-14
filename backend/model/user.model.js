import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already registered"],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide valid email address",
        ],
    },
    role: {
        type: String
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6,
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) return next(); 

    try {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
})

userSchema.methods.comparePassword = async function (passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
}


export const User = mongoose.model("User", userSchema);