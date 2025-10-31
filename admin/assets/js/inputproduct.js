// Dữ liệu mẫu
const PRODUCTS = [
  { id: 1, name: "Nhiệt Ái", cost: 600000, imageUrl: "/images/hoa1.jpg" },
  { id: 2, name: "Peach", cost: 570000, imageUrl: "/images/hoa2.jpg" },
  { id: 3, name: "Lemon", cost: 520000, imageUrl: "/images/hoa3.jpg" },
  { id: 4, name: "Blueberry", cost: 180000, imageUrl: "/images/hoa4.jpg" },
  { id: 5, name: "Vườn Xuân Ca", cost: 560000, imageUrl: "/images/hoa5.jpg" },
  { id: 6, name: "Shimmer Grace", cost: 900000, imageUrl: "/images/kehoa1.jpg" },
  { id: 7, name: "Bluesky", cost: 1000000, imageUrl: "/images/kehoa2.jpg" },
  { id: 8, name: "Sen Xanh", cost: 1150000, imageUrl: "/images/kehoa3.jpg" },
  { id: 9, name: "Hồng Phát", cost: 2950000, imageUrl: "/images/langhoa1.webp" },
  { id: 10, name: "Sắc Màu", cost: 1450000, imageUrl: "/images/langhoa2.jpg" },
  { id: 11, name: "Tương Lai", cost: 1150000, imageUrl: "/images/langhoa3.png" },
];

let importData = [];
let currentPage = 1;
const rowsPerPage = 5;


/**
 * Định dạng tiền tệ VND
 */
const formatVND = (amount) => {
  return amount.toLocaleString("vi-VN");
};

/**
 * Hiển thị thông báo toast
 */
