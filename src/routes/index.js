const express = require('express');
const router = express.Router();
const ratelimit = require('../middleware/ratelimit');
const { ensureAuthenticated } = require('../../config/auth')
const User = require('../models/User')

router.use('/test',ratelimit.limiter1);
router.use('/testlvl1',ratelimit.limiter2);


router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/dashboard',ensureAuthenticated, async (req,res)=>{
    
    try{
        user = await User.findOne({_id:req.user._id})
        m=user.marks
        console.log(m)
        m=m.reverse()
        score = m[0] + m[1] + m[2] + m[3] 
        score = score * 25
    }
    catch{
        console.log("error")
    }
    res.render('dashboard',{
        name:req.user.name,
        score:score
    })
})

router.get('/testdashboard',ensureAuthenticated,(req,res)=>{
    res.render('testdashboard',{
        name:req.user.name
    })
})

router.get('/testlvl1',ensureAuthenticated, (req,res)=>{

    res.render('testlvl1',{
        name:req.user.name
    })
})



router.get('/test',ensureAuthenticated, (req,res)=>{

    res.render('newmodel',{
        name:req.user.name
    })
})

router.get('/testaddition',ensureAuthenticated, (req,res)=>{

    res.render('testadd',{
        name:req.user.name
    })
})

router.get('/testscount',ensureAuthenticated, (req,res)=>{

    res.render('testcounts',{
        name:req.user.name
    })
})

router.post('/submittest',ensureAuthenticated,async (req,res)=>{
    
    marks=req.body.answer
    console.log(marks)
    
    try{
        user = await User.findOne({_id:req.user._id})
        m=user.marks
        if(marks=="Correct"){
            m.push(1)
        }
        else if(marks=="Wrong"){
            m.push(0)
        }
        if(m.length>8){
            m.splice(0, 1);
        }
        user.marks=m
        user.save()
        console.log(m)
    }
    catch{
        console.log("error")
    }
    
    
})

router.get('/new',(req,res)=>{
    res.render('trial')
})
router.get('/testdigits',(req,res)=>{
    res.render('newmodel')
})


module.exports = router;