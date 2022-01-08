const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_KEY = "BLooDBorNE212$";

// Router 1 : createUser POST: /api/auth/createuse : on login required
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json('fill the following details');
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Email is already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const addedSalt = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: addedSalt
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_KEY)
        success=true;
        res.json({success, authToken})


    } catch (error) {
        console.error({ error: error.message })
        res.status(500).send('internal error occured')
    }
})

// Router 2 : authentication of email and password POST: /api/auth/authentication : no login required
router.post('/authentication', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
    }

    try {
        const {email, password} = req.body;

        let user = await User.findOne({ email })
        if (!user) {
            success=false;
            return res.status(400).json({ error: "This email dosent exist" })
        }

        const compPas = await bcrypt.compare(password, user.password)
        if (!compPas) {
            success=false;
            return res.status(400).json({ success, error: "Fill the correct cardentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_KEY)
        success = true;
        res.json({success, authToken})


    } catch (error) {
        console.error({ error: error.message })
        res.status(500).send('internal error occured')
    }
})

// Router 3 : Logged in data POST: /api/auth/getuser : logged in
router.post('/login',fetchuser,  async(req, res)=>{
try{
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")
    if (!user) {
        return res.status(400).json({ error: "The user dosen't exists" })
    }

    res.json(user)

}catch (error) {
    console.error({ error: error.message })
    res.status(500).send('internal error occured')
}
})
module.exports = router;