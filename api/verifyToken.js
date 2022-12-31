const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");

function verify(req, res, next) {
    const authHeader = req.headers.token;
    
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(200).json(CryptoJs.AES.encrypt(process.env.FALSE_TOKEN, process.env.SECRET_KEY).toString());
            }
            next();
        });
    } else {
        res.status(401).json(CryptoJs.AES.encrypt(process.env.NOT_AUTH, process.env.SECRET_KEY).toString())
    }
}

module.exports = verify;