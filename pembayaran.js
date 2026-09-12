// ==============================
// DATA PEMBAYARAN
// ==============================

const kunciPembayaran = "dataPembayaranTataWangun";

let daftarPembayaran = JSON.parse(
  localStorage.getItem(kunciPembayaran)
) || [];

let indexPembayaranDiedit = null;


// ==============================
// DATA PELANGGAN
// ==============================

const daftarPelanggan = JSON.parse(
  localStorage.getItem("dataPelangganTataWangun")
) || [];


// ==============================
// ELEMENT
// ==============================

const pilihanPelanggan =
  document.getElementById("pelanggan-bayar");

const tombolSimpan =
  document.getElementById("simpan-pembayaran");

const tabelPembayaran =
  document.getElementById("tabel-pembayaran");

const pilihanRekap =
  document.getElementById("pilih-rekap-pelanggan");

const tabelRekap =
  document.getElementById("tabel-rekap-pembayaran");

const totalPembayaran =
  document.getElementById("total-pembayaran");


// ==============================
// ISI PILIHAN PELANGGAN
// ==============================

function isiPilihanPelanggan() {

  pilihanPelanggan.innerHTML =
    '<option value="">Pilih pelanggan</option>';

  daftarPelanggan.forEach(function (pelanggan) {

    const pilihan =
      document.createElement("option");

    pilihan.value = pelanggan.nama;
    pilihan.textContent = pelanggan.nama;

    pilihanPelanggan.appendChild(pilihan);

  });


  pilihanRekap.innerHTML =
    '<option value="">Semua pelanggan</option>';

  daftarPelanggan.forEach(function (pelanggan) {

    const pilihanRekapBaru =
      document.createElement("option");

    pilihanRekapBaru.value = pelanggan.nama;
    pilihanRekapBaru.textContent = pelanggan.nama;

    pilihanRekap.appendChild(pilihanRekapBaru);

  });

}


// ==============================
// TAMPILKAN RIWAYAT PEMBAYARAN
// ==============================

function tampilkanPembayaran() {

  tabelPembayaran.innerHTML = "";

  daftarPembayaran.forEach(function (pembayaran, index) {

    const baris =
      tabelPembayaran.insertRow();

    baris.insertCell(0).textContent = index + 1;
    baris.insertCell(1).textContent = pembayaran.tanggal;
    baris.insertCell(2).textContent = pembayaran.pelanggan;
    baris.insertCell(3).textContent = pembayaran.proyek;
    baris.insertCell(4).textContent = pembayaran.jenis;
    baris.insertCell(5).textContent = formatRupiah(pembayaran.nominal);
    baris.insertCell(6).textContent = pembayaran.catatan;

    const kolomAksi =
      baris.insertCell(7);

    // EDIT

    const tombolEdit =
      document.createElement("button");

    tombolEdit.textContent = "Edit";
    tombolEdit.classList.add("edit-baris");
    tombolEdit.dataset.index = index;

    kolomAksi.appendChild(tombolEdit);

    // HAPUS

    const tombolHapus =
      document.createElement("button");

    tombolHapus.textContent = "Hapus";
    tombolHapus.classList.add("hapus-baris");
    tombolHapus.dataset.index = index;

    kolomAksi.appendChild(tombolHapus);

  });

}


// ==============================
// FORMAT RUPIAH
// ==============================

function formatRupiah(angka) {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }
  ).format(Number(angka));

}


// ==============================
// SIMPAN PEMBAYARAN
// ==============================

