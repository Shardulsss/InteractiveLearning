const path = require('path')
const express = require('express');
const hbs = require('express-handlebars')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
const layoutPath = path.join(__dirname,'../templates/views/layouts')
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const session = require("express-session")
const passport = require('passport')


const app = express();

//passport
require('../config/passport')(passport)

//database
require('../src/db/mongoose')

//view engine
app.engine('handlebars', hbs({defaultLayout:'layout', layoutDir:layoutPath, partialsDir:partialPath}))
app.set('view engine','handlebars')
app.set('views', viewPath)
//hbs.registerPartials(partialPath)

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
 
//express sessions
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use("/",require('../src/routes/index'))
app.use('/users',require('../src/routes/user'))

app.listen(port,()=>{
    console.log("running")
});