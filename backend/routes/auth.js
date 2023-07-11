const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "$arthakProject123";
var fetchuser = require('../middleware/fetchuser');

//Create User
router.post('/createuser', [
    body('name',"Enter the name atleast long enough").isLength({ min: 3 }),
    body('email', "Enter the valid email").isEmail(),
    body('password', "Enter atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    const input_error = validationResult(req);
    let success = false;

    if (!input_error.isEmpty()) {
        return res.status(400).json({ errors: input_error.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exist" });
        }

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Creating User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }

        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Invalid Server Error");
    }
});

//Login
router.post('/login', [
    body('email', "Enter the valid email").isEmail(),
    body('password', "enter valid password").notEmpty()
], async (req, res) => {

    const input_error = validationResult(req);
    let success = false;

    if (!input_error.isEmpty()) {
        return res.status(400).json({ success, errors: input_error.array() });
    }

    const { email, password } = req.body;

    try {

        //finding user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        //checking password 
        const pass_check = await bcrypt.compare(password, user.password);
        if (!pass_check) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Getting user
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports = router