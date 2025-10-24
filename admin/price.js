const data = [
  {
    id: "P001",
    name: "Nhiệt Ái",
    cost: 500000,
    sell: 700000,
    category: "bohoa",
  },
  { id: "P002", name: "Peach", cost: 600000, sell: 770000, category: "bohoa" },
  {
    id: "P003",
    name: "Blueberry",
    cost: 180000,
    sell: 250000,
    category: "bohoa",
  },
  { id: "P004", name: "Lemon", cost: 500000, sell: 650000, category: "bohoa" },
  {
    id: "P005",
    name: "Shimmer Grace",
    cost: 800000,
    sell: 1150000,
    category: "langhoa",
  },
  {
    id: "P006",
    name: "BlueSky",
    cost: 1100000,
    sell: 1450000,
    category: "langhoa",
  },
  {
    id: "P007",
    name: "Sen Xanh",
    cost: 1100000,
    sell: 1500000,
    category: "langhoa",
  },
  { id: "P008", name: "Sắc Màu", cost: 2800000, sell: 3500000, category: "kehoa" },
  {
    id: "P009",
    name: "Hồng Phát",
    cost: 1500000,
    sell: 1900000,
    category: "kehoa",
  },
  {
    id: "P010",
    name: "Tương Lai",
    cost: 1800000,
    sell: 2100000,
    category: "kehoa",
  },
];

const tableBody = document.getElementById("tableBody");
const historyList = document.getElementById("historyList");

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

// 🔹 Popup chức năng
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

// 🔹 Khi nhập mã sản phẩm -> tự động hiện tên
document.getElementById("productCode").addEventListener("input", function () {
  const code = this.value.trim().toUpperCase();
  const product = data.find((p) => p.id === code);
  document.getElementById("productName").value = product ? product.name : "";
});

// 🔹 Tính tự động lợi nhuận khi nhập giá
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

function saveEdit() {
  const code = document
    .getElementById("productCode")
    .value.trim()
    .toUpperCase();
  const cost = parseInt(document.getElementById("costPrice").value);
  const sell = parseInt(document.getElementById("sellPrice").value);
  const product = data.find((p) => p.id === code);
  if (!product) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }

  const oldCost = product.cost;
  const oldSell = product.sell;
  product.cost = cost;
  product.sell = sell;

  const time =
    new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
  historyList.innerHTML += `<li>${time} — ${product.id} | ${
    product.name
  } | Giá vốn: ${oldCost.toLocaleString()} VND → ${cost.toLocaleString()} VND | Giá bán: ${oldSell.toLocaleString()} VND → ${sell.toLocaleString()} VND</li>`;

  closePopup();
  filterCategory();
}

renderTable(data);
