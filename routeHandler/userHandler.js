const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchema');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { name, password, userName, status } = req.body;
        const hashedPassword = await bcrypt.hash(password, +process.env.SALT_NUMBER);
        const newUser = new User({
            name,
            userName,
            password: hashedPassword,
            status,
        });
        const result = await newUser.save();
        res.status(200).json({
            result,
            message: 'signup success',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Signup failed',
        });
    }
});
userRouter.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const myUser = await User.find({ userName });
        if (myUser && myUser[0].password) {
            // check password is matched
            const isValid = bcrypt.compare(myUser[0].password, process.env.SALT_NUMBER);
            if (isValid) {
                // create jwt token
               const token= await jwt.sign({ userName, userId: myUser[0]._id }, process.env.JWT_SECRET_KEY,{
                    expiresIn:"1h"
                });
                if(token){
                    res.status(200).json({
                        token,
                        message:'login Success'
                    })
                }
            } else {
                console.log(isValid);
                res.status(401).json({
                    error: 'Authorization Failed',
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Login failed',
        });
    }
});
userRouter.get('/', async (req, res) => {
    try {
        const data = await User.find({ userName: { $nin: ['almamun'] } }, { name: 0, password: 0 });
        res.status(200).json({
            data,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});
userRouter.delete('/many', async (req, res) => {
    try {
        const result = await User.deleteMany({ userName: { $nin: ['almamun'] } });
        res.status(200).json({
            result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

module.exports = userRouter;
