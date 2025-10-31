// Dữ liệu mẫu
const PRODUCTS = [
  { id: 1, name: "Nhiệt Aí", cost: 150000, imageUrl: "/image/Image/hoa1.jpg" },
  { id: 2, name: "Peach", cost: 200000, imageUrl: "/image/Image/hoa2.jpg" },
  { id: 3, name: "Lemon", cost: 120000, imageUrl: "/image/Image/hoa3.jpg" },
  { id: 4, name: "Blueberry", cost: 250000, imageUrl: "/image/Image/hoa4.jpg" },
  {
    id: 5,
    name: "Vườn Xuân Ca",
    cost: 180000,
    imageUrl: "/image/Iamge/hoa5.jpg",
  },
  {
    id: 6,
    name: "Shimmer Grace",
    cost: 300000,
    imageUrl: "/image/Iamge/kehoa1.jpg",
  },
  { id: 7, name: "Bluesky", cost: 190000, imageUrl: "/image/Image/kehoa2.jpg" },
  {
    id: 8,
    name: "Sen Xanh",
    cost: 210000,
    imageUrl: "/image/Image/kehoa3.jpg",
  },
  {
    id: 9,
    name: "Hồng Phát",
    cost: 210000,
    imageUrl: "/image/Image/langhoa1.jpg",
  },
  {
    id: 10,
    name: "Sắc Màu",
    cost: 210000,
    imageUrl: "/image/Image/langhoa2.jpg",
  },
  {
    id: 11,
    name: "Tương Lai",
    cost: 210000,
    imageUrl: "/image/Image/langhoa3.jpg",
  },
];

let importData = [
  // Dữ liệu mẫu sẽ được tạo trong hàm createInitialData
];

let currentPage = 1;
const rowsPerPage = 5;

// Hàm tiện ích: Định dạng tiền tệ VND
const formatVND = (amount) => {
  return amount.toLocaleString("vi-VN");
};

// Hàm tiện ích: Hiển thị Toast
function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, 3000);
}

// ----------------------------------------------------
// I. LOGIC CHUYỂN VIEW
// ----------------------------------------------------

/**
 * Chuyển đổi giữa các màn hình (list-view, detail-view, add-view).
 * @param {string} viewId ID của màn hình muốn hiển thị.
 * @param {number|null} dataId ID của phiếu nhập để hiển thị chi tiết (nếu là detail-view).
 */
window.showView = function (viewId, dataId = null) {
  document.querySelectorAll(".content-view").forEach((view) => {
    view.classList.remove("active");
  });
  document.getElementById(viewId).classList.add("active");

  if (viewId === "list-view") {
    // Tải lại dữ liệu danh sách khi quay về
    renderImportList(currentPage);
  } else if (viewId === "detail-view" && dataId !== null) {
    renderImportDetail(dataId);
  } else if (viewId === "add-view") {
    initializeAddImportView();
  }
};

// ----------------------------------------------------
// II. LOGIC DANH SÁCH & PHÂN TRANG (Màn hình list-view)
// ----------------------------------------------------

