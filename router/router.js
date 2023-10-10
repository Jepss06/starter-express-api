const express = require("express");
const router = express.Router();
const {
  login,
  register,
  registrasi,
  auth,
  logout,
} = require("../controller/auth.js");
const multer = require("multer");
const {
  getMarket,
  tambahJenis,
  hapusJenis,
  pilihBarang,
  tambahBarang,
  tambahTransaksi,
  editJenis,
  shop,
  editBarang,
} = require("../controller/market.js");

const storage = multer.diskStorage({
  //mengatur tempat storage setelah foto diupload
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  //mengatur nama file
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get("/register", register);
router.post("/registrasi", registrasi);
router.get("/Market", getMarket);
router.get("/", getMarket);
router.get("/login", login);
router.post("/Auth", auth);
router.get("/logout", logout);
router.post("/tambahJenis", tambahJenis);
router.get("/pilih/:id", pilihBarang);
router.post("/tambahBarang", upload.single("photo"), tambahBarang);
router.post("/tambahTransaksi", tambahTransaksi);
router.post("/editJenis", editJenis);
router.get("/shop/:id", shop);
router.post("/editBarang", editBarang);
module.exports = router;
