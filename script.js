// Ambil elemen-elemen yang diperlukan dari DOM
const nasiboxItems = document.querySelectorAll('.menu-section-nasi .menu-item input[type="checkbox"]');
const snackboxItems = document.querySelectorAll('.menu-section-snack .menu-item input[type="checkbox"]');
const nasiboxTotalPrice = document.getElementById('nasibox-price');
const snackboxTotalPrice = document.getElementById('snackbox-price');
const totalPrice = document.getElementById('total');
const captureBtn = document.getElementById('capture-btn');

// Fungsi untuk menghitung total harga nasi box
function calculateNasiboxTotal() {
    let total = 0;
    nasiboxItems.forEach(item => {
        if (item.checked) {
            total += 1000*(parseInt(item.nextElementSibling.nextElementSibling.textContent));
        }
    });
    nasiboxTotalPrice.textContent = total;
    calculateTotalPrice();
}

// Fungsi untuk menghitung total harga snack box
function calculateSnackboxTotal() {
    let total = 0;
    snackboxItems.forEach(item => {
        if (item.checked) {
            total += 1000*(parseInt(item.nextElementSibling.nextElementSibling.textContent));
        }
    });
    snackboxTotalPrice.textContent = total;
    calculateTotalPrice();
}

// Fungsi untuk menghitung total harga keseluruhan
function calculateTotalPrice() {
    const nasiboxPrice = parseInt(nasiboxTotalPrice.textContent);
    const snackboxPrice = parseInt(snackboxTotalPrice.textContent);
    totalPrice.textContent = nasiboxPrice + snackboxPrice;
}

// Tambahkan event listener untuk setiap checkbox nasi box
nasiboxItems.forEach(item => {
    item.addEventListener('change', calculateNasiboxTotal);
});

// Tambahkan event listener untuk setiap checkbox snack box
snackboxItems.forEach(item => {
    item.addEventListener('change', calculateSnackboxTotal);
});

// Fungsi untuk menanggapi saat tombol "Screenshot" ditekan
document.addEventListener('DOMContentLoaded', function () {
    const captureBtn = document.getElementById('capture-btn');

    captureBtn.addEventListener('click', function () {
        html2canvas(document.body).then(function(canvas) {
            const imgURL = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imgURL;
            downloadLink.download = 'screenshot.png';
            downloadLink.click();
        });
    });
});