// Hàm render danh sách phiếu nhập cho trang hiện tại
function renderImportList(page = 1) {
  const tbody = document.getElementById("import-list-body");
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedItems = importData.slice(startIndex, endIndex);

  tbody.innerHTML = "";

  if (paginatedItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #888;">Không tìm thấy phiếu nhập nào.</td></tr>`;
    return;
  }

  paginatedItems.forEach((item, index) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>#${item.maPhieu}</td>
            <td>${item.ngayNhap}</td>
            <td>${item.soLuongSP}</td>
            <td>${formatVND(item.tongGiaTri)} VND</td>
            <td>
                <button class="action-btn view-btn" onclick="showView('detail-view', ${
                  item.id
                })">
                    <i class="fas fa-eye"></i> Xem
                </button>
            </td>
        `;
  });
  renderPagination();
}

// Hàm render các nút phân trang
function renderPagination() {
  const paginationContainer = document.getElementById("pagination-controls");
  const pageCount = Math.ceil(importData.length / rowsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "active" : "";
    button.onclick = () => {
      currentPage = i;
      renderImportList(currentPage);
    };
    paginationContainer.appendChild(button);
  }
}

// ----------------------------------------------------
// III. LOGIC CHI TIẾT PHIẾU NHẬP (Màn hình detail-view)
// ----------------------------------------------------

// Hàm tìm thông tin sản phẩm (bao gồm cả URL hình ảnh)
function getProductInfo(id) {
  return PRODUCTS.find((p) => p.id === id);
}

// Hàm hiển thị chi tiết phiếu nhập
function renderImportDetail(importId) {
  const item = importData.find((d) => d.id === importId);
  if (!item) return showToast("Không tìm thấy phiếu nhập!");

  document.getElementById("detail-ma-phieu").textContent = `#${item.maPhieu}`;
  document.getElementById("detail-ngay-nhap").textContent = item.ngayNhap;
  document.getElementById("detail-so-luong").textContent = item.tongSoLuong;

  const tbody = document.getElementById("detail-products-body");
  tbody.innerHTML = "";

  let totalItems = 0;
  let totalQuantity = 0;
  let totalValue = 0;

  item.products.forEach((prod, index) => {
    const prodInfo = getProductInfo(prod.id); // Lấy thông tin sản phẩm để có URL ảnh
    // Sử dụng prodInfo.imageUrl là tên file
    const imageUrl = prodInfo
      ? prodInfo.imageUrl
      : "https://placehold.co/40x40/AAAAAA/ffffff?text=FL";

    const thanhTien = prod.giaNhap * prod.soLuong;
    totalQuantity += prod.soLuong;
    totalValue += thanhTien;
    totalItems++;

    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div class="product-info-cell">
                    <img src="${imageUrl}" alt="${
      prod.name
    }" class="product-thumb">
                    <div>
                        <div class="product-name">${prod.name}</div>
                        <div class="product-cost-label">Giá vốn: ${formatVND(
                          prod.giaNhap
                        )}</div>
                    </div>
                </div>
            </td>
            <td>${formatVND(prod.giaNhap)} VND</td>
            <td>${prod.soLuong}</td>
            <td>${formatVND(thanhTien)} VND</td>
        `;
  });

  // Cập nhật tóm tắt
  document.getElementById("summary-items").textContent = totalItems;
  document.getElementById("summary-quantity").textContent = totalQuantity;
  document.getElementById("summary-total").textContent = formatVND(totalValue);
}

// Hàm in phiếu nhập (Mô phỏng)
window.printImport = function () {
  showToast("Đang gửi lệnh in phiếu nhập...");
  // Sau 1 giây, mô phỏng in thành công
  setTimeout(() => {
    showToast("In phiếu nhập thành công!");
  }, 1000);
};

// ----------------------------------------------------
// IV. LOGIC THÊM PHIẾU NHẬP (Màn hình add-view)
// ----------------------------------------------------

/**
 * Khởi tạo giao diện thêm phiếu nhập mới
 */
function initializeAddImportView() {
  // Tạo Mã phiếu mới tự động (MP001, MP002, ...)
  const nextId = importData.length + 1;
  const nextCode = `MP${String(nextId).padStart(3, "0")}`;

  document.getElementById("add-code").value = `#${nextCode}`;
  document.getElementById("add-date").value = new Date()
    .toISOString()
    .split("T")[0]; // Ngày hiện tại

  const productListContainer = document.getElementById("add-product-list");
  productListContainer.innerHTML = ""; // Xóa các dòng cũ

  addProductRow(); // Thêm ít nhất 1 dòng sản phẩm
  updateAddSummary();
}

