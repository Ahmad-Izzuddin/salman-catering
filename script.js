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

// Fungsi untuk menanggapi saat tombol "Screenshot" ditekan
// document.addEventListener('DOMContentLoaded', function () {
//     captureBtn.addEventListener('click', function () {
//         const checkedNasiBoxItems = Array.from(nasiboxItems).filter(item => item.checked);
//         const checkedSnackBoxItems = Array.from(snackboxItems).filter(item => item.checked);

//         const nasiboxTotalPriceValue = calculateTotalPriceForItems(checkedNasiBoxItems);
//         const snackboxTotalPriceValue = calculateTotalPriceForItems(checkedSnackBoxItems);
//         const totalPriceValue = nasiboxTotalPriceValue + snackboxTotalPriceValue;

//         captureBtn.classList.add('hidden');
//         html2canvas(document.body).then(function (canvas) {
//             captureBtn.classList.remove('hidden');
//             const imgURL = canvas.toDataURL('image/png');
//             const downloadLink = document.createElement('a');
//             downloadLink.href = imgURL;
//             downloadLink.download = 'screenshot.png';
//             downloadLink.click();
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    captureBtn.addEventListener('click', function () {
        // Buat div baru untuk menyimpan elemen yang dicentang dan elemen lainnya

        

        const clonedContent = document.createElement('div');

        // Salin elemen header ("Luanna Catering")
        const headerClone = document.querySelector('img').cloneNode(true);
        clonedContent.appendChild(headerClone);


        const namaPemesanInput = document.getElementById('nama-pemesan');
        const namaPemesanValue = namaPemesanInput.value;
        const namaPemesanText = document.createElement('p');
        namaPemesanText.textContent = `${namaPemesanValue}`;
        namaPemesanText.style.marginTop = '0 px'; // Tambahkan margin atas
        clonedContent.appendChild(namaPemesanText);

        // Salin elemen Nasi Box
        const nasiBoxClone = document.querySelector('.menu-section-nasi h2').cloneNode(true);
        clonedContent.appendChild(nasiBoxClone);

        //total nasi
        const jumlahBoxNasi = document.getElementById('quantity-nasi');
        const jumlahBoxNasiValue = jumlahBoxNasi.value;
        const jumlahBoxNasiText = document.createElement('p');
        jumlahBoxNasiText.textContent = `Jumlah box nasi : ${jumlahBoxNasiValue}`;
        clonedContent.appendChild(jumlahBoxNasiText);

        // Salin elemen Snack Box
        const snackBoxClone = document.querySelector('.menu-section-snack h2').cloneNode(true);
        clonedContent.appendChild(snackBoxClone);

        //total snack
        const jumlahBoxSnack = document.getElementById('quantity-snack');
        const jumlahBoxSnackValue = jumlahBoxSnack.value;
        const jumlahBoxSnackText = document.createElement('p');
        jumlahBoxSnackText.textContent = `Jumlah box snack : ${jumlahBoxSnackValue}`;
        clonedContent.appendChild(jumlahBoxSnackText);

        // Salin elemen Total Harga
        const totalHargaClone = document.getElementById('total-price').cloneNode(true);
        clonedContent.appendChild(totalHargaClone);

        const emptyLine = document.createElement('br');
        clonedContent.appendChild(emptyLine);

        // Salin elemen yang dicentang dari Nasi Box
        const checkedNasiBoxItems = Array.from(nasiboxItems).filter(item => item.checked);
        checkedNasiBoxItems.forEach(item => {
            const clone = item.parentElement.cloneNode(true);
            nasiBoxClone.appendChild(clone);
        });

        // Salin elemen yang dicentang dari Snack Box
        const checkedSnackBoxItems = Array.from(snackboxItems).filter(item => item.checked);
        checkedSnackBoxItems.forEach(item => {
            const clone = item.parentElement.cloneNode(true);
            snackBoxClone.appendChild(clone);
        });

        // Sembunyikan div untuk menghindari tampilan ganda
        clonedContent.style.position = 'absolute';
        clonedContent.style.left = '-9999px';
        document.body.appendChild(clonedContent);


        totalHargaClone.style.fontSize = '18px'; // Sesuaikan ukuran font sesuai kebutuhan Anda
        totalHargaClone.style.fontWeight = 'bold';
        totalHargaClone.style.textAlign = 'center';

        headerClone.style.margin = '0 auto';

        // Tangkap layar dari salinan konten
        html2canvas(clonedContent).then(function (canvas) {
            // Hapus div yang digunakan untuk salinan konten
            document.body.removeChild(clonedContent);

            const imgURL = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imgURL;
            downloadLink.download = 'salman_catering.jpg';
            downloadLink.click();
        });
    });
});
