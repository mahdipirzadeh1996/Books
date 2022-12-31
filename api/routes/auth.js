const router = require("express").Router();
const request = require('request');
const mysql = require('mysql');
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const verify = require("../verifyToken");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "medibookdb",
});

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

//Send Sms
router.post("/sendSms", async (req, res) => {
    const phone = req.body.phone;
    const code = String(between(100000, 999999));

    const sqlInsert = "INSERT INTO `tbl_sms`(`phone`, `code`) VALUES (?, ?)";
    cryptedCode = CryptoJs.AES.encrypt(code, process.env.SECRET_KEY).toString();

    try {
        await db.query(sqlInsert, [phone, cryptedCode], (err, result) => {
            //res.send(result);
            if (err) return console.log(err)
        });
        //res.status(201).json(res.statusCode);
        const x = res.statusCode;
        if (String(x) === "200") {
            console.log(code)
            res.status(201).json(CryptoJs.AES.encrypt(process.env.SUCCESS_INSERT, process.env.SECRET_KEY).toString());
            sendSms(phone, code);
        }
    } catch (e) {
        res.status(403).json(CryptoJs.AES.encrypt(process.env.ERROR_INSERT, process.env.SECRET_KEY).toString());
    }
})
const sendSms = (phone, code) => {
    request.post({
        url: 'http://ippanel.com/api/select',
        body: {
            "op": "pattern",
            "user": "9029292059",
            "pass": "morteza1375",
            "fromNum": "+983000505",
            "toNum": phone,
            "patternCode": "b3u5mbuoky",
            "inputData": [
                { "code": code },
                { "brand": "bmw" }
            ]
        },
        json: true,
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
            //console.log(response.body);
        } else {
            console.log("whatever you want");

        }
    });
}

//Validate Sms
router.post("/validation", async (req, res) => {
    const phone = req.body.phone;
    const code = req.body.code;

    const sqlSelect = "SELECT `code` FROM `tbl_sms` WHERE `phone`=" + String(phone);
    try {
        await db.query(sqlSelect, (err, result) => {
            // Decrypt
            if (result === undefined) {
                res.status(403).json(CryptoJs.AES.encrypt(process.env.ERROR_DB, process.env.SECRET_KEY).toString());
            } else {
                const bytes = CryptoJs.AES.decrypt(result[0]["code"], process.env.SECRET_KEY);
                const originalCode = bytes.toString(CryptoJs.enc.Utf8);

                if (originalCode !== code) {
                    res.status(200).json(CryptoJs.AES.encrypt(process.env.FAILED_LOGIN, process.env.SECRET_KEY).toString());
                } else if (originalCode === code) {
                    const success = CryptoJs.AES.encrypt(process.env.SUCCESS_LOGIN, process.env.SECRET_KEY).toString();
                    res.status(200).json({ success });
                }
            }
        });
        //res.status(201).json("Success")
    } catch (e) {
        res.status(500).json(CryptoJs.AES.encrypt(process.env.ERROR_DB, process.env.SECRET_KEY).toString());
    }
});

//Delete Sms
router.delete("/deleteSms/:phone", async (req, res) => {
    const phone = req.params.phone;

    const sqlDelete = "DELETE FROM `tbl_sms` WHERE `phone` = ?";
    try {
        await db.query(sqlDelete, [phone], (err, result) => {
            if (err) console.log(err);
        });
        res.status(200).json(CryptoJs.AES.encrypt(process.env.SUCCESS_DELETE, process.env.SECRET_KEY).toString());
    } catch (e) {
        res.status(403).json(CryptoJs.AES.encrypt(process.env.ERROR_DELETE, process.env.SECRET_KEY).toString());
    }
});

//Insert user
router.post("/insertUser", async (req, res) => {
    const phone = req.body.phone;

    const sqlInsert = "INSERT INTO `tbl_user`(`phone`) VALUES (?)";

    try {
        await db.query(sqlInsert, [phone], (err, result) => {
            if (err) {
                if (err.errno === 1062) {
                    res.status(200).json(CryptoJs.AES.encrypt(process.env.LOGIN, process.env.SECRET_KEY).toString());
                }
            } else {
                res.status(201).json(CryptoJs.AES.encrypt(process.env.REGISTER, process.env.SECRET_KEY).toString());
            }
        });
    } catch (e) {
        res.status(403).json(e);
    }
});

//Get user
router.post("/getUser", async (req, res) => {
    const phone = req.body.phone;

    const sqlSelect = "SELECT * FROM `tbl_user` WHERE `phone`=" + String(phone);
    try {
        await db.query(sqlSelect, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result === undefined) {
                    res.status(200).json(CryptoJs.AES.encrypt(process.env.WRONG_NUM, process.env.SECRET_KEY).toString());
                } else {
                    //res.status(200).json(result[0]['phone']);
                    if (String(result) !== "") {
                        const accessToken = jwt.sign(
                            { phone: phone },
                            process.env.SECRET_KEY,
                            { expiresIn: "5d" }
                        );
                        res.status(200).json({ result, accessToken });
                    }
                    else
                        res.status(200).json(CryptoJs.AES.encrypt(process.env.WRONG_NUM, process.env.SECRET_KEY).toString());
                }
            }
        });
    } catch (e) {
        res.status(403).json(e);
    }
});

module.exports = router;