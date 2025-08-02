import express, {Request, Response} from 'express'
import { body , validationResult} from 'express-validator'
import { RequestValidationError } from '../errors/request-validation'
import { validateRequest } from '../middlewares/validate-request'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/api/users/signin',
    [   
        body('email')
            .isEmail()
            .withMessage('Enter valid email'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
        validateRequest
    ,async (req: Request,res: Response) => {

        const { email, password } = req.body

        const existingUser = await User.findOne({email})
        if(!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordsMatch = await Password.compare(existingUser.password,password)

        if(!passwordsMatch) {
            throw new BadRequestError('Invalid credentials')
        }

        // Generate JWT 
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            },
            'asff'
        )

        // Stores it on session object
        req.session = {
            jwt: userJwt
        }

        res.status(200).send({message: "logged in",existingUser})
    })



export { router as signinRouter}