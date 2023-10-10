const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "bxkrybmiiq44sxgbcoba-mysql.services.clever-cloud.com",
  port: 20639,
  user: "urpkfsmlne74qzel",
  password: "t3Gg9KcCvkhVsmT4ZG5",
  database: "bxkrybmiiq44sxgbcoba",
});

db.connect((err) => {
  if (err) {
    console.error("Gagal terhubung ke database:", err);
    return;
  }
  console.log("Terhubung ke database MySQL di Clever Cloud");

  // Gunakan koneksi untuk melakukan operasi database (query, insert, update, dll.)
  // Tutup koneksi setelah selesai melakukan operasi
});
module.exports = db;
