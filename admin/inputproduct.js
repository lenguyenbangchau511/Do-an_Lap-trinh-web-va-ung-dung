// ==================== DỮ LIỆU MẪU ====================
const productData = {
  "Nhiệt Ái": { id: "P001", tonkho: 250 },
  Peach: { id: "P002", tonkho: 120 },
  Blueberry: { id: "P003", tonkho: 75 },
  Lemon: { id: "P004", tonkho: 50 },
  Shimmergrace: { id: "P005", tonkho: 30 },
  Bluesky: { id: "P006", tonkho: 30 },
  "Sen Xanh": { id: "P007", tonkho: 30 },
  "Sắc Màu": { id: "P008", tonkho: 30 },
  "Hồng Phát": { id: "P009", tonkho: 30 },
  "Tương Lai": { id: "P010", tonkho: 30 },
};

const tenspSelect = document.getElementById("tensp");
const maspInput = document.getElementById("masp");
const tonkhoInput = document.getElementById("tonkho");
const messageBox = document.getElementById("messageBox");
const tableBody = document.getElementById("tableBody");

// ==================== HÀM THÔNG BÁO ====================
function showMessage(msg, type = "success") {
  messageBox.textContent = msg;
  messageBox.className =
    "message-box " + (type === "error" ? "message-error" : "message-success");
  messageBox.style.display = "block";
  setTimeout(() => (messageBox.style.display = "none"), 2500);
}

// ==================== CẬP NHẬT SẢN PHẨM ====================
tenspSelect.addEventListener("change", () => {
  const selected = tenspSelect.value;
  if (selected && productData[selected]) {
    maspInput.value = productData[selected].id;
    tonkhoInput.value = productData[selected].tonkho;
  } else {
    maspInput.value = "";
    tonkhoInput.value = 0;
  }
});

// ==================== LƯU PHIẾU NHẬP ====================
document.getElementById("saveBtn").addEventListener("click", () => {
  const tensp = tenspSelect.value;
  const masp = maspInput.value;
  const soluong = parseInt(document.getElementById("soluong").value);
  const tonkho = parseInt(tonkhoInput.value);
  const gianhap = parseInt(document.getElementById("gianhap").value);
  const tinhtrang = document.getElementById("tinhtrang").value;
  const nhacungcap = document.getElementById("nhacungcap").value.trim();

  if (!tensp || !masp || !soluong || !gianhap || !nhacungcap) {
    showMessage("⚠️ Bạn phải điền đầy đủ tất cả các mục!", "error");
    return;
  }

  const thoigian = new Date().toLocaleString("vi-VN");
  const tonkhoMoi = tonkho + soluong;

  const newRow = {
    masp,
    tensp,
    soluong,
    thoigian,
    gianhap,
    tinhtrang,
    tonkho: tonkhoMoi,
    nhacungcap,
  };

  // Cập nhật tồn kho hiện tại
  productData[tensp].tonkho = tonkhoMoi;
  tonkhoInput.value = tonkhoMoi;

  // ====== Lưu vào localStorage ======
  const storedData = JSON.parse(localStorage.getItem("phieuNhapList")) || [];
  storedData.push(newRow);
  localStorage.setItem("phieuNhapList", JSON.stringify(storedData));

  // Thêm vào bảng hiển thị
  addRowToTable(newRow);

  showMessage("✅ Đã thêm phiếu nhập thành công!");
  setTimeout(() => {
    document.getElementById("inputForm").classList.add("hidden");
  }, 2000);
});

// ==================== HIỂN THỊ DỮ LIỆU TỪ LOCALSTORAGE ====================
function loadTableFromStorage() {
  const storedData = JSON.parse(localStorage.getItem("phieuNhapList")) || [];
  tableBody.innerHTML = "";
  storedData.forEach((row) => addRowToTable(row));
}

// ==================== THÊM DÒNG VÀO BẢNG ====================
function addRowToTable(row) {
  const html = `
    <tr>
      <td>${row.masp}</td>
      <td>${row.tensp}</td>
      <td>${row.soluong}</td>
      <td>${row.thoigian}</td>
      <td>${row.gianhap.toLocaleString()} VNĐ</td>
      <td>${row.tinhtrang}</td>
      <td>${row.tonkho}</td>
      <td>${row.nhacungcap}</td>
    </tr>
  `;
  tableBody.insertAdjacentHTML("beforeend", html);
}

// ==================== NÚT THÊM & HỦY ====================
document.getElementById("addNewBtn").addEventListener("click", () => {
  document.getElementById("inputForm").classList.remove("hidden");
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  document.getElementById("inputForm").classList.add("hidden");
});

// ==================== KHI TẢI TRANG ====================
window.addEventListener("load", () => {
  loadTableFromStorage();
});