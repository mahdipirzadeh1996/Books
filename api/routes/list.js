const router = require("express").Router();
const mysql = require('mysql');

const verify = require('../verifyToken');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "medibookdb",
});

//Get all myql
router.get("/", async (req, res) => {
    const sqlSelect = "SELECT * FROM `tbl_list`";
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

//create
router.post("/", async (req, res) => {
    const sqlInsert = "INSERT INTO `tbl_list`(`content`, `title`, `isBook`) VALUES (?, ?, ?)";
    const listItem = req.body.listItem;
    const content = JSON.stringify(req.body.content);

    try {
        await db.query(sqlInsert, [content, listItem.title, listItem.isBook], (err, result) => {
            //res.send(result);
            if (err) {
                return res.status(500).json(err);
            }
            const x = res.statusCode;
            if (String(x) === "200") {
                return res.status(201).send("Success");
            }
        });
    } catch (e) {
        res.status(403).json(e);
    }
});

//DELETE
router.delete("/:id/", async (req, res) => {
    const sqlDelete = "DELETE FROM `tbl_list` WHERE `id`=" + req.params.id;

    try {
        await db.query(sqlDelete, (err, result) => {
            if (err) {
                res.status(403).json(err);
            } else {
                res.status(200).send("Success");
            }
        });
    } catch (e) {
        console.log(e)
        res.status(403).json(e);
    }
});


//UPDATE
router.put("/", async (req, res) => {
    const listItem = req.body.listItem;
    const content = JSON.stringify(listItem.content);

    const sqlUpdate = "UPDATE `tbl_list` SET `title`='" + listItem.title + "',`isBook`=" + listItem.isBook + ",`content`='" + content + "' WHERE `id`=" + listItem.id;

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

//Get listItem myql
router.get("/getlistitem/:content", async (req, res) => {
    const sqlSelect = "SELECT * FROM `tbl_book` WHERE `name`='" + req.params.content + "'";

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