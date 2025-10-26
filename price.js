const data = [
  {
    id: "P001",
    name: "Hoa Nhiệt Ái",
    cost: 200000,
    sell: 700000,
    category: "hoa",
  },
  {
    id: "P002",
    name: "Hoa Peach",
    cost: 300000,
    sell: 770000,
    category: "hoa",
  },
  {
    id: "P003",
    name: "Hoa Blueberry",
    cost: 150000,
    sell: 250000,
    category: "hoa",
  },
  {
    id: "P004",
    name: "Hoa Lemon",
    cost: 400000,
    sell: 650000,
    category: "hoa",
  },
  {
    id: "P005",
    name: "Shimmer Grace",
    cost: 600000,
    sell: 1150000,
    category: "langhoa",
  },
  {
    id: "P006",
    name: "Blue Sky",
    cost: 900000,
    sell: 1450000,
    category: "langhoa",
  },
  {
    id: "P007",
    name: "Sen Xanh",
    cost: 800000,
    sell: 1500000,
    category: "kehoa",
  },
  {
    id: "P008",
    name: "Sắc Màu",
    cost: 2000000,
    sell: 3500000,
    category: "kehoa",
  },
  {
    id: "P009",
    name: "Hồng Phát",
    cost: 1200000,
    sell: 1900000,
    category: "giohoa",
  },
  {
    id: "P010",
    name: "Tương Lai",
    cost: 1000000,
    sell: 2100000,
    category: "giohoa",
  },
];

const tableBody = document.getElementById("tableBody");
const historyList = document.getElementById("historyList");

// ================== BẢNG HIỂN THỊ ==================
function renderTable(items) {
  tableBody.innerHTML = "";
  items.forEach((p, index) => {
    const profit = (((p.sell - p.cost) / p.cost) * 100).toFixed(1);
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.cost.toLocaleString()} VND</td>
        <td>${p.sell.toLocaleString()} VND</td>
        <td>${profit}%</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

function filterCategory() {
  const cat = document.getElementById("category").value;
  if (cat === "all") renderTable(data);
  else renderTable(data.filter((p) => p.category === cat));
}

// ================== POPUP ==================
function openEditPopup() {
  document.getElementById("editPopup").style.display = "block";
}

function closePopup() {
  document.getElementById("editPopup").style.display = "none";
  document.getElementById("productCode").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("costPrice").value = "";
  document.getElementById("sellPrice").value = "";
  document.getElementById("profitPercent").value = "";
}

// ================== TỰ ĐỘNG ĐIỀN TÊN ==================
document.getElementById("productCode").addEventListener("input", function () {
  const code = this.value.trim().toUpperCase();
  const product = data.find((p) => p.id === code);
  document.getElementById("productName").value = product ? product.name : "";
});

// ================== TÍNH LỢI NHUẬN ==================
["costPrice", "sellPrice"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateProfit);
});

function updateProfit() {
  const cost = parseFloat(document.getElementById("costPrice").value);
  const sell = parseFloat(document.getElementById("sellPrice").value);
  if (isNaN(cost) || isNaN(sell) || sell === 0) {
    document.getElementById("profitPercent").value = "";
    return;
  }
  const profit = (((sell - cost) / sell) * 100).toFixed(1);
  document.getElementById("profitPercent").value = profit + " %";
}

// ================== THÔNG BÁO TÙY CHỈNH ==================
function showAlert(message, type = "success") {
  let alertBox = document.getElementById("customAlert");
  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.id = "customAlert";
    document.body.appendChild(alertBox);
  }

  alertBox.textContent = message;
  alertBox.className =
    "custom-alert " + (type === "error" ? "error" : "success");
  alertBox.style.display = "block";

  setTimeout(() => (alertBox.style.opacity = "1"), 50);
  setTimeout(() => {
    alertBox.style.opacity = "0";
    setTimeout(() => (alertBox.style.display = "none"), 400);
  }, 2500);
}

// ================== LỊCH SỬ CHỈNH SỬA ==================
function loadHistory() {
  const savedHistory = JSON.parse(localStorage.getItem("editHistory")) || [];
  historyList.innerHTML = "";
  savedHistory.forEach((item) => {
    const li = document.createElement("div");
    li.className = "history-item";
    li.innerHTML = `
      <strong>${item.time}</strong> — ${item.id} | ${item.name} 
      <div class="timestamp">
        Giá vốn: ${item.oldCost.toLocaleString()} → ${item.newCost.toLocaleString()} |
        Giá bán: ${item.oldSell.toLocaleString()} → ${item.newSell.toLocaleString()}
      </div>
    `;
    historyList.appendChild(li);
  });
}

// ================== LƯU CHỈNH SỬA ==================
function saveEdit() {
  const code = document
    .getElementById("productCode")
    .value.trim()
    .toUpperCase();
  const cost = document.getElementById("costPrice").value.trim();
  const sell = document.getElementById("sellPrice").value.trim();

  if (!code || !cost || !sell) {
    showAlert("Vui lòng nhập đầy đủ thông tin sản phẩm!", "error");
    return;
  }

  const product = data.find((p) => p.id === code);
  if (!product) {
    showAlert("Không tìm thấy sản phẩm!", "error");
    return;
  }

  const oldCost = product.cost;
  const oldSell = product.sell;

  product.cost = parseInt(cost);
  product.sell = parseInt(sell);

  const time = new Date().toLocaleString("vi-VN");
  const newHistory = {
    time,
    id: product.id,
    name: product.name,
    oldCost,
    newCost: product.cost,
    oldSell,
    newSell: product.sell,
  };

  // 🔹 Lưu vào localStorage
  const savedHistory = JSON.parse(localStorage.getItem("editHistory")) || [];
  savedHistory.unshift(newHistory); // thêm lên đầu danh sách
  localStorage.setItem("editHistory", JSON.stringify(savedHistory));

  // 🔹 Cập nhật hiển thị
  loadHistory();

  // 🔹 Hiệu ứng sáng khi thêm mới
  const firstItem = historyList.firstElementChild;
  if (firstItem) {
    firstItem.style.backgroundColor = "#dfffe0";
    setTimeout(() => (firstItem.style.backgroundColor = "#fff"), 800);
  }

  closePopup();
  filterCategory();
  showAlert("Cập nhật thành công!", "success");
}

// ================== KHỞI TẠO ==================
renderTable(data);
loadHistory();