function showToast(message, type = 'success') {
  // Tạo toast container nếu chưa có
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }

  const toastId = 'toast-' + Date.now();
  const bgColor = type === 'error' ? 'bg-danger' : 'bg-success';
  
  const toastHTML = `
    <div id="${toastId}" class="toast ${bgColor} text-white" role="alert">
      <div class="toast-body d-flex justify-content-between align-items-center">
        <span>${message}</span>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHTML);
  
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();

  // Xóa toast khỏi DOM sau khi ẩn
  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove();
  });
}

/**
 * Lấy thông tin sản phẩm theo ID
 */
function getProductInfo(id) {
  return PRODUCTS.find((p) => p.id === id);
}

// ==================== VIEW MANAGEMENT ====================

/**
 * Chuyển đổi giữa các view
 */
window.showView = function (viewId, dataId = null) {
  // Ẩn tất cả view
  document.querySelectorAll(".content-view").forEach((view) => {
    view.classList.remove("active");
  });

  // Hiển thị view được chọn
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add("active");
  }

  // Xử lý logic riêng cho từng view
  switch (viewId) {
    case "list-view":
      renderImportList(currentPage);
      break;
    case "detail-view":
      if (dataId !== null) {
        renderImportDetail(dataId);
      }
      break;
    case "add-view":
      initializeAddImportView();
      break;
  }
};

// ==================== LIST VIEW FUNCTIONS ====================

/**
 * Render danh sách phiếu nhập

// ==================== DETAIL VIEW FUNCTIONS ====================

/**
 * Render chi tiết phiếu nhập
 */
function renderImportDetail(importId) {
  const item = importData.find((d) => d.id === importId);
  if (!item) {
    showToast("Không tìm thấy phiếu nhập!", "error");
    return;
  }

  // Cập nhật thông tin cơ bản
  document.getElementById("detail-ma-phieu").textContent = `#${item.maPhieu}`;
  document.getElementById("detail-ngay-nhap").textContent = item.ngayNhap;
  document.getElementById("detail-so-luong").textContent = item.tongSoLuong;

  // Render danh sách sản phẩm
  const tbody = document.getElementById("detail-products-body");
  tbody.innerHTML = "";

  let totalItems = 0;
  let totalQuantity = 0;
  let totalValue = 0;

  item.products.forEach((prod, index) => {
    const prodInfo = getProductInfo(prod.id);
    const imageUrl = prodInfo?.imageUrl || "https://placehold.co/60x60/e9ecef/6c757d?text=SP";
    const thanhTien = prod.giaNhap * prod.soLuong;
    
    totalItems++;
    totalQuantity += prod.soLuong;
    totalValue += thanhTien;

    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <div class="d-flex align-items-center" style="padding-left: 40px; ">
          <img src="${imageUrl}" alt="${prod.name}" class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover;">
        </div>
      </td>
      <td class="fw-semibold">${prod.name}</td>
      <td class="text-muted"> P00${prod.id}</td>
      <td class="text-end">${formatVND(prod.giaNhap)} VND</td>
      <td class="text-center">
        <span class="badge bg-primary">${prod.soLuong}</span>
      </td>
      <td class="text-end fw-semibold text-success">${formatVND(thanhTien)} VND</td>
    `;
  });

  // Cập nhật tổng kết
  document.getElementById("summary-items").textContent = totalItems;
  document.getElementById("summary-quantity").textContent = totalQuantity;
  document.getElementById("summary-total").textContent = formatVND(totalValue);
}



// ==================== ADD VIEW FUNCTIONS ====================

/**
 * Khởi tạo view thêm phiếu nhập
 */
function initializeAddImportView() {
  // Tạo mã phiếu mới
  const nextId = importData.length > 0 ? Math.max(...importData.map(d => d.id)) + 1 : 1;
  const nextCode = `MP${String(nextId).padStart(3, "0")}`;

  document.getElementById("add-code").value = `#${nextCode}`;
  document.getElementById("provided").value = `Flower Garden`;
  document.getElementById("add-date").valueAsDate = new Date();

  // Reset danh sách sản phẩm
  const productListContainer = document.getElementById("add-product-list");
  productListContainer.innerHTML = "";

  // Thêm dòng sản phẩm đầu tiên
  addProductRow();
  updateAddSummary();
}

/**
 * Thêm dòng sản phẩm mới
 */
window.addProductRow = function () {
  const container = document.getElementById("add-product-list");
  const rowIndex = container.children.length;
  
  const row = document.createElement("div");
  row.className = "product-row border rounded p-3 mb-3 bg-light";
  row.innerHTML = `
    <div class="row g-3 align-items-end">
      <div class="col-md-5">
        <label class="form-label fw-semibold">Sản phẩm</label>
        <select class="form-select product-select" onchange="updateProductRow(this)">
          <option value="">-- Chọn sản phẩm --</option>
          ${PRODUCTS.map(p => 
            `<option value="${p.id}" data-cost="${p.cost}">${p.name} </option>`
          ).join("")}
        </select>
      </div>
      <div class="col-md-2">
        <label class="form-label fw-semibold">Giá nhập</label>
        <input type="number" class="form-control import-price" min="0" placeholder="0" oninput="updateProductRow(this)">
      </div>
      <div class="col-md-2">
        <label class="form-label fw-semibold">Số lượng</label>
        <input type="number" class="form-control import-quantity" min="1" value="1" oninput="updateProductRow(this)">
      </div>
      <div class="col-md-2">
        <label class="form-label fw-semibold">Thành tiền</label>
        <div class="form-control-plaintext fw-bold text-success subtotal">0 VND</div>
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger remove-product" onclick="removeProductRow(this)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `;
  
  container.appendChild(row);
  updateAddSummary();
};

/**
 * Xóa dòng sản phẩm
 */
window.removeProductRow = function (button) {
  const rows = document.querySelectorAll("#add-product-list .product-row");
  if (rows.length <= 1) {
    showToast("Phiếu nhập phải có ít nhất một sản phẩm!", "error");
    return;
  }
  
  button.closest(".product-row").remove();
  updateAddSummary();
};

/**
 * Cập nhật thông tin dòng sản phẩm
 */
window.updateProductRow = function (element) {
  const row = element.closest(".product-row");
  const select = row.querySelector(".product-select");
  const priceInput = row.querySelector(".import-price");
  const quantityInput = row.querySelector(".import-quantity");
  const subtotalSpan = row.querySelector(".subtotal");

  // Tự động điền giá khi chọn sản phẩm
  if (element === select) {
    const selectedOption = select.options[select.selectedIndex];
    const cost = parseInt(selectedOption?.getAttribute("data-cost") || "0");
    if (cost > 0 && (!priceInput.value || priceInput.value === "0")) {
      priceInput.value = cost;
    }
  }

  const price = parseInt(priceInput.value) || 0;
  const quantity = parseInt(quantityInput.value) || 0;
  const subtotal = price * quantity;

  subtotalSpan.textContent = formatVND(subtotal) + " VND";
  updateAddSummary();
};

/**
 * Cập nhật tổng kết form thêm mới
 */
function updateAddSummary() {
  const rows = document.querySelectorAll("#add-product-list .product-row");
  let totalItems = 0;
  let totalQuantity = 0;
  let totalValue = 0;

  rows.forEach((row) => {
    const select = row.querySelector(".product-select");
    const price = parseInt(row.querySelector(".import-price").value) || 0;
    const quantity = parseInt(row.querySelector(".import-quantity").value) || 0;

    if (select.value && price > 0 && quantity > 0) {
      totalItems++;
      totalQuantity += quantity;
      totalValue += price * quantity;
    }
  });

  document.getElementById("add-summary-items").textContent = totalItems;
  document.getElementById("add-summary-quantity").textContent = totalQuantity;
  document.getElementById("add-summary-total").textContent = formatVND(totalValue);
}

/**
 * Lưu phiếu nhập mới
 */
window.saveNewImport = function () {
  const dateInput = document.getElementById("add-date");
  const code = document.getElementById("add-code").value.replace("#", "");
  const rows = document.querySelectorAll("#add-product-list .product-row");



  const newProducts = [];
  let hasError = false;

  rows.forEach((row, index) => {
    const select = row.querySelector(".product-select");
    const priceInput = row.querySelector(".import-price");
    const quantityInput = row.querySelector(".import-quantity");

    const productId = select.value;
    const productName = select.options[select.selectedIndex]?.text.split(' - ')[0] || '';
    const importPrice = parseInt(priceInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;

    if (!productId) {
      showToast(`Dòng ${index + 1}: Vui lòng chọn sản phẩm!`, "error");
      hasError = true;
      return;
    }

    if (importPrice <= 0) {
      showToast(`Dòng ${index + 1}: Giá nhập phải lớn hơn 0!`, "error");
      hasError = true;
      return;
    }

    if (quantity <= 0) {
      showToast(`Dòng ${index + 1}: Số lượng phải lớn hơn 0!`, "error");
      hasError = true;
      return;
    }

    newProducts.push({
      id: parseInt(productId),
      name: productName,
      giaNhap: importPrice,
      soLuong: quantity,
    });
  });

  if (hasError) return;

  if (newProducts.length === 0) {
    showToast("Vui lòng thêm ít nhất một sản phẩm!", "error");
    return;
  }

  // Tính tổng
  const totalQuantity = newProducts.reduce((sum, prod) => sum + prod.soLuong, 0);
  const totalValue = newProducts.reduce((sum, prod) => sum + (prod.giaNhap * prod.soLuong), 0);

  // Tạo phiếu nhập mới
  const newImport = {
    id: importData.length > 0 ? Math.max(...importData.map(d => d.id)) + 1 : 1,
    maPhieu: code,
    ngayNhap: new Date(dateInput.value).toLocaleDateString("vi-VN"),
    tongSoLuong: totalQuantity,
    soLuongSP: newProducts.length,
    tongGiaTri: totalValue,
    products: newProducts,
  };

  importData.push(newImport);
  showToast(`Đã thêm phiếu nhập #${code} thành công!`);

  // Quay về danh sách
  showView("list-view");
};

// ==================== SEARCH & FILTER FUNCTIONS ====================

/**
 * Tìm kiếm phiếu nhập
 */
function searchImports() {
  const dateFrom = document.getElementById("date-from").value;
  const dateTo = document.getElementById("date-to").value;

  let filteredData = [...importData];

  // Lọc theo khoảng ngày
  if (dateFrom) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.ngayNhap.split('/').reverse().join('-'));
      const fromDate = new Date(dateFrom);
      return itemDate >= fromDate;
    });
  }

  if (dateTo) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.ngayNhap.split('/').reverse().join('-'));
      const toDate = new Date(dateTo);
      return itemDate <= toDate;
    });
  }

  // Tạm thời sử dụng filteredData để render
  const tempData = importData;
  importData = filteredData;
  currentPage = 1;
  renderImportList(currentPage);
  importData = tempData;

  showToast(`Tìm thấy ${filteredData.length} phiếu nhập`);
}

