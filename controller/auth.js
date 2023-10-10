const db = require("../Connect");
const bcrypt = require("bcrypt");
const login = (req, res) => {
  res.render("login", { clas: "", pesan: "", username: "" });
};
const register = (req, res) => {
  res.render("register", {
    clas: "",
    pesan: "",
    username: "",
    status: "",
    judul: "",
  });
};
const registrasi = (req, res) => {
  const { username, password, pass_confirm } = req.body;
  const Check = `SELECT * FROM user WHERE username = '${username}'`;
  db.query(Check, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      return res.render("register", {
        clas: "danger",
        pesan: "username telah terdaftar, silahkan sadar diri",
        username: req.body.username,
        status: 0,
        judul: "oops...",
      });
    }
    if (password != pass_confirm) {
      return res.render("register", {
        clas: "error",
        pesan: "password anda beda partai",
        username: req.body.username,
        status: 1,
        judul: "oops...",
      });
    }
    bcrypt.hash(password, 10, (errorhash, hash) => {
      if (errorhash) throw errorhash;
      const min = 100000;
      const max = 999999;
      const token = Math.floor(Math.random() * (max - min + 1) + min);
      const sql = `INSERT INTO user(username, password, token, role) VALUES ('${username}', '${hash}', '${token}', '1')`;
      db.query(sql, (error, result) => {
        if (error) throw error;
        res.render("register", {
          clas: "success",
          pesan: "cie berhasil",
          username: "",
          status: 2,
          judul: "Horeee!!!",
        });
      });
    });
  });
};

const auth = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.render("login", {
      pesan: "username dan password tidak boleh kosong, cukup hati aja",
      clas: "danger",
      username: "",
    });
  }
  const sql = `SELECT * FROM user WHERE username = '${username}'`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      return res.render("login", {
        pesan: "username tidak temukan",
        clas: "danger",
        username: "",
      });
    }
    //jika user ditemukan
    const user = result[0];
    //user.saldo
    bcrypt.compare(password, user.password, (bcrypterror, bcryptRes) => {
      if (bcrypterror) throw bcrypterror;
      if (!bcryptRes) {
        return res.render("login", {
          pesan: "password salah",
          clas: "danger",
          username: "",
        });
      }
      req.session.user = {
        id: user.id_user,
        username: user.username,
      };
      res.redirect("/Market");
    });
  });
};
const logout = (req, res) => {
  req.session.destroy();
  res.render("login", {
    pesan: "berhasil logout",
    clas: "success",
    username: "",
  });
};
module.exports = { login, register, registrasi, auth, logout };
