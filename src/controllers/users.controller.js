const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userRouter = {};

userRouter.signUp = async function(req,res){
    try
    {
        let loginId = req.body.loginId;
        let password = req.body.password;
        let hash = await bcrypt.hash(password,10);
        const newUser = await new User({
            loginId : loginId,
            password : hash
        })
        const user = newUser.save();
        res.status(201).json({status : "Success", result: newUser});
    }
    catch(err)
    {
        res.status(400).json({status : "failed", result : err.message});
    }
}

userRouter.login = async function(req,res){
    try
    {
        let loginId = req.body.loginId;
        let password = req.body.password;
        let user = await User.findOne({loginId});
        if(user)
        {
            let valid = await bcrypt.compare(password, user.password);
            if(valid)
            {
                const token = await jwt.sign({_id: user._id, loginId: user.loginId}, process.env.SECRET, {expiresIn : "1h"});
                res.status(200).json({status : "Success", result: "JWT "+token});
            }
            else
            {
                res.status(403).json({status : "Failed", result: "Unauthorized"});
            }
        }
    }
    catch(err)
    {
        res.status(400).json({status : "Failed", result : "invalid"})
    }
}
module.exports = userRouter;