// ==================== INITIAL DATA & EVENT LISTENERS ====================


/**
 * Khởi tạo ứng dụng
 */
document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo dữ liệu
  createInitialData();
  renderImportList(currentPage);

  // Gắn sự kiện tìm kiếm
  document.getElementById("searchImportBtn")?.addEventListener("click", searchImports);
  document.getElementById("resetImportBtn")?.addEventListener("click", resetFilters);

  // Cho phép nhấn Enter để tìm kiếm
  document.getElementById("date-from")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchImports();
  });
  document.getElementById("date-to")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchImports();
  });
});
// Thêm trạng thái vào dữ liệu mẫu
function createInitialData() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  for (let i = 1; i <= 15; i++) {
    const maPhieu = `MP${String(i).padStart(3, "0")}`;
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const date = new Date(currentYear, currentMonth, randomDay);
    const ngayNhap = date.toLocaleDateString("vi-VN");
    
    // Random trạng thái: 70% hoàn thành, 30% chờ xử lý
    const status = i < 4 ? 'completed' : 'pending';

    // Chọn ngẫu nhiên 2-4 sản phẩm
    const numProducts = 3;
    const shuffledProducts = [...PRODUCTS].sort(() => Math.random() - 0.5);
    const selectedProducts = shuffledProducts.slice(0, numProducts);

    const productsList = selectedProducts.map(prod => {
      const quantity = Math.floor(Math.random() * 10) + 5; // 5-15 sản phẩm
      const giaNhap = Math.round(Math.max(prod.cost - Math.floor(Math.random() * 30000), prod.cost * 0.8)/10000)*10000;
      let giaNhap2 = giaNhap.toLocaleString('en-US');
      return {
        id: prod.id,
        name: prod.name,
        giaNhap: giaNhap,
        soLuong: quantity,
      };
    });

    const totalQuantity = productsList.reduce((sum, prod) => sum + prod.soLuong, 0);
    const totalValue = productsList.reduce((sum, prod) => sum + (prod.giaNhap * prod.soLuong), 0);

    importData.push({
      id: i,
      maPhieu: maPhieu,
      ngayNhap: ngayNhap,
      tongSoLuong: totalQuantity,
      soLuongSP: productsList.length,
      tongGiaTri: totalValue,
      status: status,
      products: productsList,
    });
  }
}

