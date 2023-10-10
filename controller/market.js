const db = require("../Connect");
const getMarket = (req, res) => {
  const sql = "SELECT * FROM jenisbarang";
  db.query(sql, (error, result) => {
    const jenisbarang = result;
    if (req.session.user) {
      const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`;
      db.query(sql, (error, result) => {
        if (error) throw error;
        const user = result[0];
        const formatSaldo = (saldo) => {
          return saldo.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          });
        };
        res.render("jenisbarang", {
          jenis: jenisbarang,
          user: user,
          formatSaldo,
        });
      });
    } else {
      res.render("jenisbarang", {
        jenis: jenisbarang,
        user: "",
      });
    }
  });
};

const tambahJenis = (req, res) => {
  const sql = `INSERT INTO jenisbarang(JenisBarang) VALUES ('${req.body.JenisBarang}')`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("/");
  });
};

const hapusJenis = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM jenisbarang WHERE Id_JenisBarang = ?";
  db.query(sql, id, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};
//Create read, update delete

const pilihBarang = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM barang WHERE Id_JenisBarang = ${id}`;
  db.query(sql, (error, result1) => {
    if (error) throw error;
    const barang = result1;
    const formatSaldo = (saldo) => {
      return saldo.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    };
    //pilih semua tabel transaksi gabungkan dengan brang yang id_barang pada transaksi sama dengan id_barang di tabel barang
    if (req.session.user) {
      const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`;
      db.query(sql, (error, result) => {
        if (error) throw error;
        const user = result[0];
        const sql2 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
        console.log(req.session.user.id);
        db.query(sql2, (error, result2) => {
          const transaksi = result2;
          //pilih dan tambahkan seluruhnya pada kolom total harga yang akan dipanggil sebagai total didalam tabel transaksi di gabungkan dengan barang yang id_barang pada kedua tabel harus sama. dalam kata lain didua tabel tersebut harus sama sama ada id nya. agar total yang muncul hanya keseluruhan total harga yang ada pada transaksi yang ada pada layar
          const sql3 = `SELECT SUM(total_harga) AS total FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
          db.query(sql3, (error, result3) => {
            if (error) throw error;
            total = result3;
            res.render("barang", {
              bar: barang,
              idJ: id,
              transaksi,
              formatSaldo,
              total,
              user: user,
            });
          });
        });
      });
    } else {
      res.render("barang", {
        bar: barang,
        idJ: id,
        transaksi: "",
        formatSaldo,
        total: "",
        user: "",
      });
    }
  });
};

const tambahBarang = (req, res) => {
  const image = req.file ? req.file.filename : null;
  const sql = `INSERT INTO barang(Nama_barang, harga, id_jenisBarang, stock, new_stock, image) VALUES ('${req.body.Namabarang}','${req.body.harga}', '${req.body.id_JenisBarang}', '${req.body.stock1}', '${req.body.stock1}', '${image}')`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
    console.log(sql);
  });
};

const tambahTransaksi = (req, res) => {
  if (!req.session.user) {
    return res.render("login", {
      pesan: "anda harus login terebih dahulu",
      clas: "danger",
      username: "",
    });
  } else {
    const sql = `INSERT INTO transaksi (id_barang, jumlah, total_harga, id_user, status) VALUES ('${req.body.barang_id}', '${req.body.jumlah}', ${req.body.total}, '${req.session.user.id}', '0')`;
    console.log(sql);
    db.query(sql, (error, result) => {
      if (error) throw error;
      const sql2 = `UPDATE barang SET new_stock = ${req.body.new_stock} WHERE id_barang = ${req.body.barang_id}`;
      db.query(sql2, (error, result) => {
        if (error) throw error;
        res.redirect("back");
      });
    });
  }
};
const editJenis = (req, res) => {
  const sql = `UPDATE jenisbarang SET JenisBarang = '${req.body.Jenis}' WHERE Id_JenisBarang = ${req.body.id_Jenis} `;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const shop = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM barang WHERE Id_JenisBarang = ${id}`;
  db.query(sql, (error, result1) => {
    if (error) throw error;
    const barang = result1;
    res.render("shop", { barang });
  });
};

const editBarang = (req, res) => {
  const sql = `UPDATE barang SET Nama_barang = '${req.body.nama_Ebarang}', harga = '${req.body.harga_Ebarang}' WHERE id_barang = ${req.body.id_Ebarang}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};
const cancel = (req, res) => {
  const sql = `UPDATE barang SET new_stock = ${req.body.stockBaru} WHERE id_barang = ${req.body.barang_id2}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    const sql2 = `DELETE FROM transaksi WHERE id_transaksi = ${req.body.id_transaksi}`;
    db.query(sql2, (error, result) => {
      if (error) throw error;
      res.redirect("back");
    });
  });
};

module.exports = {
  getMarket,
  tambahJenis,
  hapusJenis,
  pilihBarang,
  tambahBarang,
  tambahTransaksi,
  editJenis,
  shop,
  editBarang,
  cancel,
};