tombolSimpan.addEventListener(
  "click",
  function () {

    const pelanggan =
      document.getElementById("pelanggan-bayar").value;

    const proyek =
      document.getElementById("nama-proyek-bayar").value.trim();

    const tanggal =
      document.getElementById("tanggal-bayar").value;

    const jenis =
      document.getElementById("jenis-bayar").value;

    const nominal =
      document.getElementById("nominal-bayar").value;

    const catatan =
      document.getElementById("catatan-bayar").value.trim();


    if (
      pelanggan === "" ||
      proyek === "" ||
      tanggal === "" ||
      nominal === ""
    ) {

      alert(
        "Nama pelanggan, proyek, tanggal, dan nominal wajib diisi."
      );

      return;

    }


    const dataPembayaran = {
      pelanggan: pelanggan,
      proyek: proyek,
      tanggal: tanggal,
      jenis: jenis,
      nominal: nominal,
      catatan: catatan
    };


    if (indexPembayaranDiedit === null) {
      daftarPembayaran.push(dataPembayaran);
    } else {
      daftarPembayaran[indexPembayaranDiedit] = dataPembayaran;
    }


    localStorage.setItem(
      kunciPembayaran,
      JSON.stringify(daftarPembayaran)
    );


    tampilkanPembayaran();
    resetFormPembayaran();
    tampilkanRekap();

  }
);


// ==============================
// EDIT DAN HAPUS
// ==============================

document.addEventListener(
  "click",
  function (event) {

    if (
      event.target.classList.contains("edit-baris")
    ) {

      const index = Number(event.target.dataset.index);
      const pembayaran = daftarPembayaran[index];

      document.getElementById("pelanggan-bayar").value = pembayaran.pelanggan;
      document.getElementById("nama-proyek-bayar").value = pembayaran.proyek;
      document.getElementById("tanggal-bayar").value = pembayaran.tanggal;
      document.getElementById("jenis-bayar").value = pembayaran.jenis;
      document.getElementById("nominal-bayar").value = pembayaran.nominal;
      document.getElementById("catatan-bayar").value = pembayaran.catatan;

      indexPembayaranDiedit = index;
      tombolSimpan.textContent = "Simpan Perubahan";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }


    if (
      event.target.classList.contains("hapus-baris")
    ) {

      const index = Number(event.target.dataset.index);
      const yakin = confirm("Yakin ingin menghapus pembayaran ini?");

      if (!yakin) {
        return;
      }

      daftarPembayaran.splice(index, 1);

      localStorage.setItem(
        kunciPembayaran,
        JSON.stringify(daftarPembayaran)
      );

      tampilkanPembayaran();
      tampilkanRekap();

    }

  }
);


// ==============================
// RESET FORM
// ==============================

function resetFormPembayaran() {

  document.getElementById("pelanggan-bayar").value = "";
  document.getElementById("nama-proyek-bayar").value = "";
  document.getElementById("tanggal-bayar").value = "";
  document.getElementById("jenis-bayar").value = "DP";
  document.getElementById("nominal-bayar").value = "";
  document.getElementById("catatan-bayar").value = "";

  indexPembayaranDiedit = null;
  tombolSimpan.textContent = "Simpan Pembayaran";

}


// ==============================
// REKAP PEMBAYARAN
// ==============================

function tampilkanRekap() {

  tabelRekap.innerHTML = "";
  totalPembayaran.textContent = "Rp0";

  const pelangganDipilih = pilihanRekap.value;

  if (pelangganDipilih === "") {
    return;
  }

  let total = 0;
  let nomor = 1;

  daftarPembayaran.forEach(function (pembayaran) {

    if (pembayaran.pelanggan === pelangganDipilih) {

      const baris = tabelRekap.insertRow();

      baris.insertCell(0).textContent = nomor;
      baris.insertCell(1).textContent = pembayaran.tanggal;
      baris.insertCell(2).textContent = pembayaran.proyek;
      baris.insertCell(3).textContent = pembayaran.jenis;
      baris.insertCell(4).textContent = formatRupiah(pembayaran.nominal);

      total += Number(pembayaran.nominal);
      nomor++;

    }

  });

  totalPembayaran.textContent = formatRupiah(total);

}


// ==============================
// KETIKA PELANGGAN REKAP DIPILIH
// ==============================

pilihanRekap.addEventListener(
  "change",
  function () {
    tampilkanRekap();
  }
);


// ==============================
// JALANKAN SAAT HALAMAN DIBUKA
// ==============================

isiPilihanPelanggan();
tampilkanPembayaran();
tampilkanRekap();
