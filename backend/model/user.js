import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    socialMedia: { type: String, default: '' }, // Social media field
    image: {
        url: { type: String, default: '' },
        public_id: { type: String, default: '' },
    },
    image1: {
        url: { type: String, default: '' },
        public_id: { type: String, default: '' },
    },
    image2: {
        url: { type: String, default: '' },
        public_id: { type: String, default: '' },
    },
    image3: {
        url: { type: String, default: '' },
        public_id: { type: String, default: '' },
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({
    image1: {
        public_id: String,
        url: String
    },
    image2: {
        public_id: String,
        url: String
    },
    image3: {
        public_id: String,
        url: String
    },
});
}
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
    });

};

export const User = mongoose.model("User", userSchema);
