const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../src/models/User');
const passport = require('passport');


module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField:'email'},(email,password,done)=>{
            User.findOne({email:email}).then(user=>{
                if(!user){
                    return done(null, false)
                }
                bcrypt.compare(password, user.password, (err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user)
                    }
                    else{
                        return done(null,false)
                    }
                })
            }).catch(err=>{console.log(err)})
        })
    )
    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
            done(err, user);
        });
    });

}