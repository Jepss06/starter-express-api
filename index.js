var express = require("express");
const port = process.env.PORT || 2000;
var app = express();
const router = require("./router/router");
const bodyparser = require("body-parser");
const db = require("./Connect");
const path = require("path");
//priode waktu yang dimulai ketika seorang pengguna mulai berinteraksi hingga berakhirnya interaksi. Session juga menyimpan data pengguna untuk berinteraksi.
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);


//menerima permintaan dari user
app.use(bodyparser.urlencoded({ extended: true }));

const sessionStore = new MySQLStore(
  {
    expiration: 24 * 60 * 60 * 1000,
    //sesi akan habis selama 1 hari
    clearExpired: true,
    //membersihkan sesi yang udah kadaluarsa
    createDatabaseTable: true,
    //membuat tabel di database secara otomatis
  },
  db
  //untuk memberi tahu database yang di perintahkan untuk membuat tabel baru
);

app.use(
  session({
    secret: "secret-key",
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

//berfungsi untuk menggabungkan folder dengan public, dan menjalankan fungsi file css dan juga js.
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.use(router);
app.listen(port, () => {
  console.log("server create");
});
