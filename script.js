// Ambil elemen-elemen yang diperlukan dari DOM
const nasiboxItems = document.querySelectorAll('.menu-section-nasi .menu-item input[type="checkbox"]');
const snackboxItems = document.querySelectorAll('.menu-section-snack .menu-item input[type="checkbox"]');
const nasiboxTotalPrice = document.getElementById('nasibox-price');
const snackboxTotalPrice = document.getElementById('snackbox-price');
const totalPrice = document.getElementById('total');
const captureBtn = document.getElementById('capture-btn');
const quantityInputNasi = document.getElementById('quantity-nasi');
const quantityInputSnack = document.getElementById('quantity-snack');

// Fungsi untuk menghitung total harga nasi box berdasarkan jumlah kotak yang dipesan
function calculateNasiboxTotal() {
    const quantity = parseInt(quantityInputNasi.value);
    const totalNasiboxPrice = calculateTotalPriceForItems(nasiboxItems) * quantity;
    nasiboxTotalPrice.textContent = totalNasiboxPrice;
    calculateTotalPrice();
}

// Fungsi untuk menghitung total harga snack box berdasarkan jumlah kotak yang dipesan
function calculateSnackboxTotal() {
    const quantity = parseInt(quantityInputSnack.value);
    const totalSnackboxPrice = calculateTotalPriceForItems(snackboxItems) * quantity;
    snackboxTotalPrice.textContent = totalSnackboxPrice;
    calculateTotalPrice();
}

// Fungsi untuk menghitung total harga berdasarkan item yang dipilih
function calculateTotalPriceForItems(items) {
    let total = 0;
    items.forEach(item => {
        if (item.checked) { // Periksa apakah checkbox dicentang
            total += parseInt(item.nextElementSibling.nextElementSibling.textContent);
        }
    });
    return total;
}

// Fungsi untuk menghitung total harga keseluruhan
function calculateTotalPrice() {
    const nasiboxPrice = parseInt(nasiboxTotalPrice.textContent);
    const snackboxPrice = parseInt(snackboxTotalPrice.textContent);
    const totalPriceValue = nasiboxPrice + snackboxPrice;
    totalPrice.textContent = isNaN(totalPriceValue) ? 0 : totalPriceValue;
}

// Tambahkan event listener pada input jumlah kotak
quantityInputNasi.addEventListener('input', function () {
    calculateNasiboxTotal();
});
quantityInputSnack.addEventListener('input', function () {
    calculateSnackboxTotal();
});

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
    captureBtn.addEventListener('click', function () {
        const checkedNasiBoxItems = Array.from(nasiboxItems).filter(item => item.checked);
        const checkedSnackBoxItems = Array.from(snackboxItems).filter(item => item.checked);

        const nasiboxTotalPriceValue = calculateTotalPriceForItems(checkedNasiBoxItems);
        const snackboxTotalPriceValue = calculateTotalPriceForItems(checkedSnackBoxItems);
        const totalPriceValue = nasiboxTotalPriceValue + snackboxTotalPriceValue;

        captureBtn.classList.add('hidden');
        html2canvas(document.body).then(function (canvas) {
            captureBtn.classList.remove('hidden');
            const imgURL = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imgURL;
            downloadLink.download = 'screenshot.png';
            downloadLink.click();
        });
    });
});
