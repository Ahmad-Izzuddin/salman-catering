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

function getTotalPriceNasi() {
    calculateNasiboxTotal();
    return totalNasiboxPrice;
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

document.addEventListener('DOMContentLoaded', function () {
    captureBtn.addEventListener('click', function () {
        // Dapatkan nilai nama pemesan
        const namaPemesanInput = document.getElementById('nama-pemesan');
        const namaPemesanValue = namaPemesanInput.value;

        // Dapatkan nilai jumlah box nasi dan snack
        const jumlahBoxNasi = document.getElementById('quantity-nasi').value;
        const jumlahBoxSnack = document.getElementById('quantity-snack').value;

        // Dapatkan elemen yang dicentang dari Nasi Box
        const checkedNasiBoxItems = Array.from(nasiboxItems).filter(item => item.checked).map(item => item.parentElement.textContent.trim().split('\n')[0].trim());

        // Dapatkan elemen yang dicentang dari Snack Box
        const checkedSnackBoxItems = Array.from(snackboxItems).filter(item => item.checked).map(item => item.parentElement.textContent.trim().split('\n')[0].trim());

        // Dapatkan nilai total harga
        const totalHargaValue = document.getElementById('total').textContent;

        // Tampilkan informasi pesanan ke konsol
        console.log('Informasi Pesanan:');
        console.log('Nama Pemesan:', namaPemesanValue);
        console.log('Jumlah Box Nasi:', jumlahBoxNasi);
        console.log('Nasi Box Items:');
        checkedNasiBoxItems.forEach(item => {
            console.log('-', item);
        });
        console.log('Jumlah Box Snack:', jumlahBoxSnack);
        console.log('Snack Box Items:');
        checkedSnackBoxItems.forEach(item => {
            console.log('-', item);
        });
        console.log('Total Harga:', totalHargaValue);

        // Bangun teks pesan untuk WhatsApp
        const whatsappMessage = `~ Salman Catering ~%0a`
            + `Nama Pemesan: ${namaPemesanValue}%0a`
            + `Jumlah Box Nasi: ${jumlahBoxNasi}%0a`
            + `List Nasi Box:%0a${checkedNasiBoxItems.map(item => `- ${item}`).join('%0a')}` // Menyusun item nasi box dengan format "- Item Nasi"
            + `%0aJumlah Box Snack: ${jumlahBoxSnack}%0a`
            + `List Snack Box:%0a${checkedSnackBoxItems.map(item => `- ${item}`).join('%0a')}`; // Menyusun item snack box dengan format "- Item Snack"
            + `Total Harga ${totalHargaValue}`

        // Dapatkan nomor WhatsApp
        var phoneNumber = "+6281229982755"

        // Bangun URL untuk mengirim pesan WhatsApp
        var whatsappURL = "https://wa.me/" + phoneNumber + "?text="
        +"~ Salman Catering ~" + "%0a"
        + "%0a" + "Nama Pemesan : " + namaPemesanValue + "%0a"
        + "%0a" + "Jumlah box nasi : " + jumlahBoxNasi + "%0a"
        +"List nasi : " + "%0a"
        +checkedNasiBoxItems.map(item => `- ${item}`).join('%0a')
        + "%0a" + "%0a" + "Jumlah box snack : " + jumlahBoxSnack + "%0a"
        +"List snack : " + "%0a"
        +checkedSnackBoxItems.map(item => `- ${item}`).join('%0a')
        + "%0a" + "%0a" + "*Total harga : " + totalHargaValue + "*";

        // Buka tautan WhatsApp dengan pesan yang disiapkan
        window.open(whatsappURL, '_blank');
        
    });
});

