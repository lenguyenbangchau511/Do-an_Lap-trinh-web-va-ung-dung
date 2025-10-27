AOS.init();

        document.addEventListener('DOMContentLoaded', function() {
            const userMenuToggle = document.getElementById('userMenuToggle');
            const userDropdown = document.getElementById('userDropdown');
            const dropdownOverlay = document.getElementById('dropdownOverlay');
            const logoutBtn = document.getElementById('logoutBtn');

            // Toggle dropdown
            userMenuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
                dropdownOverlay.classList.toggle('show');
                userMenuToggle.classList.toggle('active');
            });

            // Close dropdown khi click overlay
            dropdownOverlay.addEventListener('click', function() {
                userDropdown.classList.remove('show');
                dropdownOverlay.classList.remove('show');
                userMenuToggle.classList.remove('active');
            });

            // Xử lý click menu items
            document.querySelectorAll('.dropdown-item:not(.logout)').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const itemText = this.querySelector('span').textContent;
                    console.log('Clicked:', itemText);
                    alert(`Bạn đã chọn: ${itemText}`);
                    userDropdown.classList.remove('show');
                    dropdownOverlay.classList.remove('show');
                    userMenuToggle.classList.remove('active');
                });
            });

            // Logout functionality
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Đăng xuất...');
                
                // Hiển thị xác nhận logout
                if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                    window.location.href = 'index.html';
                }
                
                userDropdown.classList.remove('show');
                dropdownOverlay.classList.remove('show');
                userMenuToggle.classList.remove('active');
            });

            // Close dropdown khi click bên ngoài
            document.addEventListener('click', function(e) {
                if (!userDropdown.contains(e.target) && !userMenuToggle.contains(e.target)) {
                    userDropdown.classList.remove('show');
                    dropdownOverlay.classList.remove('show');
                    userMenuToggle.classList.remove('active');
                }
            });

            // Close dropdown khi nhấn phím Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    userDropdown.classList.remove('show');
                    dropdownOverlay.classList.remove('show');
                    userMenuToggle.classList.remove('active');
                }
            });
        });