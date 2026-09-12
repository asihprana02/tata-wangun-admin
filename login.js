// ==============================
// ELEMENT
// ==============================

const inputPassword =
    document.getElementById("password");

const tombolLogin =
    document.getElementById("tombol-login");


// ==============================
// LOGIN
// ==============================

tombolLogin.addEventListener("click", function () {

    const password =
        inputPassword.value;

    if (password === "admin123") {

        // Simpan status login
        sessionStorage.setItem(
            "loginTataWangun",
            "true"
        );

        // Masuk ke halaman utama
        window.location.href = "index.html";

    } else {

        alert("Password salah!");

        inputPassword.value = "";

        inputPassword.focus();

    }

});
