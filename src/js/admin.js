document.addEventListener('DOMContentLoaded', function () {
    // Ensure body has a class to scope admin styles if needed
    document.body.classList.add('admin-body-active');

    const adminNavLinks = document.querySelectorAll('.admin-nav-link');
    const adminSections = document.querySelectorAll('.admin-section');
    const adminMainHeaderTitle = document.querySelector('.admin-main-header h1');
    const adminModalContainer = document.getElementById('admin-modal-container');

    // Sidebar Navigation
    adminNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href') === 'index.html') return; // Allow "Back to site" to navigate
            e.preventDefault();

            const sectionId = this.dataset.section;
            if (!sectionId) return;

            adminNavLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            adminSections.forEach(sec => sec.classList.remove('active'));
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                if (adminMainHeaderTitle && targetSection.querySelector('h2')) {
                    adminMainHeaderTitle.textContent = targetSection.querySelector('h2').textContent;
                }
            }
            // Close sidebar on mobile after click
            if (window.innerWidth <= 992) {
                document.querySelector('.admin-sidebar').classList.remove('active');
                document.body.classList.remove('admin-sidebar-active');
            }

            // Load data for the active section
            if (sectionId === 'admin-overview-section') loadOverviewData();
            if (sectionId === 'admin-orders-section') loadOrders();
            if (sectionId === 'admin-products-section') loadProducts();
            if (sectionId === 'admin-users-section') loadUsers();
        });
    });
    
    // Mobile Sidebar Toggle
    const mobileMenuToggle = document.getElementById('admin-mobile-menu-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    if (mobileMenuToggle && adminSidebar) {
        mobileMenuToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('active');
            document.body.classList.toggle('admin-sidebar-active');
        });
    }


    // Constants for localStorage keys
    const ORDERS_KEY = 'lamlemAdminOrders';
    const PRODUCTS_KEY = 'lamlemAdminProducts';

    // --- Helper Functions ---
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + date.toLocaleTimeString('ar-DZ');
    }
    
    function formatPrice(price) {
        return `${Number(price).toLocaleString('fr-DZ')} دج`;
    }

    // --- Modal Management ---
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    function createModal(id, title, contentHtml, footerHtml, onOpen) {
        if (document.getElementById(id)) document.getElementById(id).remove(); // Remove if exists

        const modalDiv = document.createElement('div');
        modalDiv.className = 'admin-modal';
        modalDiv.id = id;
        modalDiv.innerHTML = `
            <div class="admin-modal-content">
                <div class="admin-modal-header">
                    <h3>${title}</h3>
                    <button class="admin-close-modal-btn" data-modal-id="${id}" aria-label="إغلاق">&times;</button>
                </div>
                <div class="admin-modal-body">
                    ${contentHtml}
                </div>
                ${footerHtml ? `<div class="admin-modal-footer">${footerHtml}</div>` : ''}
            </div>
        `;
        adminModalContainer.appendChild(modalDiv);
        modalDiv.querySelector('.admin-close-modal-btn').addEventListener('click', () => closeModal(id));
        modalDiv.addEventListener('click', (e) => { // Close on overlay click
            if (e.target === modalDiv) closeModal(id);
        });
        if (onOpen && typeof onOpen === 'function') onOpen(modalDiv);
        return modalDiv;
    }

    // --- Overview Section ---
    function loadOverviewData() {
        const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
        const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        
        document.getElementById('stats-total-orders').textContent = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        document.getElementById('stats-total-revenue').textContent = formatPrice(totalRevenue);
        document.getElementById('stats-total-products').textContent = products.length;
        document.getElementById('stats-total-users').textContent = simulatedUsers.length; // Simulated
    }

    // --- Orders Section ---
    const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'];

    function loadOrders() {
        const ordersTableBody = document.querySelector('#admin-orders-table tbody');
        const noOrdersMsg = document.getElementById('no-orders-message');
        if (!ordersTableBody || !noOrdersMsg) return;

        const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
        ordersTableBody.innerHTML = '';

        if (orders.length === 0) {
            noOrdersMsg.style.display = 'block';
            ordersTableBody.style.display = 'none';
        } else {
            noOrdersMsg.style.display = 'none';
            ordersTableBody.style.display = '';
            orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)); // Sort by newest first

            orders.forEach(order => {
                const row = ordersTableBody.insertRow();
                row.innerHTML = `
                    <td>${order.id.slice(-6)}</td>
                    <td>${order.customerName}</td>
                    <td>${formatDate(order.orderDate)}</td>
                    <td>${formatPrice(order.totalAmount)}</td>
                    <td>
                        <select class="order-status-select" data-order-id="${order.id}">
                            ${orderStatuses.map(status => `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`).join('')}
                        </select>
                    </td>
                    <td class="admin-table-actions">
                        <button class="admin-view-btn" data-order-id="${order.id}"><i class='bx bx-show'></i> عرض</button>
                    </td>
                `;
            });
        }
        addOrderEventListeners();
    }
    
    function addOrderEventListeners() {
        document.querySelectorAll('.admin-view-btn[data-order-id]').forEach(button => {
            button.addEventListener('click', function() {
                viewOrderDetails(this.dataset.orderId);
            });
        });
        document.querySelectorAll('.order-status-select').forEach(select => {
            select.addEventListener('change', function() {
                updateOrderStatus(this.dataset.orderId, this.value);
            });
        });
    }

    function viewOrderDetails(orderId) {
        const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        let itemsHtml = '<p>لا توجد منتجات في هذا الطلب.</p>';
        if (order.items && order.items.length > 0) {
            itemsHtml = `
                <h4>المنتجات المطلوبة:</h4>
                <table id="order-details-items-table">
                    <thead><tr><th>المنتج</th><th>الكمية</th><th>السعر الوحدوي</th><th>الإجمالي</th></tr></thead>
                    <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${formatPrice(item.price)}</td>
                            <td>${formatPrice(item.price * item.quantity)}</td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>
            `;
        }

        const contentHtml = `
            <p><strong>معرف الطلب:</strong> ${order.id}</p>
            <p><strong>اسم العميل:</strong> ${order.customerName}</p>
            <p><strong>رقم الهاتف:</strong> ${order.phone}</p>
            <p><strong>تاريخ الطلب:</strong> ${formatDate(order.orderDate)}</p>
            <p><strong>الحالة:</strong> ${order.status}</p>
            <hr>
            <h4>عنوان الشحن:</h4>
            <p><strong>الولاية:</strong> ${order.state}</p>
            <p><strong>البلدية:</strong> ${order.city}</p>
            <p><strong>العنوان:</strong> ${order.address}</p>
            <hr>
            ${itemsHtml}
            <hr>
            <p><strong>تكلفة الشحن:</strong> ${formatPrice(order.shippingCost)}</p>
            <p><strong>المجموع الكلي:</strong> ${formatPrice(order.totalAmount)}</p>
        `;
        createModal('order-details-modal', `تفاصيل الطلب رقم ${order.id.slice(-6)}`, contentHtml, 
                    '<button class="admin-btn admin-btn-secondary admin-close-modal-btn" data-modal-id="order-details-modal">إغلاق</button>');
        openModal('order-details-modal');
    }

    function updateOrderStatus(orderId, newStatus) {
        let orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
            // Could add a success message here
        }
    }
    
    const searchOrdersInput = document.getElementById('search-orders');
    if(searchOrdersInput) {
        searchOrdersInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#admin-orders-table tbody tr');
            rows.forEach(row => {
                const orderId = row.cells[0].textContent.toLowerCase();
                const customerName = row.cells[1].textContent.toLowerCase();
                if (orderId.includes(searchTerm) || customerName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }


    // --- Products Section ---
    const productCategories = ['electronics', 'fashion', 'accessories', 'beauty', 'home', 'other'];

    function loadProducts() {
        const productsTableBody = document.querySelector('#admin-products-table tbody');
        const noProductsMsg = document.getElementById('no-products-message');
        if (!productsTableBody || !noProductsMsg) return;

        const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        productsTableBody.innerHTML = '';
        
        if (products.length === 0) {
            noProductsMsg.style.display = 'block';
            productsTableBody.style.display = 'none';
        } else {
            noProductsMsg.style.display = 'none';
            productsTableBody.style.display = '';
            products.forEach(product => {
                const row = productsTableBody.insertRow();
                row.innerHTML = `
                    <td><img src="${product.image}" alt="${product.name}" class="product-image-thumbnail"></td>
                    <td>${product.name}</td>
                    <td>${formatPrice(product.price)}</td>
                    <td>${product.category}</td>
                    <td class="admin-table-actions">
                        <button class="admin-edit-btn" data-product-id="${product.id}"><i class='bx bxs-edit'></i> تعديل</button>
                        <button class="admin-delete-btn" data-product-id="${product.id}"><i class='bx bxs-trash-alt'></i> حذف</button>
                    </td>
                `;
            });
        }
        addProductEventListeners();
    }
    
    function addProductEventListeners(){
        document.querySelectorAll('.admin-edit-btn[data-product-id]').forEach(button => {
            button.addEventListener('click', function() {
                openProductForm(this.dataset.productId);
            });
        });
         document.querySelectorAll('.admin-delete-btn[data-product-id]').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
                    deleteProduct(this.dataset.productId);
                }
            });
        });
    }


    const addNewProductBtn = document.getElementById('add-new-product-btn');
    if (addNewProductBtn) {
        addNewProductBtn.addEventListener('click', () => openProductForm());
    }

    function openProductForm(productId = null) {
        const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        const product = productId ? products.find(p => p.id === productId) : null;
        const modalTitle = product ? 'تعديل المنتج' : 'إضافة منتج جديد';

        const formContent = `
            <form id="product-form" class="admin-modal-form">
                <input type="hidden" name="id" value="${product ? product.id : ''}">
                <div class="from-input-div">
                    <input type="text" name="name" class="form-input" placeholder=" " required value="${product ? product.name : ''}">
                    <label>اسم المنتج</label>
                </div>
                <div class="from-input-div">
                    <input type="number" name="price" class="form-input" placeholder=" " required step="0.01" value="${product ? product.price : ''}">
                    <label>السعر (دج)</label>
                </div>
                <div class="from-input-div">
                    <input type="text" name="image" class="form-input" placeholder=" " required value="${product ? product.image : ''}">
                    <label>رابط الصورة</label>
                </div>
                <div class="from-input-div from-input-div-select">
                    <select name="category" class="form-input" required>
                        <option value="" disabled ${!product ? 'selected' : ''}>اختر تصنيفًا</option>
                        ${productCategories.map(cat => `<option value="${cat}" ${product && product.category === cat ? 'selected' : ''}>${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`).join('')}
                    </select>
                    <label>التصنيف</label>
                </div>
                <div class="from-input-div">
                    <textarea name="description" class="form-input" placeholder=" " rows="4">${product ? product.description : ''}</textarea>
                    <label>وصف المنتج</label>
                </div>
            </form>
        `;
        const footerContent = `
            <button type="button" class="admin-btn admin-btn-secondary admin-close-modal-btn" data-modal-id="product-form-modal">إلغاء</button>
            <button type="submit" form="product-form" class="admin-btn admin-btn-primary">${product ? 'حفظ التعديلات' : 'إضافة المنتج'}</button>
        `;

        createModal('product-form-modal', modalTitle, formContent, footerContent, (modal) => {
             // Auto-fill labels logic for modal form
            modal.querySelectorAll('.form-input').forEach(input => {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    if (input.value.trim() !== '' || input.matches(':focus')) {
                        label.classList.add('active-label-admin'); // A temporary class to simulate :valid or :focus state
                    }
                    input.addEventListener('focus', () => label.classList.add('active-label-admin'));
                    input.addEventListener('blur', () => { if(input.value.trim() === '') label.classList.remove('active-label-admin'); });
                    input.addEventListener('input', () => { if(input.value.trim() !== '') label.classList.add('active-label-admin'); else label.classList.remove('active-label-admin'); });
                }
            });
            // Special handling for select
            const select = modal.querySelector('select.form-input');
            if (select) {
                const label = select.nextElementSibling;
                if (label && label.tagName === 'LABEL' && select.value) {
                     label.classList.add('active-label-admin');
                }
                 select.addEventListener('change', () => { if(label && select.value) label.classList.add('active-label-admin'); });
            }

            const form = modal.querySelector('#product-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                saveProduct(new FormData(this));
                closeModal('product-form-modal');
            });
        });
        openModal('product-form-modal');
    }
    
    function saveProduct(formData) {
        let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        const productData = {
            id: formData.get('id') || generateId(),
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            image: formData.get('image'),
            category: formData.get('category'),
            description: formData.get('description')
        };

        const existingIndex = products.findIndex(p => p.id === productData.id);
        if (existingIndex > -1) {
            products[existingIndex] = productData; // Update
        } else {
            products.push(productData); // Add new
        }
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        loadProducts();
        loadOverviewData(); // Update stats
    }

    function deleteProduct(productId) {
        let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        products = products.filter(p => p.id !== productId);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        loadProducts();
        loadOverviewData(); // Update stats
    }
    
    const searchProductsInput = document.getElementById('search-products');
    if(searchProductsInput) {
        searchProductsInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#admin-products-table tbody tr');
            rows.forEach(row => {
                const productName = row.cells[1].textContent.toLowerCase();
                const category = row.cells[3].textContent.toLowerCase();
                if (productName.includes(searchTerm) || category.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // --- Users Section (Simulated) ---
    let simulatedUsers = [
        { id: generateId(), name: 'أحمد علي', email: 'ahmed@example.com', role: 'Admin', joinedDate: new Date(2023, 0, 15).toISOString() },
        { id: generateId(), name: 'فاطمة الزهراء', email: 'fatima@example.com', role: 'Customer', joinedDate: new Date(2023, 2, 10).toISOString() },
        { id: generateId(), name: 'يوسف محمد', email: 'youssef@example.com', role: 'Customer', joinedDate: new Date(2023, 5, 22).toISOString() }
    ];
    const userRoles = ['Admin', 'Customer'];

    function loadUsers() {
        const usersTableBody = document.querySelector('#admin-users-table tbody');
        if (!usersTableBody) return;
        usersTableBody.innerHTML = '';
        simulatedUsers.forEach(user => {
            const row = usersTableBody.insertRow();
            row.innerHTML = `
                <td>${user.id.slice(-6)}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${formatDate(user.joinedDate).split(' ')[0]}</td>
                <td class="admin-table-actions">
                    <button class="admin-edit-btn" data-user-id="${user.id}"><i class='bx bxs-user-detail'></i> تعديل</button>
                    <button class="admin-delete-btn" data-user-id="${user.id}"><i class='bx bxs-user-x'></i> حذف</button>
                </td>
            `;
        });
        addUserEventListeners();
    }
    
    function addUserEventListeners() {
        document.querySelectorAll('#admin-users-table .admin-edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                openUserForm(this.dataset.userId);
            });
        });
        document.querySelectorAll('#admin-users-table .admin-delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم (محاكاة)؟')) {
                    deleteUser(this.dataset.userId);
                }
            });
        });
    }

    const addNewUserBtn = document.getElementById('add-new-user-btn');
    if(addNewUserBtn) {
        addNewUserBtn.addEventListener('click', () => openUserForm());
    }
    
    function openUserForm(userId = null) {
        const user = userId ? simulatedUsers.find(u => u.id === userId) : null;
        const modalTitle = user ? 'تعديل المستخدم (محاكاة)' : 'إضافة مستخدم جديد (محاكاة)';

        const formContent = `
            <form id="user-form" class="admin-modal-form">
                <input type="hidden" name="id" value="${user ? user.id : ''}">
                <div class="from-input-div">
                    <input type="text" name="name" class="form-input" placeholder=" " required value="${user ? user.name : ''}">
                    <label>الاسم الكامل</label>
                </div>
                <div class="from-input-div">
                    <input type="email" name="email" class="form-input" placeholder=" " required value="${user ? user.email : ''}">
                    <label>البريد الإلكتروني</label>
                </div>
                <div class="from-input-div from-input-div-select">
                    <select name="role" class="form-input" required>
                        ${userRoles.map(role => `<option value="${role}" ${user && user.role === role ? 'selected' : ''}>${role}</option>`).join('')}
                    </select>
                    <label>الدور</label>
                </div>
            </form>
        `;
        const footerContent = `
            <button type="button" class="admin-btn admin-btn-secondary admin-close-modal-btn" data-modal-id="user-form-modal">إلغاء</button>
            <button type="submit" form="user-form" class="admin-btn admin-btn-primary">${user ? 'حفظ التعديلات' : 'إضافة المستخدم'}</button>
        `;
        createModal('user-form-modal', modalTitle, formContent, footerContent, (modal) => {
             // Auto-fill labels logic
            modal.querySelectorAll('.form-input').forEach(input => {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    if (input.value.trim() !== '' || input.matches(':focus')) {
                        label.classList.add('active-label-admin');
                    }
                    input.addEventListener('focus', () => label.classList.add('active-label-admin'));
                    input.addEventListener('blur', () => { if(input.value.trim() === '') label.classList.remove('active-label-admin'); });
                    input.addEventListener('input', () => { if(input.value.trim() !== '') label.classList.add('active-label-admin'); else label.classList.remove('active-label-admin'); });

                }
            });
             const select = modal.querySelector('select.form-input');
            if (select) {
                const label = select.nextElementSibling;
                if (label && label.tagName === 'LABEL' && select.value) {
                     label.classList.add('active-label-admin');
                }
                 select.addEventListener('change', () => { if(label && select.value) label.classList.add('active-label-admin'); });
            }
            
            const form = modal.querySelector('#user-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                saveUser(new FormData(this));
                closeModal('user-form-modal');
            });
        });
        openModal('user-form-modal');
    }

    function saveUser(formData) {
        const userData = {
            id: formData.get('id') || generateId(),
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role'),
            joinedDate: formData.get('id') ? simulatedUsers.find(u=>u.id === formData.get('id')).joinedDate : new Date().toISOString()
        };
        const existingIndex = simulatedUsers.findIndex(u => u.id === userData.id);
        if (existingIndex > -1) {
            simulatedUsers[existingIndex] = userData;
        } else {
            simulatedUsers.push(userData);
        }
        loadUsers();
        loadOverviewData(); // Update stats
    }
    function deleteUser(userId) {
        simulatedUsers = simulatedUsers.filter(u => u.id !== userId);
        loadUsers();
        loadOverviewData(); // Update stats
    }
    
    const searchUsersInput = document.getElementById('search-users');
    if(searchUsersInput) {
        searchUsersInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#admin-users-table tbody tr');
            rows.forEach(row => {
                const userName = row.cells[1].textContent.toLowerCase();
                const email = row.cells[2].textContent.toLowerCase();
                if (userName.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Initial load for the default active section (Overview)
    loadOverviewData();

}); // End DOMContentLoaded
