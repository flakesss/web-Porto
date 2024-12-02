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

// Fungsi untuk menampilkan gambar full saat gambar profil diklik
function openFullImage() {
    // Buat elemen overlay
    const overlay = document.createElement('div');
    overlay.id = 'image-overlay';

    // Buat elemen gambar
    const img = document.createElement('img');
    img.src = 'assets/1000090901 (1).jpg'; // Path gambar full Anda
    img.classList.add('full-image');

    // Tambahkan event listener untuk menutup overlay saat diklik
    overlay.addEventListener('click', function() {
        document.body.removeChild(this);
    });

    // Tambahkan gambar ke overlay
    overlay.appendChild(img);

    // Tambahkan overlay ke body
    document.body.appendChild(overlay);
}
