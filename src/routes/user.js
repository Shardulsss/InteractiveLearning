const express = require('express');
const router = express.Router();
const alert1 = require('alert')
const bcrypt =  require('bcryptjs')
const passport = require('passport')

const User = require('../models/User')

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',(req,res)=>{
    const {name, email, password, password2} = req.body
    if(!name || !email || !password || !password2){
        alert1("Please fill all fields")
        res.render('register')
    }
    else if(password2!=password){
        alert1("passwords don't match")
        res.render('register')
    }
    else if(password.length<6){
        alert1("password too small")
        res.render('register')
    }
    else{
        User.findOne({email:email}).then((user)=>{
            if(user){
                alert1("User with this email exists")
                res.render('register')
            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password,
                    
                })

                bcrypt.genSalt(10, (err,salt)=>bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err)throw err;
                    newUser.password=hash;
                    newUser.save().then(user=>{
                        console.log(newUser)
                        alert1("Registered successfully")
                        res.redirect('/users/login')
                    })
                }))
            }
        })
    }    
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login'
    })(req,res,next)
})


router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/users/login')
})


module.exports = router;