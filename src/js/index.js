document.addEventListener('DOMContentLoaded', function() {
    const navBtnsMenu = document.getElementById('nav_btns_menu');
    const showNavMenu = document.getElementById('nav-toggle-i');
    const closeNavMenu = document.getElementById('close_nav_menu');

    if (showNavMenu && navBtnsMenu && closeNavMenu) {
        showNavMenu.addEventListener('click', function(){
            navBtnsMenu.classList.remove('hide');
            navBtnsMenu.classList.add('show');
        });

        closeNavMenu.addEventListener('click', function(){
            navBtnsMenu.classList.remove('show');
            navBtnsMenu.classList.add('hide');
        });
    }

    /*=========================================
                Draggable Carousel (index.html)
    ===========================================*/
    const carousel = document.getElementById('carousel-items');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('grabbing');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('grabbing');
        });
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('grabbing');
        });
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            carousel.scrollLeft = scrollLeft - walk;
        });
    }


    /*=========================================
                Image Gallery (single.html)
    ===========================================*/
    const galeryMainImg = document.getElementById('product-main-img');
    const galeryImgsContainer = document.getElementById('product-other-images');
    const galeryBtnL = document.querySelector('.galery-btn-left'); 
    const galeryBtnR = document.querySelector('.galery-btn-right'); 
    
    let currentImgIndexGallery = 0; 

    function updateGallery(index, newSrc = null) {
        if (!galeryMainImg || !galeryImgsContainer) return;
        const galeryImgs = Array.from(galeryImgsContainer.querySelectorAll('img'));
        let galeryLength = galeryImgs.length;

        if (newSrc) {
            galeryMainImg.src = newSrc;
            galeryMainImg.alt = "Product Image";
            if (galeryLength > 0 && galeryImgs[0]) {
                galeryImgs[0].src = newSrc.replace(/w=\d+&h=\d+/, 'w=100&h=100');
                galeryImgs[0].alt = "Product Thumbnail 1";
                currentImgIndexGallery = 0;
                galeryImgs.forEach(img => img.classList.remove('active-img'));
                galeryImgs[0].classList.add('active-img');
            }
            return; 
        }
        
        if (galeryLength === 0) return;
        
        if (index < 0) index = galeryLength - 1;
        if (index >= galeryLength) index = 0;
        currentImgIndexGallery = index;

        galeryImgs.forEach(img => {
            img.classList.remove('active-img');
            img.setAttribute('aria-current', 'false');
        });
        if(galeryImgs[currentImgIndexGallery]) { 
            galeryImgs[currentImgIndexGallery].classList.add('active-img');
            galeryImgs[currentImgIndexGallery].setAttribute('aria-current', 'true');
            galeryMainImg.src = galeryImgs[currentImgIndexGallery].src.replace('w=100&h=100', 'w=500&h=500'); 
            galeryMainImg.alt = galeryImgs[currentImgIndexGallery].alt || "Product Image";
        }
    }

    if (galeryMainImg && galeryImgsContainer) {
        const galeryImgs = Array.from(galeryImgsContainer.querySelectorAll('img'));
        
        function handleGalleryNav(direction) {
            if (galeryImgs.length === 0) return;
            if (direction === 'next') {
                updateGallery(currentImgIndexGallery + 1);
            } else if (direction === 'prev') {
                updateGallery(currentImgIndexGallery - 1);
            }
        }

        if (galeryBtnL) {
            galeryBtnL.addEventListener('click', () => handleGalleryNav('next'));
            galeryBtnL.addEventListener('keydown', (e) => {
                 if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleGalleryNav('next'); }
            });
        }
        if (galeryBtnR) {
            galeryBtnR.addEventListener('click', () => handleGalleryNav('prev'));
             galeryBtnR.addEventListener('keydown', (e) => {
                 if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleGalleryNav('prev'); }
            });
        }

        galeryImgs.forEach((img, index) => {
            img.addEventListener('click', function(){ updateGallery(index); });
             img.addEventListener('keydown', (e) => {
                 if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateGallery(index); }
            });
        });
        if(galeryImgs.length > 0) { updateGallery(0); } 
    }


    /*=========================================
                FAQ Accordion
    ===========================================*/
    function initFaqAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(button => {
            const answerId = button.getAttribute('aria-controls');
            const answer = document.getElementById(answerId);
            if (answer) {
                 if (button.getAttribute('aria-expanded') === 'true') {
                    answer.style.display = 'block';
                } else {
                    answer.style.display = 'none';
                }
            }

            button.addEventListener('click', () => {
                const answerId = button.getAttribute('aria-controls');
                const answer = document.getElementById(answerId);
                if (!answer) return;
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !isExpanded);
                answer.style.display = !isExpanded ? 'block' : 'none';
            });
        });
    }
    if (document.getElementById('faq_container')) { initFaqAccordion(); }
    
    /*=========================================
        Admin Order Data Storage
    ===========================================*/
    const ORDERS_KEY = 'lamlemAdminOrders'; // For admin panel

    function saveOrderForAdmin(orderDetails) {
        let adminOrders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
        adminOrders.push(orderDetails);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(adminOrders));
    }

    /*=========================================
        Single Product Page - Data Population & Order Summary (Simulation)
    ===========================================*/
    const productDetailsPageWrapper = document.getElementById('product-details-page-wrapper');
    if (productDetailsPageWrapper) {
        const productNameEl = document.getElementById('product-name');
        const productPriceEl = document.getElementById('product-price');
        const addButton = document.getElementById('codplugin_add_button');
        const removeButton = document.getElementById('codplugin_remove_button');
        const countButton = document.getElementById('codplugin_count_button');
        const summaryProductNameEl = document.getElementById('summary-product-name');
        const summaryProductPriceEl = document.getElementById('summary-product-price');
        const summaryShippingCostEl = document.getElementById('summary-shipping-cost');
        const summaryTotalPriceEl = document.getElementById('summary-total-price_modal'); // Corrected ID to match HTML
        const shippingMethodRadios = document.querySelectorAll('input[name="shipping_method"]');
        const productDescriptionTextEl = document.getElementById('product-description-text');
        const orderForm = document.getElementById('single-product-order-form');


        let quantity = 1;
        const maxQuantity = 10; 
        const minQuantity = 1;
        let baseProductPrice = 0;
        let currentProductImage = '';
        let currentProductNameForOrder = '';
        let shippingCost = 500; 

        function populateProductDetailsFromURL() {
            const params = new URLSearchParams(window.location.search);
            const name = params.get('name');
            const price = params.get('price');
            const image = params.get('image');
            const description = params.get('description') || `هذا هو الوصف التفصيلي للمنتج ${decodeURIComponent(name || '')}. هنا يمكنك إضافة معلومات حول ميزات المنتج، المواد المستخدمة، طريقة الاستخدام، وأي تفاصيل أخرى قد تهم العميل.`;

            currentProductNameForOrder = decodeURIComponent(name || 'منتج غير معروف');
            if (name && productNameEl) productNameEl.textContent = decodeURIComponent(name);
            if (price && productPriceEl) {
                baseProductPrice = parseFloat(price) || 0;
                productPriceEl.textContent = `${baseProductPrice.toLocaleString('fr-DZ')} دج`;
                productPriceEl.dataset.priceValue = baseProductPrice;
            }
            if (productDescriptionTextEl) {
                 productDescriptionTextEl.textContent = decodeURIComponent(description);
            }

            if (image && typeof updateGallery === 'function') {
                currentProductImage = decodeURIComponent(image);
                updateGallery(-1, currentProductImage); 
            } else if (typeof updateGallery === 'function') {
                 updateGallery(0);
                 if(galeryMainImg) currentProductImage = galeryMainImg.src;
            }
            updateOrderSummary(); 
        }
        
        function updateOrderSummary() {
            if (!productNameEl || !summaryProductNameEl || !summaryProductPriceEl || !summaryShippingCostEl || !summaryTotalPriceEl || !countButton ) return;
            
            const currentProductNameText = productNameEl.textContent.trim();
            
            let summaryQuantityDisplay = summaryProductNameEl.querySelector('.form-sumary-section-qte-label');
            if (!summaryQuantityDisplay) { 
                summaryQuantityDisplay = document.createElement('span');
                summaryQuantityDisplay.className = 'form-sumary-section-qte-label';
                summaryProductNameEl.prepend(summaryQuantityDisplay); 
                if (summaryProductNameEl.childNodes.length > 1 && summaryProductNameEl.childNodes[1].nodeType === Node.TEXT_NODE) {
                    summaryProductNameEl.insertBefore(document.createTextNode(' '), summaryProductNameEl.childNodes[1]);
                } else {
                    summaryProductNameEl.appendChild(document.createTextNode(' '));
                }
            }
            summaryQuantityDisplay.textContent = `x${quantity}`;
            
            let textNodeFound = false;
            for (let i = 0; i < summaryProductNameEl.childNodes.length; i++) {
                if (summaryProductNameEl.childNodes[i].nodeType === Node.TEXT_NODE && summaryProductNameEl.childNodes[i] !== summaryQuantityDisplay) {
                    summaryProductNameEl.childNodes[i].textContent = ` ${currentProductNameText}`; 
                    textNodeFound = true;
                    break;
                }
            }
            if (!textNodeFound) { 
                summaryProductNameEl.appendChild(document.createTextNode(` ${currentProductNameText}`));
            }

            summaryProductPriceEl.textContent = `${baseProductPrice.toLocaleString('fr-DZ')} دج`;
            const selectedShippingMethod = document.querySelector('input[name="shipping_method"]:checked');
            if (selectedShippingMethod && selectedShippingMethod.dataset.cost) {
                shippingCost = parseFloat(selectedShippingMethod.dataset.cost) || 0;
            }
            summaryShippingCostEl.textContent = `${shippingCost.toLocaleString('fr-DZ')} دج`;
            const totalPrice = (baseProductPrice * quantity) + shippingCost;
            summaryTotalPriceEl.textContent = `${totalPrice.toLocaleString('fr-DZ')} دج`;
        }

        function updateQuantityDisplay() {
            if (countButton) countButton.textContent = quantity;
            updateOrderSummary();
        }

       if (addButton && removeButton && countButton) {
            addButton.addEventListener('click', () => { if (quantity < maxQuantity) { quantity++; updateQuantityDisplay(); } });
            addButton.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (quantity < maxQuantity) { quantity++; updateQuantityDisplay(); } } });
            removeButton.addEventListener('click', () => { if (quantity > minQuantity) { quantity--; updateQuantityDisplay(); } });
            removeButton.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (quantity > minQuantity) { quantity--; updateQuantityDisplay(); } } });
        }
        shippingMethodRadios.forEach(radio => radio.addEventListener('change', updateOrderSummary));
        populateProductDetailsFromURL(); 
        updateQuantityDisplay(); 
    }

    /*=========================================
                Wilaya/City Selectors
    ===========================================*/
    var cities = { 
        "DZ-01": ["Adrar", "Tamest", "Reggane"], "DZ-02": ["Chlef", "Tenes", "El Karimia"], "DZ-03": ["Laghouat", "Aflou", "Ain Mahdi"],
        "DZ-04": ["Oum El Bouaghi", "Ain Beida", "Ainmlila"], "DZ-05": ["Batna", "Barika", "Arris"], "DZ-06": ["Bejaia", "Akbou", "Kherrata"],
        "DZ-07": ["Biskra", "Tolga", "Sidi Okba"], "DZ-08": ["Bechar", "Taghit", "Beni Ounif"], "DZ-09": ["Blida", "Boufarik", "Larbaa"],
        "DZ-10": ["Bouira", "Lakhdaria", "Ain Bessam"], "DZ-11": ["Tamanghasset", "Idles"], "DZ-12": ["Tebessa", "Cheria", "Bir El Ater"],
        "DZ-13": ["Tlemcen", "Maghnia", "Ghazaouet"], "DZ-14": ["Tiaret", "Sougueur", "Frenda"], "DZ-15": ["Tizi Ouzou", "Azazga", "Draa El Mizan"],
        "DZ-16": ["Alger Centre", "Bab El Oued", "El Harrach"], "DZ-17": ["Djelfa", "Hassi Bahbah", "Ain Oussera"], "DZ-18": ["Jijel", "Taher", "El Milia"],
        "DZ-19": ["Setif", "El Eulma", "Ain Oulmane"], "DZ-20": ["Saida", "Ain El Hadjar", "Youb"], "DZ-21": ["Skikda", "Collo", "El Harrouch"],
        "DZ-22": ["Sidi Bel Abbes", "Telagh", "Sfissef"], "DZ-23": ["Annaba", "El Bouni", "Berrahel"], "DZ-24": ["Guelma", "Oued Zenati", "Hammam Maskhoutine"],
        "DZ-25": ["Constantine", "El Khroub", "Hamma Bouziane"], "DZ-26": ["Medea", "Berrouaghia", "Ksar El Boukhari"], "DZ-27": ["Mostaganem", "Sidi Ali", "Ain Tadles"],
        "DZ-28": ["Msila", "Bou Saada", "Sidi Aissa"], "DZ-29": ["Mascara", "Mohammadia", "Sig"], "DZ-30": ["Ouargla", "Hassi Messaoud", "Touggourt (old, see 55)"],
        "DZ-31": ["Oran", "Es Senia", "Arzew"], "DZ-32": ["El Bayadh", "Bougtoub", "El Abiodh Sidi Cheikh"], "DZ-33": ["Illizi", "In Amenas"], "DZ-34": ["Bordj Bou Arreridj", "Ras El Oued", "Mansoura"],
        "DZ-35": ["Boumerdes", "Bordj Menaiel", "Dellys"], "DZ-36": ["El Tarf", "El Kala", "Drean"], "DZ-37": ["Tindouf", "Oum El Assel"], "DZ-38": ["Tissemsilt", "Theniet El Had", "Lardjem"],
        "DZ-39": ["El Oued", "Guemar", "Robbah"], "DZ-40": ["Khenchela", "Kais", "Bouhmama"], "DZ-41": ["Souk Ahras", "Sedrata", "Mdaourouche"],
        "DZ-42": ["Tipaza", "Cherchel", "Hadjout"], "DZ-43": ["Mila", "Chelghoum Laid", "Ferdjioua"], "DZ-44": ["Ain Defla", "Miliana", "Khemis Miliana"],
        "DZ-45": ["Naama", "Mechria", "Ain Sefra"], "DZ-46": ["Ain Temouchent", "Beni Saf", "Hammam Bouhadjar"], "DZ-47": ["Ghardaia", "Metlili", "Berriane"],
        "DZ-48": ["Relizane", "Oued Rhiou", "Ammi Moussa"], "DZ-49": ["Timimoun", "Charouine", "Ouled Said"], "DZ-50": ["B Badji Mokhtar", "Timiaouine"],
        "DZ-51": ["Ouled Djellal", "Sidi Khaled", "Doucen"], "DZ-52": ["Beni Abbes", "Kerzaz", "El Ouata"], "DZ-53": ["In Salah", "In Ghar"],
        "DZ-54": ["In Guezzam", "Tinzaouatine"], "DZ-55": ["Touggourt", "Temacine", "Megarine"], "DZ-56": ["Djanet", "Bordj El Haouasse"],
        "DZ-57": ["El-mghair", "Djamaa", "Still"], "DZ-58": ["El Meniaa", "Hassi Gara"]
    };
    function setupWilayaCityDropdown(stateSelectId, citySelectId) {
        const stateSelect = document.getElementById(stateSelectId);
        const citySelect = document.getElementById(citySelectId);
        if (stateSelect && citySelect && typeof cities !== 'undefined') {
            stateSelect.addEventListener('change', function() {
                const selectedStateCode = this.value;
                const selectedCities = cities['DZ-' + selectedStateCode] || [];
                citySelect.innerHTML = '<option value="" disabled selected></option>'; 
                selectedCities.forEach(function(city) {
                    const option = document.createElement('option');
                    option.value = city.toLowerCase().replace(/\s+/g, '-'); 
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                 citySelect.disabled = selectedCities.length === 0;
                 if(selectedCities.length > 0) citySelect.value = ""; 
            });
        }
    }
    // Setup for single.html
    setupWilayaCityDropdown('codplugin_state', 'codplugin_city');
    // Setup for checkout modal on cart.html
    setupWilayaCityDropdown('modal_codplugin_state', 'modal_codplugin_city');


    /*=========================================
                Shop Page Sorting and Filtering
    ===========================================*/
    const shopPageContentArea = document.getElementById('shop_page_content_area');
    if (shopPageContentArea) {
        const sortSelect = document.getElementById('sort-by');
        const categoryFilterButtons = document.querySelectorAll('.category-filter-btn');
        const cardsContainer = document.getElementById('cards_container');
        
        if (cardsContainer) { 
            const productCardElements = Array.from(cardsContainer.querySelectorAll('.card'));
            let products = productCardElements.map(card => {
                const priceText = card.querySelector('.card-price')?.textContent || '0';
                const price = parseFloat(priceText.replace(/[^0-9.-]+/g, "")) || 0;
                return {
                    element: card,
                    name: card.dataset.productName || card.querySelector('.card_title')?.textContent.trim() || '',
                    price: price,
                    category: card.dataset.category || 'all',
                };
            });

            function sortProducts(criteria) {
                switch (criteria) {
                    case 'price-asc': products.sort((a, b) => a.price - b.price); break;
                    case 'price-desc': products.sort((a, b) => b.price - a.price); break;
                    case 'name-asc': products.sort((a, b) => a.name.localeCompare(b.name, 'ar')); break;
                    case 'name-desc': products.sort((a, b) => b.name.localeCompare(a.name, 'ar')); break;
                    case 'default':
                    default:
                        const allCardsInDOM = Array.from(cardsContainer.querySelectorAll('.card'));
                        products = allCardsInDOM.map(card => {
                            const priceText = card.querySelector('.card-price')?.textContent || '0';
                            const price = parseFloat(priceText.replace(/[^0-9.-]+/g, "")) || 0;
                            return {
                                element: card,
                                name: card.dataset.productName || card.querySelector('.card_title')?.textContent.trim() || '',
                                price: price,
                                category: card.dataset.category || 'all',
                            };
                        });
                        const activeFilter = document.querySelector('.category-filter-btn.active');
                        if (activeFilter) filterProducts(activeFilter.dataset.category, false); 
                        break;
                }
                renderProductsDOM();
            }

            function filterProducts(category, shouldRender = true) {
                products.forEach(product => {
                    if (category === 'all' || product.category === category) {
                        product.element.classList.remove('hidden');
                        product.element.style.display = ''; 
                    } else {
                        product.element.classList.add('hidden');
                        product.element.style.display = 'none';
                    }
                });
                if (shouldRender) {
                    const currentSortCriteria = sortSelect ? sortSelect.value : 'default';
                    if (currentSortCriteria !== 'default') {
                        let visibleProducts = products.filter(p => !p.element.classList.contains('hidden'));
                        let hiddenProducts = products.filter(p => p.element.classList.contains('hidden'));
                        switch (currentSortCriteria) {
                            case 'price-asc': visibleProducts.sort((a, b) => a.price - b.price); break;
                            case 'price-desc': visibleProducts.sort((a, b) => b.price - a.price); break;
                            case 'name-asc': visibleProducts.sort((a, b) => a.name.localeCompare(b.name, 'ar')); break;
                            case 'name-desc': visibleProducts.sort((a, b) => b.name.localeCompare(a.name, 'ar')); break;
                        }
                        const tempProductsForRender = [...visibleProducts, ...hiddenProducts];
                        renderGivenProducts(tempProductsForRender);
                    } else {
                         renderProductsDOM(); 
                    }
                }
            }
            
            function renderProductsDOM() {
                if (!cardsContainer) return;
                const fragment = document.createDocumentFragment();
                products.forEach(product => fragment.appendChild(product.element));
                cardsContainer.innerHTML = ''; 
                cardsContainer.appendChild(fragment); 
            }
            
            function renderGivenProducts(productsToRender) {
                 if (!cardsContainer) return;
                const fragment = document.createDocumentFragment();
                productsToRender.forEach(product => fragment.appendChild(product.element));
                cardsContainer.innerHTML = '';
                cardsContainer.appendChild(fragment);
            }

            if (sortSelect) sortSelect.addEventListener('change', (event) => sortProducts(event.target.value));
            if (categoryFilterButtons.length > 0) {
                categoryFilterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const selectedCategory = button.dataset.category;
                        categoryFilterButtons.forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-pressed', 'false'); });
                        button.classList.add('active');
                        button.setAttribute('aria-pressed', 'true');
                        filterProducts(selectedCategory);
                    });
                });
            }
        }
    }

    /*=========================================
                Shopping Cart Functionality
    ===========================================*/
    const CART_KEY = 'shoppingCartLamLem';

    function getCart() {
        const cartJson = localStorage.getItem(CART_KEY);
        return cartJson ? JSON.parse(cartJson) : [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateHeaderCartCounter();
    }

    function addToCart(productDetails) {
        let cart = getCart();
        if (!productDetails || typeof productDetails.id !== 'string' || productDetails.id.trim() === '' || 
            typeof productDetails.name !== 'string' || productDetails.name.trim() === '' ||
            typeof productDetails.price !== 'number' || isNaN(productDetails.price) ||
            typeof productDetails.quantity !== 'number' || isNaN(productDetails.quantity) || productDetails.quantity <= 0) {
            console.error("Invalid product details for addToCart:", productDetails);
            alert("خطأ: لا يمكن إضافة المنتج، تفاصيل المنتج غير صالحة أو ناقصة.");
            return;
        }

        const existingProductIndex = cart.findIndex(item => item.id === productDetails.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += productDetails.quantity;
        } else {
            cart.push(productDetails);
        }
        saveCart(cart);
        alert(`"${productDetails.name}" ${existingProductIndex > -1 ? 'تم تحديث الكمية' : 'أضيف إلى السلة'}!`);
    }

    function removeFromCart(productId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        if (document.getElementById('cart_page_content')) {
             renderCartPage(); 
        }
    }

    function updateCartItemQuantity(productId, newQuantity) {
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (newQuantity > 0) {
                cart[itemIndex].quantity = newQuantity;
            } else { 
                cart.splice(itemIndex, 1); 
            }
            saveCart(cart);
            if (document.getElementById('cart_page_content')) renderCartPage();
        }
    }

    function clearCart() {
        saveCart([]);
        if (document.getElementById('cart_page_content')) renderCartPage();
        // alert('تم مسح سلة التسوق.'); // Alert moved to form submission in modal
    }

    function calculateCartTotalUniqueItems() {
        const cart = getCart();
        return cart.length; 
    }

    function updateHeaderCartCounter() {
        const cartCounterBadge = document.getElementById('cart-counter-badge');
        if (cartCounterBadge) {
            cartCounterBadge.textContent = calculateCartTotalUniqueItems();
        }
    }
    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const cardElement = this.closest('.card');
            const productName = this.dataset.productName || cardElement?.querySelector('.card_title')?.textContent.trim();
            const productPriceStr = this.dataset.productPrice;
            const productImage = this.dataset.productImage;
    
            if (!productName || !productPriceStr || !productImage) {
                console.error("Card AddToCart Click: Missing data attributes", { 
                    name: productName, price: productPriceStr, image: productImage, button: this 
                });
                alert("خطأ: بيانات المنتج غير مكتملة على البطاقة.");
                return;
            }
    
            const productPrice = parseFloat(productPriceStr);
    
            if (productName.trim() === '' || isNaN(productPrice)) {
                console.error("Card AddToCart Click: Invalid product data", { productName, productPrice, productImage });
                alert("خطأ: بيانات المنتج غير صالحة على البطاقة.");
                return;
            }
            
            const pageLink = `single.html?name=${encodeURIComponent(productName)}&price=${productPrice}&image=${encodeURIComponent(productImage)}`;
            
            const product = {
                id: productName, 
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1, 
                pageLink: pageLink
            };
            addToCart(product);
        });
    });
    
    const singlePageAddToCartBtn = document.getElementById('single-page-add-to-cart-btn');
    if (singlePageAddToCartBtn) {
        singlePageAddToCartBtn.addEventListener('click', function() {
            const productNameEl = document.getElementById('product-name');
            const productPriceEl = document.getElementById('product-price');
            const productMainImgEl = document.getElementById('product-main-img');
            const quantityEl = document.getElementById('codplugin_count_button');

            if (productNameEl && productPriceEl && productMainImgEl && quantityEl) {
                const productName = productNameEl.textContent.trim();
                const productPrice = parseFloat(productPriceEl.dataset.priceValue);
                const productImage = productMainImgEl.src; 
                const productQuantity = parseInt(quantityEl.textContent) || 1;

                if (!productName || productName.trim() === '' || isNaN(productPrice) || !productImage || isNaN(productQuantity) || productQuantity <= 0) {
                     console.error("Missing or invalid product data on single page for AddToCart.");
                     alert("خطأ: لا يمكن إضافة المنتج، بيانات المنتج غير متوفرة أو غير صالحة.");
                     return;
                }
                const product = {
                    id: productName,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: productQuantity,
                    pageLink: window.location.href
                };
                addToCart(product);
            } else {
                console.error("Single page AddToCart: Could not find all required elements.");
                alert("خطأ: تعذر العثور على عناصر المنتج في الصفحة.");
            }
        });
    }
    
    function renderCartPage() {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartSubtotalEl = document.getElementById('cart-subtotal');
        const emptyCartMessageEl = document.getElementById('empty-cart-message');
        const cartSummarySection = document.getElementById('cart-summary-section');

        if (!cartItemsContainer || !cartSubtotalEl || !emptyCartMessageEl || !cartSummarySection) return;

        const cart = getCart();
        cartItemsContainer.innerHTML = ''; 

        let subtotal = 0; 
        if (cart.length === 0) {
            emptyCartMessageEl.style.display = 'block';
            cartSummarySection.style.display = 'none';
        } else {
            emptyCartMessageEl.style.display = 'none';
            cartSummarySection.style.display = ''; 

            cart.forEach(item => {
                const itemTotalPrice = item.price * item.quantity;
                subtotal += itemTotalPrice;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="cart-item-image">
                        <a href="${item.pageLink || '#'}"><img src="${item.image}" alt="${item.name}"></a>
                    </div>
                    <div class="cart-item-details">
                        <a href="${item.pageLink || '#'}" class="cart-item-name">${item.name}</a>
                        <p class="cart-item-price">${item.price.toLocaleString('fr-DZ')} دج</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-decrease" data-id="${item.id}" aria-label="إنقاص الكمية لـ ${item.name}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-increase" data-id="${item.id}" aria-label="زيادة الكمية لـ ${item.name}">+</button>
                    </div>
                    <p class="cart-item-total-price">${itemTotalPrice.toLocaleString('fr-DZ')} دج</p>
                    <div class="cart-item-remove">
                        <button class="remove-item-btn" data-id="${item.id}" aria-label="إزالة ${item.name} من السلة"><i class='bx bx-trash'></i></button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        
        cartSubtotalEl.textContent = `${subtotal.toLocaleString('fr-DZ')} دج`; 

        document.querySelectorAll('.quantity-decrease').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const currentItem = getCart().find(cartItem => cartItem.id === itemId);
                if (currentItem) updateCartItemQuantity(itemId, currentItem.quantity - 1);
            });
        });
        document.querySelectorAll('.quantity-increase').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const currentItem = getCart().find(cartItem => cartItem.id === itemId);
                if (currentItem) updateCartItemQuantity(itemId, currentItem.quantity + 1);
            });
        });
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('هل أنت متأكد أنك تريد إزالة هذا المنتج من السلة؟')) {
                    removeFromCart(this.dataset.id);
                }
            });
        });
    }

    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد أنك تريد مسح جميع المنتجات من السلة؟')) {
                clearCart();
                 alert('تم مسح سلة التسوق.');
            }
        });
    }

    updateHeaderCartCounter(); 
    if (document.getElementById('cart_page_content')) { 
        renderCartPage();
    }

    /*=========================================
                Checkout Modal Functionality (on Cart Page)
    ===========================================*/
    const checkoutModal = document.getElementById('checkout-modal');
    const proceedToCheckoutBtn = document.getElementById('proceed-to-checkout-btn');
    const closeModalBtn = document.querySelector('#checkout-modal .close-modal-btn');
    const checkoutModalForm = document.getElementById('checkout-modal-form');

    let basePriceModalCheckout = 0;
    let shippingCostModalCheckout = 500; 

    function populateCheckoutModalForm() {
        const cart = getCart();
        const formSummaryProductListEl = document.getElementById('checkout-form-summary-product-list_modal');
        const summaryShippingCostEl = document.getElementById('summary-shipping-cost_modal');
        const summaryTotalPriceEl = document.getElementById('summary-total-price_modal');
        const shippingMethodRadiosModal = document.querySelectorAll('#checkout-modal input[name="shipping_method_modal"]');

        if (!formSummaryProductListEl || !summaryShippingCostEl || !summaryTotalPriceEl) {
            console.error("Checkout modal critical summary elements not found.");
            return;
        }

        formSummaryProductListEl.innerHTML = ''; // Clear previous items

        if (cart.length === 0) {
            // This case should ideally be handled before opening the modal
            basePriceModalCheckout = 0;
            updateCheckoutModalFormSummary(); // Update totals to show 0
            return;
        }

        // Populate detailed product list INSIDE the form's summary
        cart.forEach(item => {
            const summaryItemDiv = document.createElement('div');
            summaryItemDiv.classList.add('summary-product-item');
            summaryItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="summary-product-image">
                <div class="summary-product-details">
                    <span class="summary-product-name-text">${item.name}</span>
                    <span class="summary-product-quantity-text">x${item.quantity}</span>
                </div>
                <span class="summary-product-line-price">${(item.price * item.quantity).toLocaleString('fr-DZ')} دج</span>
            `;
            formSummaryProductListEl.appendChild(summaryItemDiv);
        });

        basePriceModalCheckout = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        updateCheckoutModalFormSummary();

        shippingMethodRadiosModal.forEach(radio => {
            // Remove old listeners to prevent multiple attachments if modal is opened multiple times
            const newRadio = radio.cloneNode(true);
            radio.parentNode.replaceChild(newRadio, radio);
            newRadio.addEventListener('change', function() {
                if (this.checked && this.dataset.cost) {
                    shippingCostModalCheckout = parseFloat(this.dataset.cost);
                }
                updateCheckoutModalFormSummary();
            });
        });
         // Ensure default shipping cost is applied correctly on first load
        const defaultSelectedShipping = document.querySelector('#checkout-modal input[name="shipping_method_modal"]:checked');
        if (defaultSelectedShipping && defaultSelectedShipping.dataset.cost) {
            shippingCostModalCheckout = parseFloat(defaultSelectedShipping.dataset.cost);
        }
        updateCheckoutModalFormSummary();
    }

    function updateCheckoutModalFormSummary() {
        const summaryShippingCostEl = document.getElementById('summary-shipping-cost_modal');
        const summaryTotalPriceEl = document.getElementById('summary-total-price_modal');

        if (!summaryShippingCostEl || !summaryTotalPriceEl) return;

        summaryShippingCostEl.textContent = `${shippingCostModalCheckout.toLocaleString('fr-DZ')} دج`;
        const totalPrice = basePriceModalCheckout + shippingCostModalCheckout;
        summaryTotalPriceEl.textContent = `${totalPrice.toLocaleString('fr-DZ')} دج`;
    }

    function openCheckoutModal() {
        const cart = getCart();
        if (cart.length === 0) {
            alert("سلة التسوق فارغة! يرجى إضافة منتجات أولاً.");
            return;
        }
        if (checkoutModal) {
            populateCheckoutModalForm();
            checkoutModal.style.display = 'flex';
            // Reset form fields
            if (checkoutModalForm) checkoutModalForm.reset();
            // Manually trigger change on state dropdown to reset city dropdown if needed
            const modalStateSelect = document.getElementById('modal_codplugin_state');
            if (modalStateSelect) {
                const event = new Event('change');
                modalStateSelect.dispatchEvent(event);
            }

        }
    }

    function closeCheckoutModal() {
        if (checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    }

    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', openCheckoutModal);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCheckoutModal);
    }
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(event) {
            if (event.target === checkoutModal) { // Clicked on overlay
                closeCheckoutModal();
            }
        });
    }
    if (checkoutModalForm) {
        checkoutModalForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('تم إرسال طلب الشراء لكامل السلة (محاكاة). سيتم الآن مسح السلة.');
            clearCart(); // Clear the cart after "successful" simulated order
            closeCheckoutModal();
            renderCartPage(); // Re-render cart page to show it's empty
        });
    }

}); // End DOMContentLoaded