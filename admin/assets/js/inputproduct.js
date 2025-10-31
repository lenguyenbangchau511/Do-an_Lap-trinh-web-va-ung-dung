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

// Hàm cập nhật tổng quan form chỉnh sửa
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