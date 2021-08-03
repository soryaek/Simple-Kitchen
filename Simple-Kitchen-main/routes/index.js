const express = require('express');
const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator');
const path = require('path');
const auth = require('http-auth'); //locking down the list of successful registrations from prying eyes.
const bcrypt = require('bcrypt'); 

const router = express.Router();
const Registration = mongoose.model('Registration'); 

// const Registration = mongoose.model('Registration', registrationSchema)

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
})

router.get('/', function (req,res){
    res.render('index', {title: "Welcome"});
})

router.get('/register', function (req,res){
    res.render('register', {title: "Registration form"});  
});

router.get('/recipes', function (req,res){
    res.render('recipes', {title: "Recipes "});  
});

router.get('/registrants', basic.check((req,res) => {
    Registration.find()
        .then((registrations) => {
            res.render('registrants', {title: 'Listing registrations', registrations});       
        })
        .catch(() => {res.send('Sorry! Something went wrong.');});
}));

router.post('/', 
    [
        check('name')
            .isLength({min:1})
            .withMessage('Please enter a name'),
        check('email')
            .isEmail()
            .exists()
            .isLength({min:1})
            .withMessage('Please enter an email'),
            
        check('username')
            .isLength({min:1})
            .exists()
            .withMessage('Please enter username'),
        check('password')
            .isLength({min:8})
            .withMessage('Please enter password'),
    ],  
    async (req,res) => {
        const errors = validationResult(req); 
        if (errors.isEmpty()){ 
            const registration = new Registration(req.body);
            //generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            //set user password to hashed password
            registration.password = await bcrypt.hash(registration.password, salt);

            // Registration.findOne({registration.email == email} )
            registration.save()   
                // .then(() => {res.send('Thank you for your registration');})
                .then(() => {
                    res.render('thankyou', {title: "Thank you"});
                })

                .catch((err) => {
                    console.log(err);
                    res.send('Sorry! Something went wrong')
                });
        }else{
            res.render('register', {
                title: 'Registration form',
                errors: errors.array(),
                data:req.body
            });
        }
    });

module.exports = router;

