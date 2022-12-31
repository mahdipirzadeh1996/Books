const router = require("express").Router();
const mysql = require('mysql');
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const verify = require("../verifyToken");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "medibookdb",
});

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const {
            body: { imgName }
        } = req;
        const fileType = path.extname(file.originalname);
        cb(null, imgName + '-' + Date.now() + fileType);
    }
});

//create
router.post("/", async (req, res) => {
    const imgUpload = multer({ storage: fileStorage }).any();

    imgUpload(req, res, async (err) => {
        if (err) {
            return res.status(500).json("Wrong " + err);
        }
        const sqlInsert = "INSERT INTO `tbl_book`(`name`, `price`, `writer`, `cat1`, `cat2`, `isBook`, `img`, `book`, `bookSummary`, `explaine`, `year`, `pages`, `isPublish`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const book = JSON.parse(req.body.bookItem);

        try {
            await db.query(sqlInsert, [book.name, book.price, book.writer, book.cat1, book.cat2, parseInt(book.isBook), String(req.files[0].filename), String(req.files[1].filename), String(req.files[2].filename), book.explaine, parseInt(book.year), book.pages, parseInt(book.isPublish)], (err, result) => {
                //res.send(result);
                if (err) {
                    fs.unlink(req.files[0].path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                    });
                    fs.unlink(req.files[1].path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                    });
                    fs.unlink(req.files[2].path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                    });
                    return res.status(500).json("Same data");
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
});

//Get all myql
router.get("/", async (req, res) => {
    const sqlSelect = "SELECT * FROM `tbl_book`";
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

//Get myql
router.get("/:name", async (req, res) => {
    const sqlSelect = "SELECT * FROM `tbl_book` WHERE `name`='" + req.params.name + "'";
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

//DELETE
router.delete("/:id/:img/:book/:bookSummary/", async (req, res) => {
    const sqlDelete = "DELETE FROM `tbl_book` WHERE `id`=" + req.params.id;

    try {
        await db.query(sqlDelete, (err, result) => {
            if (err) {
                res.status(403).json(err);
            } else {
                res.status(200).send("Success");

                fs.unlink("uploads\\" + req.params.img, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    //file removed
                });
                fs.unlink("uploads\\" + req.params.book, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    //file removed
                });
                fs.unlink("uploads\\" + req.params.bookSummary, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    //file removed
                });
            }
        });
    } catch (e) {
        console.log(e)
        res.status(403).json(e);
    }
});

//UPDATE
router.put("/:id/:book/", async (req, res) => {
    const book = JSON.parse(req.params.book);
    const imgUpload = multer({ storage: fileStorage }).any();

    imgUpload(req, res, async (err) => {
        if (err) {
            return res.status(500).json("Wrong " + err);
        }

        const img = req.files[0] === undefined ? book.img : String(req.files[0].filename);
        const bookPDF = req.files[1] === undefined ? book.book : String(req.files[1].filename);
        const bookSummary = req.files[2] === undefined ? book.bookSummary : String(req.files[2].filename);

        const sqlUpdate = "UPDATE `tbl_book` SET `name`='" + book.name + "',`price`='" + book.price + "',`writer`='" + book.writer + "',`cat1`='" + book.cat1 + "',`cat2`='" + book.cat2 + "',`isBook`=" + book.isBook + ",`img`='" + img + "',`book`='" + bookPDF + "',`bookSummary`='" + bookSummary + "',`explaine`='" + book.explaine + "',`year`=" + book.year + ",`pages`='" + book.pages + "',`isPublish`=" + book.isPublish + " WHERE `id`=" + book.id;
        
        try {
            await db.query(sqlUpdate, (err, result) => {
                if (err) {
                    res.status(403).json(err);
                } else {
                    res.status(200).send("Success");

                    req.files[0] !== undefined && fs.unlink("uploads\\" + book.img, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        //file removed
                    });
                    req.files[1] !== undefined && fs.unlink("uploads\\" + book.book, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        //file removed
                    });
                    req.files[2] !== undefined && fs.unlink("uploads\\" + book.bookSummary, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        //file removed
                    });
                }
            });
        } catch (e) {
            console.log(e)
        }
    });
});

//search
router.post("/search", async (req, res) => {
    let searchText = req.body.searchText;
    let isBook = req.body.isBook;
    let titleType = req.body.titleType;
    let cat1 = req.body.cat1;
    let cat2 = req.body.cat2;
    let minYear = req.body.minYear;
    let maxYear = req.body.maxYear;

    let searchSql;
    switch (titleType) {
        case "1":
            searchSql = "SELECT * FROM `tbl_book` where `name` like '%" + String(searchText) + "%' AND isBook=" + isBook;
            break;
        case "2":
            searchSql = "SELECT * FROM `tbl_book` where `writer` like '%" + String(searchText) + "%' AND isBook=" + isBook;
            break;
        case "3":
            //searchSql = "SELECT genre FROM `tbl_book` where `genre` " + db.escape(genreArr) + ") AND isBook=" + isBook;
            searchSql = "SELECT * FROM `tbl_book` where (";
            for (let i = 0; i <= cat1.length - 1; i++) {
                searchSql += "`cat1` LIKE '%" + cat1[i] + "%' OR ";
            }
            for (let i = 0; i < cat2.length - 1; i++) {
                searchSql += "`cat2` LIKE '%" + cat2[i] + "%' OR ";
            }
            searchSql += "`cat2` LIKE '%" + cat2[cat2.length - 1] + "%') AND isBook=" + isBook + " AND `year` >= " + minYear + " AND `year` <= " + maxYear;
            break;
    }
    db.query(searchSql, (err, result) => {
        res.status(200).json(result);
    });
});

module.exports = router;