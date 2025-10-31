<<<<<<< HEAD
// Dữ liệu mẫu cho phiếu nhập
let importData = [
    {
        id: 1,
        code: "#MP001",
        date: "2024-11-15",
        productCount: 5,
        totalValue: 12500000,
        status: "completed",
        supplier: "Flower Garden",
        products: [
            { id: 1, name: "Nhiệt Ái", code: "SP001", price: 500000, quantity: 10, total: 5000000, image: "images/hoa1.jpg" },
            { id: 2, name: "Peach", code: "SP002", price: 450000, quantity: 8, total: 3600000, image: "images/hoa2.jpg" },
            { id: 3, name: "Blueberry", code: "SP003", price: 300000, quantity: 5, total: 1500000, image: "images/hoa3.jpg" },
            { id: 4, name: "Lemon", code: "SP004", price: 400000, quantity: 4, total: 1600000, image: "images/hoa4.jpg" },
            { id: 5, name: "Vườn Xuân Ca", code: "SP005", price: 350000, quantity: 2, total: 700000, image: "images/hoa5.jpg" }
        ]
    },
    {
        id: 2,
        code: "#MP002",
        date: "2024-11-10",
        productCount: 3,
        totalValue: 8500000,
        status: "completed",
        supplier: "Flower Garden",
        products: [
            { id: 6, name: "Shimmer Grace", code: "SP006", price: 800000, quantity: 5, total: 4000000, image: "images/langhoa1.webp" },
            { id: 7, name: "BlueSky", code: "SP007", price: 700000, quantity: 3, total: 2100000, image: "images/langhoa2.jpg" },
            { id: 8, name: "Sen Xanh", code: "SP008", price: 600000, quantity: 4, total: 2400000, image: "images/langhoa3.png" }
        ]
    },
    {
        id: 3,
        code: "#MP003",
        date: "2024-11-05",
        productCount: 3,
        totalValue: 7500000,
        status: "completed",
        supplier: "Flower Garden",
        products: [
            { id: 9, name: "Sắc Màu", code: "SP009", price: 1500000, quantity: 2, total: 3000000, image: "images/kehoa1.jpg" },
            { id: 10, name: "Hồng Phát", code: "SP010", price: 1200000, quantity: 2, total: 2400000, image: "images/kehoa2.jpg" },
            { id: 11, name: "Tương Lai", code: "SP011", price: 1050000, quantity: 2, total: 2100000, image: "images/kehoa3.jpg" }
        ]
    },
    {
        id: 4,
        code: "#MP004",
        date: "2024-11-20",
        productCount: 4,
        totalValue: 6800000,
        status: "pending",
        supplier: "Flower Garden",
        products: [
            { id: 1, name: "Nhiệt Ái", code: "SP001", price: 500000, quantity: 5, total: 2500000, image: "images/hoa1.jpg" },
            { id: 2, name: "Peach", code: "SP002", price: 450000, quantity: 4, total: 1800000, image: "images/hoa2.jpg" },
            { id: 4, name: "Lemon", code: "SP004", price: 400000, quantity: 3, total: 1200000, image: "images/hoa4.jpg" },
            { id: 5, name: "Vườn Xuân Ca", code: "SP005", price: 350000, quantity: 4, total: 1400000, image: "images/hoa5.jpg" }
        ]
    },
    {
        id: 5,
        code: "#MP005",
        date: "2024-11-25",
        productCount: 2,
        totalValue: 4200000,
        status: "pending",
        supplier: "Flower Garden",
        products: [
            { id: 6, name: "Shimmer Grace", code: "SP006", price: 800000, quantity: 3, total: 2400000, image: "images/langhoa1.webp" },
            { id: 8, name: "Sen Xanh", code: "SP008", price: 600000, quantity: 3, total: 1800000, image: "images/langhoa3.png" }
        ]
    }
=======
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
>>>>>>> dc564dda5d34a43ce7af8f8bdbe371769e4017e2
];

// Biến toàn cục
let currentView = 'list-view';
let currentEditingId = null;
let productCounter = 0;

