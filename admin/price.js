document.addEventListener("DOMContentLoaded", () => {
  // Dữ liệu mẫu
  let categories = [
    { id: 1, name: "Bó hoa", profit: 10 },
    { id: 2, name: "Lẳng hoa", profit: 20 },
    { id: 3, name: "Kệ hoa", profit: 30 },
  ];

  let products = [
    { id: 1, name: "Nhiệt Ái", category: "Bó hoa", cost: 150000, profit: 35 },
    { id: 2, name: "Peach", category: "Bó hoa", cost: 200000, profit: 40 },
    { id: 3, name: "Blueberry", category: "Bó hoa", cost: 320000, profit: 30 },
    { id: 4, name: "Lemon", category: "Bó hoa", cost: 280000, profit: 45 },
    {
      id: 5,
      name: "Shimmer Grace",
      category: "Lẳng hoa",
      cost: 250000,
      profit: 25,
    },
    { id: 6, name: "Blue Sky", category: "Lẳng hoa", cost: 450000, profit: 30 },
    {
      id: 7,
      name: "Sen Xanh ",
      category: "Lẳng hoa",
      cost: 220000,
      profit: 38,
    },
    { id: 8, name: "Sắc Màu", category: "Kệ hoa", cost: 350000, profit: 20 },
    { id: 9, name: "Hồng Phát", category: "Kệ hoa", cost: 260000, profit: 22 },
    { id: 10, name: "Tương Lai", category: "Kệ hoa", cost: 280000, profit: 28 },
  ];

  // *************** BIẾN VÀ HÀM CHO CHỨC NĂNG SỬA SẢN PHẨM ***************
  const modal = document.getElementById("editPriceModal");
  const closeBtn = document.querySelector("#editPriceModal .close-btn");
  const form = document.getElementById("editPriceForm");
  const productIdInput = document.getElementById("modal-product-id");
  const productNameSelect = document.getElementById("modal-product-name");
  const costPriceInput = document.getElementById("modal-cost-price");
  const profitRateInput = document.getElementById("modal-profit-rate");
  const sellingPriceDisplay = document.getElementById("modal-selling-price");
  const successNotification = document.getElementById("success-notification");

  // Hàm đóng Modal
  function closeModal() {
    if (modal) {
      modal.style.display = "none";
    }
  }

  // Hàm hiển thị thông báo thành công (Dùng cho Modal)
  function showSuccessNotification(message) {
    if (successNotification) {
      successNotification.textContent = message;
      successNotification.classList.add("show-notification");
      setTimeout(() => {
        successNotification.classList.remove("show-notification");
      }, 3000); // Ẩn sau 3 giây
    } else {
      alert(message);
    }
  }

  // Hàm tính toán và hiển thị Giá Bán
  function updateSellingPrice() {
    const costPrice = parseFloat(costPriceInput.value) || 0;
    const profitRate = parseFloat(profitRateInput.value) || 0;

    const newSellingPrice = calculateSellingPrice(costPrice, profitRate);
    sellingPriceDisplay.value =
      newSellingPrice.toLocaleString("vi-VN") + " VND";
  }

  // Hàm Mở Modal và nạp dữ liệu sản phẩm
  window.openEditModal = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      showToast("Không tìm thấy sản phẩm!");
      return;
    }

    // 1. Nạp dữ liệu vào form
    productIdInput.value = product.id;

    // 2. Tên sản phẩm (Dropdown/Select - Giữ nguyên yêu cầu)
    // Nạp tất cả sản phẩm vào dropdown để có "thao cuộn"
    productNameSelect.innerHTML = products
      .map(
        (p) =>
          `<option value="${p.id}" ${p.id === product.id ? "selected" : ""}>${
            p.name
          } (${p.category})</option>`
      )
      .join("");

    costPriceInput.value = product.cost;
    profitRateInput.value = product.profit;

    // 3. Tính toán giá bán ban đầu và hiển thị
    updateSellingPrice();

    // 4. Hiển thị Modal
    modal.style.display = "block";
  };

  // Hàm thiết lập sự kiện Modal
  function setupModalEvents() {
    if (!modal) return;

    // Đóng Modal khi bấm nút X
    closeBtn.onclick = closeModal;

    // Đóng Modal khi bấm ra ngoài Modal
    window.onclick = function (event) {
      if (event.target === modal) {
        closeModal();
      }
    };

    // Sự kiện nhập liệu để tính toán giá bán
    costPriceInput.addEventListener("input", updateSellingPrice);
    profitRateInput.addEventListener("input", updateSellingPrice);

    // Sự kiện Gửi Form (Lưu)
    form.onsubmit = function (event) {
      event.preventDefault();

      // 1. Kiểm tra không được bỏ trống (Validation)
      if (
        !costPriceInput.value ||
        !profitRateInput.value ||
        !productNameSelect.value
      ) {
        showToast(
          "Lỗi: Vui lòng nhập đầy đủ Giá Vốn và Tỷ Lệ Lợi Nhuận, và chọn sản phẩm."
        );
        return;
      }

      const newCostPrice = parseFloat(costPriceInput.value);
      const newProfitRate = parseFloat(profitRateInput.value);
      const selectedProductId = parseInt(productNameSelect.value);

      if (
        isNaN(newCostPrice) ||
        newCostPrice < 0 ||
        isNaN(newProfitRate) ||
        newProfitRate < 0 ||
        newProfitRate >= 100
      ) {
        showToast(
          "Lỗi: Giá Vốn phải >= 0. Tỷ Lệ Lợi Nhuận phải từ 0 đến dưới 100."
        );
        return;
      }

      // 2. Tính toán Giá Bán mới
      const newSellingPrice = calculateSellingPrice(
        newCostPrice,
        newProfitRate
      );

      // 3. Cập nhật dữ liệu (Giả lập)
      const productIndex = products.findIndex(
        (p) => p.id === selectedProductId
      );

      if (productIndex !== -1) {
        products[productIndex].cost = newCostPrice;
        products[productIndex].profit = newProfitRate;

        // 4. Render lại bảng
        renderPriceLookupTable();

        // 5. Đóng Modal và thông báo thành công
        closeModal();
        showSuccessNotification(
          `Cập nhật giá bán cho sản phẩm ${products[productIndex].name} thành công!`
        );
      } else {
        showToast("Lỗi: Không tìm thấy ID sản phẩm để cập nhật.");
      }
    };
  }
  // *************** KẾT THÚC CHỨC NĂNG SỬA ***************

  // Hàm hiển thị toast message
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

  // Hàm render bảng tỷ lệ lợi nhuận theo danh mục
  function renderCategoryProfitTable(filteredCategories = categories) {
    const tbody = document.getElementById("category-profit-body");
    tbody.innerHTML = "";
    filteredCategories.forEach((cat, index) => {
      const row = tbody.insertRow();
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${cat.name}</td>
                <td>
                    <input type="number" class="profit-input" value="${
                      cat.profit
                    }" min="0" max="100" step="0.1" data-id="${cat.id}"> %
                </td>
                <td>
                    <button class="action-btn save-category-btn" data-id="${
                      cat.id
                    }">Lưu</button>
                </td>
            `;
    });

    // Gắn sự kiện cho các nút "Lưu"
    document.querySelectorAll(".save-category-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const categoryId = parseInt(event.target.dataset.id);
        const input = event.target.closest("tr").querySelector(".profit-input");
        const newProfit = parseFloat(input.value);

        if (isNaN(newProfit) || newProfit < 0 || newProfit > 100) {
          showToast("Tỷ lệ lợi nhuận phải từ 0 đến 100.");
          return;
        }

        const categoryIndex = categories.findIndex(
          (cat) => cat.id === categoryId
        );
        if (categoryIndex !== -1) {
          categories[categoryIndex].profit = newProfit;
          showToast(
            `Đã lưu thành công tỷ lệ lợi nhuận cho danh mục ${categories[categoryIndex].name}!`
          );
          renderProductProfitTable();
          renderPriceLookupTable();
        }
      });
    });
  }

  /**
   * Hàm tính giá bán (Giá vốn / (1 - Tỷ lệ Lợi nhuận / 100)).
   */
  function calculateSellingPrice(cost, profitPercentage) {
    if (cost <= 0 || profitPercentage >= 100) return 0;
    const price = cost / (1 - profitPercentage / 100);
    return Math.floor(price);
  }

  // Hàm render bảng tỷ lệ lợi nhuận theo sản phẩm
  function renderProductProfitTable(filteredProducts = products) {
    const tbody = document.getElementById("product-profit-body");
    tbody.innerHTML = "";
    filteredProducts.forEach((prod, index) => {
      const row = tbody.insertRow();
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${prod.name}</td>
                <td>${prod.category}</td>
                <td>
                    <input type="number" class="profit-input" value="${
                      prod.profit
                    }" min="0" max="100" step="0.1" data-id="${prod.id}"> %
                </td>
                <td>
                    <button class="action-btn save-product-btn" data-id="${
                      prod.id
                    }">Lưu</button>
                </td>
            `;
    });

    // Gắn sự kiện cho các nút "Lưu"
    document.querySelectorAll(".save-product-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.dataset.id);
        const input = event.target.closest("tr").querySelector(".profit-input");
        const newProfit = parseFloat(input.value);

        if (isNaN(newProfit) || newProfit < 0 || newProfit > 100) {
          showToast("Tỷ lệ lợi nhuận phải từ 0 đến 100.");
          return;
        }

        const productIndex = products.findIndex((p) => p.id === productId);
        if (productIndex !== -1) {
          products[productIndex].profit = newProfit;
          showToast(
            `Đã lưu thành công tỷ lệ lợi nhuận cho sản phẩm ${products[productIndex].name}!`
          );
          renderPriceLookupTable();
        }
      });
    });
  }

  // Hàm render bảng tra cứu giá bán (Đã Cập Nhật Thêm Nút Sửa)
  function renderPriceLookupTable(filteredProducts = products) {
    const tbody = document.getElementById("price-lookup-body");
    tbody.innerHTML = "";
    filteredProducts.forEach((prod, index) => {
      const sellingPrice = calculateSellingPrice(prod.cost, prod.profit);
      const row = tbody.insertRow();
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${prod.name}</td>
                <td>${prod.category}</td>
                <td>${prod.cost.toLocaleString("vi-VN")} VND</td>
                <td>${prod.profit} %</td>
                <td>${sellingPrice.toLocaleString("vi-VN")} VND</td> 
                <td>
                    <button class="action-btn edit" data-id="${
                      prod.id
                    }" onclick="openEditModal(${prod.id})">Sửa</button>
                </td>
            `;
    });
  }

  // Chuyển đổi tab
  window.showTab = function (tabId) {
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
    document
      .querySelector(`.tab-button[onclick="showTab('${tabId}')"]`)
      .classList.add("active");

    if (tabId === "category-profit") {
      renderCategoryProfitTable();
    } else if (tabId === "product-profit") {
      renderProductProfitTable();
    } else if (tabId === "price-lookup") {
      renderPriceLookupTable();
    }
  };

  // Khởi tạo hiển thị tab đầu tiên và dữ liệu
  showTab("category-profit");
  setupModalEvents(); // Gắn sự kiện cho Modal

  // --- Chức năng lọc và tìm kiếm (Giữ nguyên) ---

  // Lọc cho Tỷ lệ lợi nhuận theo danh mục
  document
    .querySelector("#category-profit .search-btn")
    .addEventListener("click", () => {
      const searchTerm = document
        .getElementById("search-category")
        .value.toLowerCase();
      const profitRange = document.getElementById("profit-range").value;

      let filtered = categories.filter((cat) => {
        const matchesSearch = cat.name.toLowerCase().includes(searchTerm);
        let matchesProfitRange = true;

        if (profitRange) {
          const [minStr, maxStr] = profitRange.split("-");
          const min = parseFloat(minStr);
          const max = parseFloat(maxStr);

          if (profitRange.endsWith("+")) {
            matchesProfitRange = cat.profit >= min;
          } else {
            matchesProfitRange = cat.profit >= min && cat.profit <= max;
          }
        }
        return matchesSearch && matchesProfitRange;
      });
      renderCategoryProfitTable(filtered);
    });

  document
    .querySelector("#category-profit .reset-btn")
    .addEventListener("click", () => {
      document.getElementById("search-category").value = "";
      document.getElementById("profit-range").value = "";
      renderCategoryProfitTable();
    });

  // Lọc cho Tỷ lệ lợi nhuận theo sản phẩm
  document
    .querySelector("#product-profit .search-btn")
    .addEventListener("click", () => {
      const searchTerm = document
        .getElementById("search-product")
        .value.toLowerCase();
      const categoryFilter = document.getElementById(
        "product-category-filter"
      ).value;

      let filtered = products.filter((prod) => {
        const matchesSearch = prod.name.toLowerCase().includes(searchTerm);
        const matchesCategory =
          categoryFilter === "" || prod.category === categoryFilter;
        return matchesSearch && matchesCategory;
      });
      renderProductProfitTable(filtered);
    });

  document
    .querySelector("#product-profit .reset-btn")
    .addEventListener("click", () => {
      document.getElementById("search-product").value = "";
      document.getElementById("product-category-filter").value = "";
      renderProductProfitTable();
    });

  // Lọc cho Tra cứu giá bán
  document
    .querySelector("#price-lookup .search-btn")
    .addEventListener("click", () => {
      const searchTerm = document
        .getElementById("lookup-search-product")
        .value.toLowerCase();
      const categoryFilter = document.getElementById(
        "lookup-product-category-filter"
      ).value;
      const priceRange = document.getElementById("price-range-filter").value;

      let filtered = products.filter((prod) => {
        const matchesSearch = prod.name.toLowerCase().includes(searchTerm);
        const matchesCategory =
          categoryFilter === "" || prod.category === categoryFilter;
        let matchesPriceRange = true;

        if (priceRange) {
          const sellingPrice = calculateSellingPrice(prod.cost, prod.profit);
          const [minStr, maxStr] = priceRange.split("-");
          const min = parseInt(minStr);
          const max = parseInt(maxStr);

          if (priceRange.endsWith("+")) {
            matchesPriceRange = sellingPrice >= min;
          } else {
            matchesPriceRange = sellingPrice >= min && sellingPrice <= max;
          }
        }
        return matchesSearch && matchesCategory && matchesPriceRange;
      });
      renderPriceLookupTable(filtered);
    });

  document
    .querySelector("#price-lookup .reset-btn")
    .addEventListener("click", () => {
      document.getElementById("lookup-search-product").value = "";
      document.getElementById("lookup-product-category-filter").value = "";
      document.getElementById("price-range-filter").value = "";
      renderPriceLookupTable();
    });
});