// Hàm thêm một dòng sản phẩm mới vào form nhập
window.addProductRow = function () {
  const container = document.getElementById("add-product-list");
  const newRow = document.createElement("div");
  newRow.className = "add-product-row";
  newRow.dataset.index = container.children.length;

  const options = PRODUCTS.map(
    (p) => `<option value="${p.id}" data-cost="${p.cost}">${p.name}</option>`
  ).join("");

  newRow.innerHTML = `
        <div class="product-name">
            <label>Chọn sản phẩm</label>
            <select class="product-select" onchange="updateProductRow(this)">
                <option value="">-- Chọn --</option>
                ${options}
            </select>
        </div>
        <div class="price-input">
            <label>Giá nhập</label>
            <input type="number" class="import-price" value="0" min="0" oninput="updateProductRow(this)">
        </div>
        <div class="quantity-input">
            <label>Số lượng</label>
            <input type="number" class="import-quantity" value="1" min="1" oninput="updateProductRow(this)">
        </div>
        <div class="subtotal-display">
            <label>Thành tiền</label>
            <span class="subtotal">0 VND</span>
        </div>
        <button class="action-btn remove-product-btn" onclick="removeProductRow(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
  container.appendChild(newRow);
  updateAddSummary(); // Cập nhật tổng kết sau khi thêm
};

// Hàm xóa một dòng sản phẩm
window.removeProductRow = function (button) {
  const row = button.closest(".add-product-row");
  if (document.querySelectorAll(".add-product-row").length > 1) {
    row.remove();
    updateAddSummary();
  } else {
    showToast("Phiếu nhập phải có ít nhất một sản phẩm.");
  }
};

// Hàm cập nhật Thành tiền khi giá nhập hoặc số lượng thay đổi
window.updateProductRow = function (element) {
  const row = element.closest(".add-product-row");
  const select = row.querySelector(".product-select");
  const priceInput = row.querySelector(".import-price");
  const quantityInput = row.querySelector(".import-quantity");
  const subtotalSpan = row.querySelector(".subtotal");

  // Tự động điền giá vốn (cost) khi chọn sản phẩm
  if (element.classList.contains("product-select")) {
    const selectedOption = select.options[select.selectedIndex];
    const cost = parseInt(selectedOption.getAttribute("data-cost") || 0);
    if (cost > 0 && parseInt(priceInput.value) === 0) {
      priceInput.value = cost;
    }
  }

  const price = parseInt(priceInput.value) || 0;
  const quantity = parseInt(quantityInput.value) || 0;
  const subtotal = price * quantity;

  subtotalSpan.textContent = formatVND(subtotal) + " VND";
  updateAddSummary();
};

// Hàm cập nhật tóm tắt phiếu nhập mới
function updateAddSummary() {
  const rows = document.querySelectorAll("#add-product-list .add-product-row");
  let totalItems = 0;
  let totalQuantity = 0;
  let totalValue = 0;

  rows.forEach((row) => {
    const select = row.querySelector(".product-select");
    const price = parseInt(row.querySelector(".import-price").value) || 0;
    const quantity = parseInt(row.querySelector(".import-quantity").value) || 0;

    if (select.value) {
      totalItems++;
      totalQuantity += quantity;
      totalValue += price * quantity;
    }
  });

  document.getElementById("add-summary-items").textContent = totalItems;
  document.getElementById("add-summary-quantity").textContent = totalQuantity;
  document.getElementById("add-summary-total").textContent =
    formatVND(totalValue);
}

// Hàm lưu phiếu nhập mới
window.saveNewImport = function () {
  const date = document.getElementById("add-date").value;
  const code = document.getElementById("add-code").value.replace("#", "");
  const rows = document.querySelectorAll("#add-product-list .add-product-row");

  if (!date) {
    return showToast("Vui lòng chọn Ngày nhập.");
  }

  const newProducts = [];
  let valid = true;
  let totalQuantity = 0;
  let totalValue = 0;

  rows.forEach((row) => {
    const productId = row.querySelector(".product-select").value;
    const productName =
      row.querySelector(".product-select").options[
        row.querySelector(".product-select").selectedIndex
      ].text;
    const importPrice = parseInt(row.querySelector(".import-price").value) || 0;
    const quantity = parseInt(row.querySelector(".import-quantity").value) || 0;

    if (productId && quantity > 0) {
      newProducts.push({
        id: parseInt(productId),
        name: productName,
        giaNhap: importPrice,
        soLuong: quantity,
      });
      totalQuantity += quantity;
      totalValue += importPrice * quantity;
    }
  });

  if (newProducts.length === 0) {
    return showToast("Vui lòng thêm ít nhất một sản phẩm hợp lệ.");
  }

  const newImport = {
    id: importData.length + 1,
    maPhieu: code,
    ngayNhap: new Date(date).toLocaleDateString("vi-VN"), // Định dạng lại cho hiển thị
    tongSoLuong: totalQuantity,
    soLuongSP: newProducts.length,
    tongGiaTri: totalValue,
    products: newProducts,
  };

  importData.push(newImport);
  showToast(`Lưu phiếu nhập ${code} thành công!`);

  // Quay về màn hình danh sách và refresh
  showView("list-view");
};

// ----------------------------------------------------
// V. KHỞI TẠO DỮ LIỆU BAN ĐẦU
// ----------------------------------------------------

// Hàm tạo dữ liệu mẫu ban đầu
function createInitialData() {
  const days = [28, 25, 20, 18, 15, 12, 10, 8, 5, 1, 29, 27, 26, 23, 22]; // 15 ngày mẫu
  const year = new Date().getFullYear();

  for (let i = 1; i <= 15; i++) {
    // Tạo 15 phiếu nhập (3 trang * 5 dòng)
    const maPhieu = `MP${String(i).padStart(3, "0")}`;
    const date = new Date(year, 9, days[i - 1] || i); // Tháng 10 (index 9)
    const ngayNhap = date.toLocaleDateString("vi-VN");

    // Tạo ngẫu nhiên 2-5 sản phẩm cho mỗi phiếu
    const numProducts = Math.floor(Math.random() * 4) + 2;
    let productsList = [];
    let totalQuantity = 0;
    let totalValue = 0;

    // Chọn ngẫu nhiên các sản phẩm không trùng lặp
    const shuffledProducts = [...PRODUCTS].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, numProducts);

    selectedProducts.forEach((prod) => {
      const quantity = Math.floor(Math.random() * 10) + 1; // Số lượng 1-10
      // Giảm giá vốn so với giá bán (cost) để tạo sự khác biệt
      const giaNhap = prod.cost - (Math.floor(Math.random() * 3) + 1) * 10000;
      const thanhTien = giaNhap * quantity;

      productsList.push({
        id: prod.id,
        name: prod.name,
        giaNhap: giaNhap,
        soLuong: quantity,
        thanhTien: thanhTien,
      });

      totalQuantity += quantity;
      totalValue += thanhTien;
    });

    importData.push({
      id: i,
      maPhieu: maPhieu,
      ngayNhap: ngayNhap,
      tongSoLuong: totalQuantity,
      soLuongSP: productsList.length,
      tongGiaTri: totalValue,
      products: productsList,
    });
  }
}

// Khởi tạo ứng dụng khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", () => {
  createInitialData();
  renderImportList(currentPage);

  // Gắn sự kiện Tìm kiếm (Mô phỏng)
  document
    .querySelector("#list-view .search-btn")
    .addEventListener("click", () => {
      showToast("Chức năng Tìm kiếm đang được phát triển.");
      // Giả lập tìm kiếm: Chỉ hiển thị 1 trang
      const filteredData = importData.slice(0, 5).map((item, index) => ({
        ...item,
        maPhieu: `TK${String(index + 1).padStart(3, "0")}`, // Mã giả lập TK
      }));
      renderImportList(1);
      showToast("Đã lọc kết quả.");
    });

  // Gắn sự kiện Đặt lại
  document
    .querySelector("#list-view .reset-btn")
    .addEventListener("click", () => {
      document.getElementById("date-from").value = "";
      document.getElementById("date-to").value = "";
      currentPage = 1;
      renderImportList(currentPage);
    });
});
