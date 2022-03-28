
const User = require("../models/user.models");
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ user }, "masai");
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).send({ message: "Email already registered" });
        }
        user = await User.create(req.body);

        const token = generateToken(user);
        return res.status(200).send({ user, token });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}


const login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Wrond Email or Password");
        }
        const match = user.checkpassword(req.body.password);
       
        if (!match) {
            return res.status(400).send(({ message: "Wrong Email or Password" }))
        }
        const token = generateToken(user);
        return res.status(200).send({ user, token });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}


module.exports = { register, login };