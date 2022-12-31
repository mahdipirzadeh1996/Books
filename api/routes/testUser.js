const router = require("express").Router();
const mysql = require('mysql');

const verify = require('../verifyToken');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "medibookdb",
});

//Get user myql
router.get("/:user", verify,  async (req, res) => {
    const user = JSON.parse(req.params.user);
    const sqlSelect = "SELECT * FROM `tbl_user` where phone =" + user.phone;
    
    try {
        await db.query(sqlSelect, (err, result) => {
            if (err) {
                res.status(403).json(err);
            } else {
                if (result === undefined) {
                    res.status(200).json("Wrong");
                } else {
                    if (String(result) !== "")
                        res.status(200).json(result);
                    else
                        res.status(200).json("not found");
                }
            }
        });
    } catch (e) {
        res.status(403).json(e);
    }
});

module.exports = router;