var jwt = require('jsonwebtoken');
const JWT_SECRET = "$arthakProject123";

const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token');

    if(!token){
        res.status(401).json({error: "Please authenticate using a vlid token"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        // console.log("second")
        res.status(401).json({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;
