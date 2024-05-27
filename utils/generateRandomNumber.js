function generateRandomNumber() {
    // Tạo một số ngẫu nhiên từ 100000 đến 999999
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return randomNumber.toString(); // Chuyển số thành chuỗi
}

module.exports = generateRandomNumber;