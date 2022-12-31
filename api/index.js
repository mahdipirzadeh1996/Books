const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mysql = require('mysql');
const path = require("path");
const ejs = require("ejs");

const authRoute = require("./routes/auth");
const bookRoute = require("./routes/books");
const userRoute = require("./routes/user");
const listRoute = require("./routes/list");
const testRoute = require("./routes/testUser");
const statusRoute = require("./routes/status");

const app = express();
app.use(express.json());
app.use(express.static("uploads"));

dotenv.config();

var db_config = {
  host: 'medibooks.ir',
  user: 'medibook_mahdi',
  password: '13741222Mahdi',
  database: 'medibook_roshandb'
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {              // The server is either down
    if (err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
    console.log("Connected!");            // process asynchronous requests in the meantime.
  });
  // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

app.listen(8800, () => {
  console.log("Backend is running");
});

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
app.use("/api/users", userRoute);
app.use("/api/lists", listRoute);
app.use("/api/testuser", testRoute);
app.use("/api/checkstatus", statusRoute);



const dirPath = path.join(__dirname, "./uploads");

const files = fs.readdirSync(dirPath).map(name => {
  return {
    name: path.basename(name, ".pdf"),
    url: `/${name}`
  };
});

app.set("view engine", "ejs");
app.get('/pdf', function (request, response) {
  //response.status(200).json(dirPath);
  const file = files.find(f => f.name === 'img-1640646390572.pdf');
  response.render("index", { files });
});

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "medibookdb",
});

app.use(cors());
app.get("/pdfs/:name", async (req, res) => {
  const sqlSelect = "SELECT `book` FROM `tbl_book` WHERE `name`='" + req.params.name + "'";
  try {
    await db.query(sqlSelect, (err, result) => {
      if (err) {
        res.status(403).json(err);
      } else {
        if (result === undefined) {
          res.status(200).json("Wrong");
        } else {
          if (String(result) !== "") {
            var file = fs.createReadStream("./uploads/" + result[0].book);
            file.pipe(res);
          } else
            res.status(200).json("not found");
        }
      }
    });
  } catch (e) {
    res.status(403).json(e);
  }
});