const tombolMenu = document.getElementById("tombol-menu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");


// Membuka menu
function bukaMenu() {
  sidebar.classList.add("buka");
  overlay.classList.add("tampil");
}


// Menutup menu
function tutupMenu() {
  sidebar.classList.remove("buka");
  overlay.classList.remove("tampil");
}


// Ketika tombol ☰ diklik
tombolMenu.addEventListener("click", function () {

  if (sidebar.classList.contains("buka")) {
    tutupMenu();
  } else {
    bukaMenu();
  }

});


// Jika area gelap diklik, menu ditutup
overlay.addEventListener("click", function () {
  tutupMenu();
});


// Jika salah satu menu diklik
const semuaMenu = document.querySelectorAll(".menu-sidebar a");

semuaMenu.forEach(function (menu) {

  menu.addEventListener("click", function () {
    tutupMenu();
  });

});
