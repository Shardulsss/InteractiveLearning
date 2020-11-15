const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../../config/auth')


router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/dashboard',ensureAuthenticated, (req,res)=>{
    res.render('dashboard',{
        name:req.user.name
    })
})

router.get('/test',ensureAuthenticated, (req,res)=>{
    
    res.render('trial',{
        name:req.user.name
    })
})

router.post('/imgdatas',ensureAuthenticated,(req,res)=>{
    // const imguri = req.body.texti
    // console.log(imguri)
    img=req.body.imgURI
    num=req.body.num
    console.log(img)
    console.log(num)
    res.redirect('/test')
})
module.exports = router;