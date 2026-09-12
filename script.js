// ==============================
// PENGATURAN PERHITUNGAN
// ==============================

const marginPersen = 0.13;


// ==============================
// FORMAT RUPIAH
// ==============================

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}


// ==============================
// HITUNG MATERIAL
// ==============================

function hitungMaterial() {
  const barisMaterial = document.querySelectorAll(".material tbody tr");
  let subtotalMaterial = 0;

  barisMaterial.forEach(function (baris) {
    const inputVolume = baris.cells[2].querySelector("input");
    const inputHargaSatuan = baris.cells[4].querySelector("input");

    const volume = Number(inputVolume.value) || 0;
    const hargaSatuan = Number(inputHargaSatuan.value) || 0;

    const margin = hargaSatuan * marginPersen;
    const hargaProyek = hargaSatuan + margin;
    const jumlahTotal = volume * hargaProyek;

    baris.cells[5].textContent = formatRupiah(margin);
    baris.cells[6].textContent = formatRupiah(hargaProyek);
    baris.cells[7].textContent = formatRupiah(jumlahTotal);

    subtotalMaterial += jumlahTotal;
  });

  document.querySelector(".material p strong").textContent =
    "Subtotal Material: " + formatRupiah(subtotalMaterial);

  return subtotalMaterial;
}


// ==============================
// HITUNG JASA
// ==============================

function hitungJasa() {
  const barisJasa = document.querySelectorAll(".jasa tbody tr");
  let subtotalJasa = 0;

  barisJasa.forEach(function (baris) {
    const inputVolume = baris.cells[2].querySelector("input");
    const inputHargaSatuan = baris.cells[4].querySelector("input");

    const volume = Number(inputVolume.value) || 0;
    const hargaSatuan = Number(inputHargaSatuan.value) || 0;
    const jumlahTotal = volume * hargaSatuan;

    baris.cells[5].textContent = formatRupiah(jumlahTotal);

    subtotalJasa += jumlahTotal;
  });

  document.querySelector(".jasa p strong").textContent =
    "Subtotal Jasa dan Operasional: " + formatRupiah(subtotalJasa);

  return subtotalJasa;
}


// ==============================
// HITUNG SEMUA REKAP
// ==============================
// ==============================
// TAMPILKAN DATA PROYEK
// ==============================

function tampilkanDataProyek() {
  const namaKlien = document.querySelector("#nama-klien").value;
  const namaProyek = document.querySelector("#nama-proyek").value;

  document.querySelector("#tampil-klien").textContent =
    namaKlien || "-";

  document.querySelector("#tampil-proyek").textContent =
    namaProyek || "-";

  document.querySelector("#nama-ttd-klien").textContent =
    namaKlien
      ? `(${namaKlien})`
      : "(................................)";
}

function hitungSemua() {
    tampilkanDataProyek();

  const subtotalMaterial = hitungMaterial();
  const subtotalJasa = hitungJasa();
  const totalPekerjaan = subtotalMaterial + subtotalJasa;

  const rekap = document.querySelectorAll(".rekap p strong");

  rekap[0].textContent = formatRupiah(subtotalMaterial);
  rekap[1].textContent = formatRupiah(subtotalJasa);
  rekap[2].textContent = formatRupiah(totalPekerjaan);
}


// ==============================
// TAMBAH BARIS MATERIAL
// ==============================

document.querySelector("#tambah-material").addEventListener("click", function () {
  const tbodyMaterial = document.querySelector(".material tbody");
  const nomorBaru = tbodyMaterial.rows.length + 1;

  tbodyMaterial.insertAdjacentHTML("beforeend", `
  <tr>
    <td>${nomorBaru}</td>
    <td><input type="text" placeholder="Nama material"></td>
    <td><input type="number" placeholder="0"></td>
    <td><input type="text" placeholder="pcs / m / unit"></td>
    <td><input type="number" placeholder="0"></td>
    <td>Rp0</td>
    <td>Rp0</td>
    <td>Rp0</td>
    <td>
      <button type="button" class="hapus-baris">
        Hapus
      </button>
    </td>
  </tr>
`);
  hitungSemua();
});


// ==============================
// TAMBAH BARIS JASA
// ==============================

document.querySelector("#tambah-jasa").addEventListener("click", function () {
  const tbodyJasa = document.querySelector(".jasa tbody");
  const nomorBaru = tbodyJasa.rows.length + 1;

  tbodyJasa.insertAdjacentHTML("beforeend", `
    <tr>
      <td>${nomorBaru}</td>
      <td><input type="text" placeholder="Nama pekerjaan"></td>
      <td><input type="number" placeholder="0"></td>
      <td><input type="text" placeholder="hari / orang / unit"></td>
      <td><input type="number" placeholder="0"></td>
      <td>Rp0</td>
      <td>
        <button type="button" class="hapus-baris">
          Hapus
        </button>
      </td>
    </tr>
  `);

  hitungSemua();
});


// ==============================
// HAPUS BARIS
// ==============================

document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("hapus-baris")) {
    return;
  }

  const baris = event.target.closest("tr");
  const tbody = baris.parentElement;

  baris.remove();

  Array.from(tbody.rows).forEach(function (baris, index) {
    baris.cells[0].textContent = index + 1;
  });

  hitungSemua();
});


// ==============================
// HITUNG SAAT INPUT DIISI
// ==============================

document.addEventListener("input", function () {
  hitungSemua();
});


// ==============================
// UNDUH PDF
// ==============================

document.querySelector("#unduh-pdf").addEventListener("click", function () {
  window.print();
});


// Jalankan perhitungan saat halaman pertama dibuka
hitungSemua();
