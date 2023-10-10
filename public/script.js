let saldo = 2000000;
const formatSaldo = (rupiah) => {
  return rupiah.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
};
document.getElementById("saldo").innerHTML = formatSaldo(saldo);
const bayar = (harga) => {
  const text = "Anda yakin akan membeli ini?";
  //essay 
  if (saldo < harga) {
    alert("saldo kurang");
  } else {
    if (confirm(text) == true) {
      saldo = saldo - harga;
    } else {
      alert("You canceled!");
    }
  }
  document.getElementById("saldo").innerHTML = formatSaldo(saldo);
};
const barang = (id, harga, stock) => {
  const inputidBarang = document.getElementById("barang_id");
  inputidBarang.value = id;
  const inputHarga = document.getElementById("harga_barang");
  inputHarga.value = harga;
  const inputStock = (document.getElementById("Stock").value = stock);
};

const cancel = (newStock, jumlah, idBarang, idTransaksi) => {
  console.log(newStock, idBarang, jumlah, idTransaksi);
  document.getElementById("barang_id2").value = idBarang;
  document.getElementById("id_transaksi").value = idTransaksi;
  document.getElementById("stockBaru").value =
    parseInt(newStock) + parseInt(jumlah);
};

const multiFungsi = () => {
  // const inputTotal = (document.getElementById("total").value = harga * jumlah);
  // inputTotal.value = jumlah * harga - stock
  const harga = document.getElementById("harga_barang").value;
  const stock = document.getElementById("Stock").value;
  const jumlahInput = document.getElementById("jumlah");
  let jumlah = parseInt(jumlahInput.value);
  console.log(harga, jumlah);

  if (jumlah > stock) {
    alert("stock tidak cukup");
    jumlahInput.value = stock;
    document.getElementById("total").value = harga * jumlahInput.value
    document.getElementById('new_stock').value = stock - jumlahInput.value
  } else {
    document.getElementById("total").value = harga * jumlahInput.value
    document.getElementById('new_stock').value = stock - jumlahInput.value
    // document.getElementById("submitStock").style.display = "block";
  }
};

const fungsi_harga = () => {
  const harga = document.getElementById("harga");
  const barang = document.getElementById("Namabarang");
  const stock = document.getElementById("stock1");
  if (barang.value.length >= 3) {
    if (harga.value % 500 == 0) {
      if (harga.value.length >= 3) {
        if (stock.value.length >= 1) {
          const Save = (document.getElementById("harga_submit").style.display =
            "block");
        } else {
        }
      } else {
      }
    } else {
      alert("masukan harga dengan benar");
    }
  } else {
    alert("masukan dengan benar");
    // const Save = document.getElementById('harga_submit').style.display = "none";
  }

  const input_barang = () => {
    const barang = document.getElementById(Namabarang);
    const harga = document.getElementById(harga);
    const stock = document.getElementById(stock);
  };
};

const edit = (id, Namabarang, harga, stock) => {
  console.log(id, Namabarang, harga, stock);
  document.getElementById('id_Ebarang').value = id;
  document.getElementById('nama_Ebarang').value = Namabarang;
  document.getElementById('harga_Ebarang').value = harga;
  document.getElementById('stock_Ebarang').value = stock;
  
}