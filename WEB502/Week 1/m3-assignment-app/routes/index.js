const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

router.get('/', function (req,res){
    res.render('form', {title: "Registration form"});  //render "form.pug" 
});

router.post('/', 
    [
        check('name')
            .isLength({min:1})
            .withMessage('Please enter a name'),
        check('email')
            .isEmail()
            .isLength({min:1})
            .withMessage('Please enter an email'),
    ],  
    function(req,res){
        // console.log(req.body);
        const errors = validationResult(req); //to see if validation passed or failed.
        if (errors.isEmpty()){
            res.send('Thank you for your registration');    
        }else{
            res.render('form', {
                title: 'Registration form',
                errors: errors.array(),
                data:req.body
            });
        }
    });

module.exports = router;