// Hàm chuyển đổi giữa các view
function showView(viewName) {
    // Ẩn tất cả các view
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Hiển thị view được chọn
    document.getElementById(viewName).classList.add('active');
    currentView = viewName;
    
    // Reset form khi chuyển sang view thêm mới
    if (viewName === 'add-view') {
        resetAddForm();
    }
}

// Hàm hiển thị danh sách phiếu nhập
function renderImportList() {
    const tbody = document.getElementById('import-list-body');
    tbody.innerHTML = '';

    importData.forEach((importItem, index) => {
        const statusText = importItem.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý';
        const statusClass = importItem.status === 'completed' ? 'bg-success' : 'bg-warning';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${importItem.code}</strong></td>
            <td>${formatDate(importItem.date)}</td>
            <td>${importItem.productCount} sản phẩm</td>
            <td>${importItem.totalValue.toLocaleString('vi-VN')} VND</td>
            <td><span class="badge ${statusClass}">${statusText}</span></td>
            <td>
                <button class="btn btn-info btn-sm me-1" onclick="viewImportDetail(${importItem.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-warning btn-sm me-1" onclick="editImport(${importItem.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteImport(${importItem.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hàm xem chi tiết phiếu nhập
function viewImportDetail(id) {
    const importItem = importData.find(item => item.id === id);
    if (!importItem) return;

    // Cập nhật thông tin phiếu nhập
    document.getElementById('detail-ma-phieu').textContent = importItem.code;
    document.getElementById('detail-ngay-nhap').textContent = formatDate(importItem.date);
    document.getElementById('detail-code').textContent = importItem.code;
    document.getElementById('detail-status').textContent = importItem.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý';
    document.getElementById('detail-status').className = importItem.status === 'completed' ? 'badge bg-success' : 'badge bg-warning';

    // Hiển thị danh sách sản phẩm
    const tbody = document.getElementById('detail-products-body');
    tbody.innerHTML = '';

    let totalItems = 0;
    let totalQuantity = 0;
    let totalValue = 0;

    importItem.products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            </td>
            <td>${product.name}</td>
            <td>${product.code}</td>
            <td>${product.price.toLocaleString('vi-VN')} VND</td>
            <td>${product.quantity}</td>
            <td>${product.total.toLocaleString('vi-VN')} VND</td>
        `;
        tbody.appendChild(row);

        totalItems++;
        totalQuantity += product.quantity;
        totalValue += product.total;
    });

    // Cập nhật tổng quan
    document.getElementById('summary-items').textContent = totalItems;
    document.getElementById('summary-quantity').textContent = totalQuantity;
    document.getElementById('summary-total').textContent = totalValue.toLocaleString('vi-VN');

    showView('detail-view');
}

// Hàm chỉnh sửa phiếu nhập
function editImport(id) {
    const importItem = importData.find(item => item.id === id);
    if (!importItem) return;

    currentEditingId = id;

    // Điền thông tin vào form chỉnh sửa
    document.getElementById('edit-date').value = importItem.date;
    document.getElementById('edit-code').value = importItem.code;

    // Hiển thị danh sách sản phẩm
    const container = document.getElementById('edit-product-list');
    container.innerHTML = '';

    importItem.products.forEach((product, index) => {
        addEditProductRow(product);
    });

    updateEditSummary();
    showView('edit-view');
}

// Hàm xóa phiếu nhập
function deleteImport(id) {
    if (confirm('Bạn có chắc chắn muốn xóa phiếu nhập này?')) {
        importData = importData.filter(item => item.id !== id);
        renderImportList();
        alert('Đã xóa phiếu nhập thành công!');
    }
}

// Hàm thêm dòng sản phẩm trong form thêm mới
function addProductRow(product = null) {
    const container = document.getElementById('add-product-list');
    productCounter++;

    const productRow = document.createElement('div');
    productRow.className = 'product-row';
    productRow.innerHTML = `
        <div class="row g-3 align-items-center">
            <div class="col-md-3">
                <label class="form-label">Tên sản phẩm</label>
                <input type="text" class="form-control product-name" value="${product ? product.name : ''}" placeholder="Nhập tên sản phẩm">
            </div>
            <div class="col-md-2">
                <label class="form-label">Mã sản phẩm</label>
                <input type="text" class="form-control product-code" value="${product ? product.code : ''}" placeholder="Mã SP">
            </div>
            <div class="col-md-2">
                <label class="form-label">Giá nhập</label>
                <input type="number" class="form-control product-price" value="${product ? product.price : ''}" placeholder="0" min="0">
            </div>
            <div class="col-md-2">
                <label class="form-label">Số lượng</label>
                <input type="number" class="form-control product-quantity" value="${product ? product.quantity : ''}" placeholder="0" min="1">
            </div>
            <div class="col-md-2">
                <label class="form-label">Thành tiền</label>
                <input type="text" class="form-control product-total" value="${product ? product.total.toLocaleString('vi-VN') + ' VND' : '0 VND'}" readonly>
            </div>
            <div class="col-md-1">
                <label class="form-label">&nbsp;</label>
                <button type="button" class="btn btn-danger remove-product" onclick="this.parentElement.parentElement.parentElement.remove(); updateAddSummary()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;

    container.appendChild(productRow);

    // Thêm sự kiện tính toán tự động
    const priceInput = productRow.querySelector('.product-price');
    const quantityInput = productRow.querySelector('.product-quantity');
    const totalInput = productRow.querySelector('.product-total');

    function calculateTotal() {
        const price = parseFloat(priceInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const total = price * quantity;
        totalInput.value = total.toLocaleString('vi-VN') + ' VND';
        updateAddSummary();
    }

    priceInput.addEventListener('input', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);

    updateAddSummary();
}

// Hàm thêm dòng sản phẩm trong form chỉnh sửa
function addEditProductRow(product = null) {
    const container = document.getElementById('edit-product-list');
    productCounter++;

    const productRow = document.createElement('div');
    productRow.className = 'product-row';
    productRow.innerHTML = `
        <div class="row g-3 align-items-center">
            <div class="col-md-3">
                <label class="form-label">Tên sản phẩm</label>
                <input type="text" class="form-control product-name" value="${product ? product.name : ''}" placeholder="Nhập tên sản phẩm">
            </div>
            <div class="col-md-2">
                <label class="form-label">Mã sản phẩm</label>
                <input type="text" class="form-control product-code" value="${product ? product.code : ''}" placeholder="Mã SP">
            </div>
            <div class="col-md-2">
                <label class="form-label">Giá nhập</label>
                <input type="number" class="form-control product-price" value="${product ? product.price : ''}" placeholder="0" min="0">
            </div>
            <div class="col-md-2">
                <label class="form-label">Số lượng</label>
                <input type="number" class="form-control product-quantity" value="${product ? product.quantity : ''}" placeholder="0" min="1">
            </div>
            <div class="col-md-2">
                <label class="form-label">Thành tiền</label>
                <input type="text" class="form-control product-total" value="${product ? product.total.toLocaleString('vi-VN') + ' VND' : '0 VND'}" readonly>
            </div>
            <div class="col-md-1">
                <label class="form-label">&nbsp;</label>
                <button type="button" class="btn btn-danger remove-product" onclick="this.parentElement.parentElement.parentElement.remove(); updateEditSummary()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;

    container.appendChild(productRow);

    // Thêm sự kiện tính toán tự động
    const priceInput = productRow.querySelector('.product-price');
    const quantityInput = productRow.querySelector('.product-quantity');
    const totalInput = productRow.querySelector('.product-total');

    function calculateTotal() {
        const price = parseFloat(priceInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const total = price * quantity;
        totalInput.value = total.toLocaleString('vi-VN') + ' VND';
        updateEditSummary();
    }

    priceInput.addEventListener('input', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);

    updateEditSummary();
}

// Hàm cập nhật tổng quan form thêm mới
function updateAddSummary() {
    const productRows = document.querySelectorAll('#add-product-list .product-row');
    let totalItems = 0;
    let totalQuantity = 0;
    let totalValue = 0;

    productRows.forEach(row => {
        const price = parseFloat(row.querySelector('.product-price').value) || 0;
        const quantity = parseInt(row.querySelector('.product-quantity').value) || 0;
        
        if (price > 0 && quantity > 0) {
            totalItems++;
            totalQuantity += quantity;
            totalValue += price * quantity;
        }
    });

    document.getElementById('add-summary-items').textContent = totalItems;
    document.getElementById('add-summary-quantity').textContent = totalQuantity;
    document.getElementById('add-summary-total').textContent = totalValue.toLocaleString('vi-VN');
}

<<<<<<< HEAD
// Hàm cập nhật tổng quan form chỉnh sửa
=======
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
>>>>>>> dc564dda5d34a43ce7af8f8bdbe371769e4017e2
function updateEditSummary() {
    const productRows = document.querySelectorAll('#edit-product-list .product-row');
    let totalItems = 0;
    let totalQuantity = 0;
    let totalValue = 0;

    productRows.forEach(row => {
        const price = parseFloat(row.querySelector('.product-price').value) || 0;
        const quantity = parseInt(row.querySelector('.product-quantity').value) || 0;
        
        if (price > 0 && quantity > 0) {
            totalItems++;
            totalQuantity += quantity;
            totalValue += price * quantity;
        }
    });

    document.getElementById('edit-summary-items').textContent = totalItems;
    document.getElementById('edit-summary-quantity').textContent = totalQuantity;
    document.getElementById('edit-summary-total').textContent = totalValue.toLocaleString('vi-VN');
}

// Hàm reset form thêm mới
function resetAddForm() {
    document.getElementById('add-product-list').innerHTML = '';
    document.getElementById('add-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('add-code').value = `#MP${String(importData.length + 1).padStart(3, '0')}`;
    updateAddSummary();
    addProductRow(); // Thêm một dòng sản phẩm mặc định
}

// Hàm lưu phiếu nhập mới
function saveNewImport() {
    const date = document.getElementById('add-date').value;
    const code = document.getElementById('add-code').value;
    const statusSelect = document.querySelector('#add-view #status');
    const status = statusSelect.value || 'pending';

    if (!date) {
        alert('Vui lòng chọn ngày nhập!');
        return;
    }

    const productRows = document.querySelectorAll('#add-product-list .product-row');
    if (productRows.length === 0) {
        alert('Vui lòng thêm ít nhất một sản phẩm!');
        return;
    }

    const products = [];
    let totalValue = 0;

    productRows.forEach((row, index) => {
        const name = row.querySelector('.product-name').value;
        const code = row.querySelector('.product-code').value;
        const price = parseFloat(row.querySelector('.product-price').value) || 0;
        const quantity = parseInt(row.querySelector('.product-quantity').value) || 0;

        if (name && code && price > 0 && quantity > 0) {
            const total = price * quantity;
            products.push({
                id: index + 1,
                name: name,
                code: code,
                price: price,
                quantity: quantity,
                total: total,
                image: getProductImage(name)
            });
            totalValue += total;
        }
    });

    if (products.length === 0) {
        alert('Vui lòng nhập thông tin sản phẩm hợp lệ!');
        return;
    }

    const newImport = {
        id: importData.length + 1,
        code: code,
        date: date,
        productCount: products.length,
        totalValue: totalValue,
        status: status,
        supplier: "Flower Garden",
        products: products
    };

    importData.push(newImport);
    renderImportList();
    showView('list-view');
    alert('Thêm phiếu nhập thành công!');
}

// Hàm cập nhật phiếu nhập
function updateImport() {
    if (!currentEditingId) return;

    const date = document.getElementById('edit-date').value;
    const code = document.getElementById('edit-code').value;
    const statusSelect = document.querySelector('#edit-view #status');
    const status = statusSelect.value || 'pending';

    if (!date) {
        alert('Vui lòng chọn ngày nhập!');
        return;
    }

    const productRows = document.querySelectorAll('#edit-product-list .product-row');
    if (productRows.length === 0) {
        alert('Vui lòng thêm ít nhất một sản phẩm!');
        return;
    }

    const products = [];
    let totalValue = 0;

    productRows.forEach((row, index) => {
        const name = row.querySelector('.product-name').value;
        const code = row.querySelector('.product-code').value;
        const price = parseFloat(row.querySelector('.product-price').value) || 0;
        const quantity = parseInt(row.querySelector('.product-quantity').value) || 0;

        if (name && code && price > 0 && quantity > 0) {
            const total = price * quantity;
            products.push({
                id: index + 1,
                name: name,
                code: code,
                price: price,
                quantity: quantity,
                total: total,
                image: getProductImage(name)
            });
            totalValue += total;
        }
    });

    if (products.length === 0) {
        alert('Vui lòng nhập thông tin sản phẩm hợp lệ!');
        return;
    }

    const importIndex = importData.findIndex(item => item.id === currentEditingId);
    if (importIndex !== -1) {
        importData[importIndex] = {
            ...importData[importIndex],
            date: date,
            productCount: products.length,
            totalValue: totalValue,
            status: status,
            products: products
        };

        renderImportList();
        showView('list-view');
        alert('Cập nhật phiếu nhập thành công!');
    }
}

// Hàm lấy ảnh sản phẩm dựa trên tên
function getProductImage(productName) {
    const imageMap = {
        "Nhiệt Ái": "images/hoa1.jpg",
        "Peach": "images/hoa2.jpg",
        "Blueberry": "images/hoa3.jpg",
        "Lemon": "images/hoa4.jpg",
        "Vườn Xuân Ca": "images/hoa5.jpg",
        "Shimmer Grace": "images/langhoa1.webp",
        "BlueSky": "images/langhoa2.jpg",
        "Sen Xanh": "images/langhoa3.png",
        "Sắc Màu": "images/kehoa1.jpg",
        "Hồng Phát": "images/kehoa2.jpg",
        "Tương Lai": "images/kehoa3.jpg"
    };

    return imageMap[productName] || "images/default-product.jpg";
}

// Hàm định dạng ngày
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Hàm in phiếu nhập
function printImport() {
    window.print();
}

// Hàm tìm kiếm phiếu nhập
function searchImports() {
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;
    const statusFilter = document.getElementById('status-filter').value;

    let filteredData = importData;

    if (dateFrom) {
        filteredData = filteredData.filter(item => item.date >= dateFrom);
    }

    if (dateTo) {
        filteredData = filteredData.filter(item => item.date <= dateTo);
    }

    if (statusFilter) {
        filteredData = filteredData.filter(item => item.status === statusFilter);
    }

    // Cập nhật danh sách
    const tbody = document.getElementById('import-list-body');
    tbody.innerHTML = '';

    filteredData.forEach((importItem, index) => {
        const statusText = importItem.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý';
        const statusClass = importItem.status === 'completed' ? 'bg-success' : 'bg-warning';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${importItem.code}</strong></td>
            <td>${formatDate(importItem.date)}</td>
            <td>${importItem.productCount} sản phẩm</td>
            <td>${importItem.totalValue.toLocaleString('vi-VN')} VND</td>
            <td><span class="badge ${statusClass}">${statusText}</span></td>
            <td>
                <button class="btn btn-info btn-sm me-1" onclick="viewImportDetail(${importItem.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-warning btn-sm me-1" onclick="editImport(${importItem.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteImport(${importItem.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hàm reset bộ lọc
function resetFilter() {
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    document.getElementById('status-filter').value = '';
    renderImportList();
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    renderImportList();
    
    // Thêm sự kiện cho nút tìm kiếm
    document.getElementById('searchImportBtn').addEventListener('click', searchImports);
    document.getElementById('resetImportBtn').addEventListener('click', resetFilter);
    
    // Thêm một dòng sản phẩm mặc định khi vào form thêm mới
    resetAddForm();
    
    // Khởi tạo AOS
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }
});