// Hàm render danh sách phiếu nhập với trạng thái
function renderImportList(page = 1) {
  const tbody = document.getElementById("import-list-body");
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedItems = importData.slice(startIndex, endIndex);

  tbody.innerHTML = "";

  if (paginatedItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted py-4">
          <i class="fas fa-inbox me-2"></i>Không tìm thấy phiếu nhập nào
        </td>
      </tr>
    `;
    return;
  }

  paginatedItems.forEach((item, index) => {
    const row = tbody.insertRow();
    
    // Xác định class và text cho trạng thái
    const statusClass = item.status === 'completed' ? 'bg-success' : 'bg-warning';
    const statusText = item.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý';
    
    // Kiểm tra có thể sửa không (chỉ sửa được khi status là pending)
    const canEdit = item.status === 'pending';
  
    row.innerHTML = `
      <td>${startIndex + index + 1}</td>
      <td>
        <span class="badge bg-primary">#${item.maPhieu}</span>
      </td>
      <td>${item.ngayNhap}</td>
      <td>
        <span class="badge bg-secondary">${item.soLuongSP} sản phẩm</span>
      </td>
      <td>
        <strong class="text-success">${formatVND(item.tongGiaTri)} VND</strong>
      </td>
      <td>
        <span class="badge ${statusClass}">${statusText}</span>
      </td>
      <td>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-info" onclick="showView('detail-view', ${item.id})">
            <i class="fas fa-eye me-1"></i>
          </button>
          <button class="btn btn-warning" onclick="editImport(${item.id})" ${!canEdit ? 'disabled' : ''}>
            <i class="fas fa-edit me-1"></i>
          </button>
        </div>
      </td>
    `;
  });

  renderPagination();
}

// Hàm hiển thị chi tiết phiếu nhập với trạng thái
function renderImportDetail(importId) {
  const item = importData.find((d) => d.id === importId);
  if (!item) {
    showToast("Không tìm thấy phiếu nhập!", "error");
    return;
  }

  // Cập nhật thông tin cơ bản
  document.getElementById("detail-ma-phieu").textContent = `#${item.maPhieu}`;
  document.getElementById("detail-ngay-nhap").textContent = item.ngayNhap;
  document.getElementById("detail-so-luong").textContent = item.tongSoLuong;
  
  // Cập nhật trạng thái
  const statusText = item.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý';
  const statusClass = item.status === 'completed' ? 'text-success' : 'text-warning';
  document.getElementById("detail-status").innerHTML = `<span class="badge ${statusClass === 'text-success' ? 'bg-success' : 'bg-warning'}">${statusText}</span>`;


  // Render danh sách sản phẩm
  const tbody = document.getElementById("detail-products-body");
  tbody.innerHTML = "";

  let totalItems = 0;
  let totalQuantity = 0;
  let totalValue = 0;

  item.products.forEach((prod, index) => {
    const prodInfo = getProductInfo(prod.id);
    const imageUrl = prodInfo?.imageUrl || "https://placehold.co/60x60/e9ecef/6c757d?text=SP";
    const thanhTien = prod.giaNhap * prod.soLuong;
    
    totalItems++;
    totalQuantity += prod.soLuong;
    totalValue += thanhTien;

    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <img src="${imageUrl}" alt="${prod.name}" class="rounded" style="width: 60px; height: 60px; object-fit: cover;">
      </td>
      <td>${prod.name}</td>
      <td><span class="badge bg-secondary">SP${String(prod.id).padStart(3, '0')}</span></td>
      <td class="text-end">${formatVND(prod.giaNhap)} VND</td>
      <td class="text-center">
        <span class="badge bg-primary">${prod.soLuong}</span>
      </td>
      <td class="text-end fw-semibold text-success">${formatVND(thanhTien)} VND</td>
    `;
  });

  // Cập nhật tổng kết
  document.getElementById("summary-items").textContent = totalItems;
  document.getElementById("summary-quantity").textContent = totalQuantity;
  document.getElementById("summary-total").textContent = formatVND(totalValue);
}

// Hàm sửa phiếu nhập
window.editImport = function(importId) {
  const item = importData.find((d) => d.id === importId);
  if (!item) {
    showToast("Không tìm thấy phiếu nhập!", "error");
    return;
  }

  if (item.status === 'completed') {
    showToast("Không thể sửa phiếu nhập đã hoàn thành!", "error");
    return;
  }

  // Điền thông tin vào form sửa
  document.getElementById("edit-code").value = `#${item.maPhieu}`;
  document.getElementById("edit-date").value = new Date(item.ngayNhap.split('/').reverse().join('-')).toISOString().split('T')[0];
  
  // Render danh sách sản phẩm để sửa
  const container = document.getElementById("edit-product-list");
  container.innerHTML = "";
  
  item.products.forEach((prod, index) => {
    addEditProductRow(prod);
  });
  
  updateEditSummary();
  
  // Lưu ID đang sửa
  currentEditId = importId;
  showView('edit-view');
};

// Hàm thêm dòng sản phẩm trong form sửa
window.addEditProductRow = function(productData = null) {
  const container = document.getElementById("edit-product-list");
  
  const row = document.createElement("div");
  row.className = "product-row border rounded p-3 mb-3 bg-light";
  
  const productId = productData ? productData.id : '';
  const productName = productData ? productData.name : '';
  const price = productData ? productData.giaNhap : '';
  const quantity = productData ? productData.soLuong : 1;
  
  row.innerHTML = `
    <div class="row g-3 align-items-end">
      <div class="col-md-5">
        <label class="form-label fw-semibold">Sản phẩm</label>
        <select class="form-select product-select" onchange="updateEditProductRow(this)">
          <option value="">-- Chọn sản phẩm --</option>
          ${PRODUCTS.map(p => 
            `<option value="${p.id}" data-cost="${p.cost}" ${p.id === productId ? 'selected' : ''}>${p.name}</option>`
          ).join("")}
        </select>
      </div>
      <div class="col-md-2">
        <label class="form-label fw-semibold">Giá nhập</label>
        <input type="number" class="form-control import-price" min="0" value="${price}" oninput="updateEditProductRow(this)">
      </div>
      <div class="col-md-2">
        <label class="form-label fw-semibold">Số lượng</label>
        <input type="number" class="form-control import-quantity" min="1" value="${quantity}" oninput="updateEditProductRow(this)">
      </div>
      <div class="col-md-2">
        <label class="form-label fw-semibold">Thành tiền</label>
        <div class="form-control-plaintext fw-bold text-success subtotal">${productData ? formatVND(price * quantity) : '0'} VND</div>
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger remove-product" onclick="removeEditProductRow(this)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `;
  
  container.appendChild(row);
  updateEditSummary();
};

// Hàm cập nhật dòng sản phẩm trong form sửa
window.updateEditProductRow = function(element) {
  const row = element.closest('.product-row');
  const select = row.querySelector('.product-select');
  const priceInput = row.querySelector('.import-price');
  const quantityInput = row.querySelector('.import-quantity');
  const subtotalSpan = row.querySelector('.subtotal');

  // Tự động điền giá khi chọn sản phẩm
  if (element === select) {
    const selectedOption = select.options[select.selectedIndex];
    const cost = parseInt(selectedOption?.getAttribute("data-cost") || "0");
    if (cost > 0 && (!priceInput.value || priceInput.value === "0")) {
      priceInput.value = cost;
    }
  }

  const price = parseInt(priceInput.value) || 0;
  const quantity = parseInt(quantityInput.value) || 0;
  const subtotal = price * quantity;

  subtotalSpan.textContent = formatVND(subtotal) + " VND";
  updateEditSummary();
};

// Hàm xóa dòng sản phẩm trong form sửa
window.removeEditProductRow = function(button) {
  const rows = document.querySelectorAll("#edit-product-list .product-row");
  if (rows.length <= 1) {
    showToast("Phiếu nhập phải có ít nhất một sản phẩm!", "error");
    return;
  }
  
  button.closest(".product-row").remove();
  updateEditSummary();
};

// Hàm cập nhật tổng kết form sửa
function updateEditSummary() {
  const rows = document.querySelectorAll("#edit-product-list .product-row");
  let totalItems = 0;
  let totalQuantity = 0;
  let totalValue = 0;

  rows.forEach((row) => {
    const select = row.querySelector('.product-select');
    const price = parseInt(row.querySelector('.import-price').value) || 0;
    const quantity = parseInt(row.querySelector('.import-quantity').value) || 0;

    if (select.value && price > 0 && quantity > 0) {
      totalItems++;
      totalQuantity += quantity;
      totalValue += price * quantity;
    }
  });

  document.getElementById("edit-summary-items").textContent = totalItems;
  document.getElementById("edit-summary-quantity").textContent = totalQuantity;
  document.getElementById("edit-summary-total").textContent = formatVND(totalValue);
}

// Hàm cập nhật phiếu nhập
window.updateImport = function() {
  const dateInput = document.getElementById("edit-date");
  const rows = document.querySelectorAll("#edit-product-list .product-row");

  // Validation
  if (!dateInput.value) {
    showToast("Vui lòng chọn ngày nhập!", "error");
    dateInput.focus();
    return;
  }

  const updatedProducts = [];
  let hasError = false;

  rows.forEach((row, index) => {
    const select = row.querySelector('.product-select');
    const priceInput = row.querySelector('.import-price');
    const quantityInput = row.querySelector('.import-quantity');

    const productId = select.value;
    const productName = select.options[select.selectedIndex]?.text || '';
    const importPrice = parseInt(priceInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;

    if (!productId) {
      showToast(`Dòng ${index + 1}: Vui lòng chọn sản phẩm!`, "error");
      hasError = true;
      return;
    }

    if (importPrice <= 0) {
      showToast(`Dòng ${index + 1}: Giá nhập phải lớn hơn 0!`, "error");
      hasError = true;
      return;
    }

    if (quantity <= 0) {
      showToast(`Dòng ${index + 1}: Số lượng phải lớn hơn 0!`, "error");
      hasError = true;
      return;
    }

    updatedProducts.push({
      id: parseInt(productId),
      name: productName,
      giaNhap: importPrice,
      soLuong: quantity,
    });
  });

  if (hasError) return;

  if (updatedProducts.length === 0) {
    showToast("Vui lòng thêm ít nhất một sản phẩm!", "error");
    return;
  }

  // Tính tổng
  const totalQuantity = updatedProducts.reduce((sum, prod) => sum + prod.soLuong, 0);
  const totalValue = updatedProducts.reduce((sum, prod) => sum + (prod.giaNhap * prod.soLuong), 0);

  // Cập nhật dữ liệu
  const importIndex = importData.findIndex(item => item.id === currentEditId);
  if (importIndex !== -1) {
    importData[importIndex].ngayNhap = new Date(dateInput.value).toLocaleDateString("vi-VN");
    importData[importIndex].tongSoLuong = totalQuantity;
    importData[importIndex].soLuongSP = updatedProducts.length;
    importData[importIndex].tongGiaTri = totalValue;
    importData[importIndex].products = updatedProducts;
    
    showToast(`Cập nhật phiếu nhập thành công!`);
    showView('list-view');
  }
};


// Hàm tìm kiếm với filter trạng thái
function searchImports() {
  const dateFrom = document.getElementById("date-from").value;
  const dateTo = document.getElementById("date-to").value;
  const statusFilter = document.getElementById("status-filter").value;

  let filteredData = [...importData];

  // Lọc theo khoảng ngày
  if (dateFrom) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.ngayNhap.split('/').reverse().join('-'));
      const fromDate = new Date(dateFrom);
      return itemDate >= fromDate;
    });
  }

  if (dateTo) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.ngayNhap.split('/').reverse().join('-'));
      const toDate = new Date(dateTo);
      return itemDate <= toDate;
    });
  }

  // Lọc theo trạng thái
  if (statusFilter) {
    filteredData = filteredData.filter(item => item.status === statusFilter);
  }

  // Tạm thời sử dụng filteredData để render
  const tempData = importData;
  importData = filteredData;
  currentPage = 1;
  renderImportList(currentPage);
  importData = tempData;

  showToast(`Tìm thấy ${filteredData.length} phiếu nhập`);
}

// Hàm đặt lại bộ lọc
function resetFilters() {
  document.getElementById("date-from").value = "";
  document.getElementById("date-to").value = "";
  document.getElementById("status-filter").value = "";
  currentPage = 1;
  renderImportList(currentPage);
  showToast("Đã đặt lại bộ lọc");
}

// Khai báo biến toàn cục
let currentEditId = null;

// Khởi tạo ứng dụng
document.addEventListener("DOMContentLoaded", () => {
  createInitialData();
  renderImportList(currentPage);

  // Gắn sự kiện tìm kiếm
  document.getElementById("searchImportBtn")?.addEventListener("click", searchImports);
  document.getElementById("resetImportBtn")?.addEventListener("click", resetFilters);

  // Cho phép nhấn Enter để tìm kiếm
  document.getElementById("date-from")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchImports();
  });
  document.getElementById("date-to")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchImports();
  });
});
