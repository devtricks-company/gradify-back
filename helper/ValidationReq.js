const {body,validationResult} = require('express-validator');
class ValidationReq{
    static checkRegisterStudent(){
        return [
            body('firstName').not().isEmpty().withMessage('FirstName is required'),
            body('lastName').not().isEmpty().withMessage('LastName is required'),
            body('email').not().isEmpty().isEmail().withMessage('Email is required and must follow the email pattern'),
            body('age').not().isEmpty().isNumeric().withMessage('please insert age'),
            body('genderID').not().isEmpty().isNumeric().withMessage('GenderID is required'),
            body('password').isLength({min:6}).withMessage('please insert your password at least with 6 character'),
            body('teamID').not().isEmpty().isNumeric().withMessage('teamID is required'),
            
            

        ]
    }

    static checkLogin(){
        return [
            body('user').not().isEmpty().withMessage("please insert your username or email"),
            body('password').isLength({min:6}).withMessage('please insert your password at least with 6 character')
        ]
    }

    static checkRegisterAdmin(){
        return [
            body('name').not().isEmpty().withMessage('name is required!'),
            body('email').isEmail().withMessage('email is required and should be email pattern'),
            body('password').isLength({min:6}).withMessage('password must be at least 6 character'),

        ]
    }

    static checkAdminLogin(){
        return [
           
            body('email').isEmail().withMessage('email is required and should be email pattern'),
            body('password').isLength({min:6}).withMessage('password must be at least 6 character'),

        ]
    }

    static validate(req,res,next){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                res.status(400).json({msg:errors.array()});
        }

        return next();
    }
}

module.exports = ValidationReq;