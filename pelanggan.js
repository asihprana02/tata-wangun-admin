// ==============================
// DATA PELANGGAN
// ==============================

const kunciPenyimpanan = "dataPelangganTataWangun";

let daftarPelanggan = JSON.parse(
  localStorage.getItem(kunciPenyimpanan)
) || [];

let indexPelangganDiedit = null;


// ==============================
// SIMPAN DATA KE BROWSER
// ==============================

function simpanDataPelanggan() {
  localStorage.setItem(
    kunciPenyimpanan,
    JSON.stringify(daftarPelanggan)
  );
}


// ==============================
// RESET FORM
// ==============================

function resetFormPelanggan() {
  document.querySelector("#nama-pelanggan").value = "";
  document.querySelector("#nomor-wa").value = "";
  document.querySelector("#alamat-pelanggan").value = "";
  document.querySelector("#catatan-pelanggan").value = "";

  document.querySelector("#tambah-pelanggan").textContent =
    "Simpan Pelanggan";

  indexPelangganDiedit = null;
}


// ==============================
// TAMPILKAN TABEL PELANGGAN
// ==============================

function tampilkanPelanggan() {
  const tabelPelanggan = document.querySelector("#tabel-pelanggan");

  tabelPelanggan.innerHTML = "";

  daftarPelanggan.forEach(function (pelanggan, index) {
    const baris = document.createElement("tr");

    const kolomNomor = document.createElement("td");
    kolomNomor.textContent = index + 1;

    const kolomNama = document.createElement("td");
    kolomNama.textContent = pelanggan.nama;

    const kolomWhatsApp = document.createElement("td");
    kolomWhatsApp.textContent = pelanggan.whatsapp;

    const kolomAlamat = document.createElement("td");
    kolomAlamat.textContent = pelanggan.alamat;

    const kolomCatatan = document.createElement("td");
    kolomCatatan.textContent = pelanggan.catatan;

    const kolomAksi = document.createElement("td");

    const tombolEdit = document.createElement("button");
    tombolEdit.textContent = "Edit";
    tombolEdit.classList.add("edit-pelanggan");
    tombolEdit.dataset.index = index;

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.classList.add("hapus-pelanggan");
    tombolHapus.dataset.index = index;

    kolomAksi.appendChild(tombolEdit);
    kolomAksi.appendChild(tombolHapus);

    baris.appendChild(kolomNomor);
    baris.appendChild(kolomNama);
    baris.appendChild(kolomWhatsApp);
    baris.appendChild(kolomAlamat);
    baris.appendChild(kolomCatatan);
    baris.appendChild(kolomAksi);

    tabelPelanggan.appendChild(baris);
  });
}


// ==============================
// SIMPAN / UBAH PELANGGAN
// ==============================

document.querySelector("#tambah-pelanggan").addEventListener("click", function () {
  const nama = document.querySelector("#nama-pelanggan").value.trim();
  const whatsapp = document.querySelector("#nomor-wa").value.trim();
  const alamat = document.querySelector("#alamat-pelanggan").value.trim();
  const catatan = document.querySelector("#catatan-pelanggan").value.trim();

  if (nama === "") {
    alert("Nama pelanggan wajib diisi.");
    return;
  }

  const dataPelanggan = {
    nama: nama,
    whatsapp: whatsapp,
    alamat: alamat,
    catatan: catatan
  };

  if (indexPelangganDiedit === null) {
    daftarPelanggan.push(dataPelanggan);
  } else {
    daftarPelanggan[indexPelangganDiedit] = dataPelanggan;
  }

  simpanDataPelanggan();
  tampilkanPelanggan();
  resetFormPelanggan();
});


// ==============================
// EDIT / HAPUS PELANGGAN
// ==============================

document.addEventListener("click", function (event) {
  const index = event.target.dataset.index;

  if (event.target.classList.contains("edit-pelanggan")) {
    const pelanggan = daftarPelanggan[index];

    document.querySelector("#nama-pelanggan").value = pelanggan.nama;
    document.querySelector("#nomor-wa").value = pelanggan.whatsapp;
    document.querySelector("#alamat-pelanggan").value = pelanggan.alamat;
    document.querySelector("#catatan-pelanggan").value = pelanggan.catatan;

    document.querySelector("#tambah-pelanggan").textContent =
      "Simpan Perubahan";

    indexPelangganDiedit = Number(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  if (event.target.classList.contains("hapus-pelanggan")) {
    daftarPelanggan.splice(index, 1);

    simpanDataPelanggan();
    tampilkanPelanggan();
    resetFormPelanggan();
  }
});


// Jalankan saat halaman dibuka
tampilkanPelanggan();
