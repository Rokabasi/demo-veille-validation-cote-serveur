const express = require('express')
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator')


const app = express()
const port = 3000

app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({extended : false})

app.get('',(req,res)=>{
    res.render('index')
})

app.get('/register', (req,res) =>{
    res.render('register')
})

app.post('/register', urlencodedParser ,[
    check('username', 'this username must have 3+ characters long')
        .exists()
        .isLength({min : 3}),
    check('email', 'email is not valide')
        .isEmail()
        .normalizeEmail()
],(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // return res.status(422).json(errors.array())
        const alert = errors.array()
        res.render('register', {
            alert})
    }
})

app.listen(port, ()=>{
    console.log(`on http://localhost:${port}`);
})