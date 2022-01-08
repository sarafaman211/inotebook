const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_KEY = "BLooDBorNE212$";

const fetchuser = (req, res, next)=>{

    const token = req.header('auth-token');
    if(!token){
        return res.status(400).json({error: "auth token dosen't found"})
    }

    const authToken = jwt.verify(token, JWT_KEY);
    req.user = authToken.user

    next()
}

module.exports = fetchuser;