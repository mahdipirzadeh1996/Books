const router = require("express").Router();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "medibookdb",
});

//Get all myql
router.get("/", async (req, res) => {
    const sqlSelect = "SELECT * FROM `tbl_user`";
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

//UPDATE
router.put("/:phone/:status/", async (req, res) => {
    const status = req.params.status;
    const phone = req.params.phone;

    const sqlUpdate = "UPDATE `tbl_user` SET `status`=" + status + " WHERE `phone`=" + phone;

    try {
        await db.query(sqlUpdate, (err, result) => {
            if (err) {
                res.status(403).json(err);
            } else {
                res.status(200).send("Success");
            }
        });
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;