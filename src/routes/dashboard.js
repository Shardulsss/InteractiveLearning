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

router.get('/fun',ensureAuthenticated, (req,res)=>{
    res.render('fun_dashboard',{
        name:req.user.name
    })
})

router.get('/stories',ensureAuthenticated, (req,res)=>{
    const stories = ["_xEDCg-9lIw","WbliHNs4q14","e4Uq8O5ZhUA"]
    const num = Math.floor(Math.random()*stories.length);
    const story=stories[num]
    res.render('stories',{
        name:req.user.name,
        story:story
    })
})

router.get('/stories',ensureAuthenticated, (req,res)=>{
    const stories = ["_xEDCg-9lIw","WbliHNs4q14","e4Uq8O5ZhUA"]
    const num = Math.floor(Math.random()*stories.length);
    const story=stories[num]
    res.render('rhymes',{
        name:req.user.name,
        story:story
    })
})

router.get('/practice/numbers',ensureAuthenticated, (req,res)=>{
    res.render('practice_numbers',{
        name:req.user.name
    })
})

router.get('/one',ensureAuthenticated, (req,res)=>{
    if(req.query.uid==0){
        res.render('practice0',{
            name:req.user.name
        })
    }
    else if(req.query.uid==1){
        res.render('practice1',{
            name:req.user.name
        })
    }
    else if(req.query.uid==2){
        res.render('practice2',{
            name:req.user.name
        })
    }
    else if(req.query.uid==3){
        res.render('practice3',{
            name:req.user.name
        })
    }
    else if(req.query.uid==4){
        res.render('practice4',{
            name:req.user.name
        })
    }
    else if(req.query.uid==5){    
        res.render('practice5',{
            name:req.user.name
        })
    }
    else if(req.query.uid==6){
        res.render('practice6',{
            name:req.user.name
        })
    }
    else if(req.query.uid==7){
        res.render('practice7',{
            name:req.user.name
        })
    }
    else if(req.query.uid==8){
        res.render('practice8',{
            name:req.user.name
        })
    }
    else if(req.query.uid==9){   
        res.render('practice9',{
            name:req.user.name
        })
    }
})



router.get('/practice/alphabets',ensureAuthenticated, (req,res)=>{
    res.render('practice_alphabets',{
        name:req.user.name
    })
})
module.exports=router