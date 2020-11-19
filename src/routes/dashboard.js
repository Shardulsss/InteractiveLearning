const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../../config/auth')


router.get('/learn',ensureAuthenticated, (req,res)=>{
    res.render('learn',{
        name:req.user.name
    })
})

router.get('/learn/colours',ensureAuthenticated, (req,res)=>{
    res.render('learn_colours',{
        name:req.user.name
    })
})

router.get('/learn/numbers',ensureAuthenticated, (req,res)=>{
    res.render('learn_numbers',{
        name:req.user.name
    })
})

router.get('/learn/alphabets',ensureAuthenticated, (req,res)=>{
    res.render('learn_alphabets',{
        name:req.user.name
    })
})


router.get('/practice',ensureAuthenticated, (req,res)=>{
    res.render('practice',{
        name:req.user.name
    })
})

router.get('/practice/numbers',ensureAuthenticated, (req,res)=>{
    res.render('practice_numbers',{
        name:req.user.name
    })
})
router.get('/practice/alphabets',ensureAuthenticated, (req,res)=>{
    res.render('practice_alphabets',{
        name:req.user.name
    })
})
module.exports=router