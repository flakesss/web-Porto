// Informasi pribadi (opsional)
const nama = "Hatta Dwi Putranto";
let umur = 19; // Sesuaikan dengan umur Anda
console.log(`Nama saya ${nama} dan umur saya ${umur} tahun.`);

// Menu responsif
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
} else {
    console.error("Element dengan kelas '.hamburger' atau '.nav-menu' tidak ditemukan.");
}
