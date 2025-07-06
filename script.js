document.addEventListener('DOMContentLoaded', () => {
   
    const productGrid = document.getElementById('productGrid');
    const toggleCartBtn = document.getElementById('toggleCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItemsList = document.getElementById('cartItems');
    const cartCountSpan = document.getElementById('cartCount');
    const cartTotalSpan = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const authBtn = document.getElementById('authBtn'); 
    const authModal = document.getElementById('authModal'); 
    const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
    const authModalTitle = document.getElementById('authModalTitle');

    const loginSection = document.getElementById('loginSection');
    const loginForm = document.getElementById('loginForm');
    const loginUsernameInput = document.getElementById('loginUsername');
    const loginPasswordInput = document.getElementById('loginPassword');
    const showSignupBtn = document.getElementById('showSignupBtn');

    const signupSection = document.getElementById('signupSection');
    const signupForm = document.getElementById('signupForm');
    const signupUsernameInput = document.getElementById('signupUsername');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const showLoginBtn = document.getElementById('showLoginBtn');

    const messageToast = document.getElementById('messageToast');
    const toastText = document.getElementById('toastText'); 

    let cart = []; 
    let isCartOpen = false; 
    let isLoggedIn = false; 
    
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || {}; 
    
    const products = [
        {
            id: 1,
            name: 'Asian Paints Apex Ultima Bucket (20L)',
            price: 9999.00,
            imageUrl: 'https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-ultima-asian-paints.png', 
            description: 'Premium exterior emulsion for ultimate protection and beauty. Experience vibrant colors and a long-lasting finish from Asian Paints.'
        },
        {
            id: 2,
            name: 'Asian Paints Royale Luxery Emultion (20L)',
            price: 3499.00,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWqTdj4RZ2T_yu1_OSL7z143ujuJjyhxWCQ&s', 
            description: 'Asian Paints Royale Luxury Emulsion is known for its luxurious finish and high durability It Has A Technology Called Teflon.'

        },
        {
            id: 3,
            name: 'Asian Paints Tractor Emulsion (20L)',
            price: 2499.00,
            imageUrl: 'https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-emulsion-asian-paints.png', 
            description: 'Economical interior paint providing a smooth and matt finish. Perfect for budget-friendly makeovers with Asian Paints reliability.'
        },
        {
            id: 4,
            name: 'Asian Paints Damp Proof (20L)',
            price: 4999.00,
            imageUrl: 'https://www.asianpaints.com/content/dam/asian_paints/products/packshots/SC-dampproof.png', 
            description: 'Asian Paints SmartCare Damp Proof is a fiber reinforced elastomeric liquid applied water proofing membrane. '
        },
        {
            id: 5,
            name: 'Asian Paints SmartCare Damp Sheath (20L)',
            price: 1299.00,
            imageUrl: 'https://www.asianpaints.com/content/dam/asian_paints/products/packshots/sc-Dampsheath-exterior-new.png', 
            description: 'Waterproofing solution for interior and exterior surfaces. Protects against efflorescence and damp walls, part of Asian Paints SmartCare.We Sell Both Interior And Exterior'
        },
        {
            id: 6,
            name: 'Asian Paints Apcolite Premium Gloss (1L-20L)',
            price: 5000.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/metals-apcolite-premium-gloss-enamel-asian-paints.png', 
            description: 'High-gloss enamel paint for wood, metal, and masonry. Offers a tough, durable, and mirror-like finish from Asian Paints Apcolite' 
        },
        {
            id: 7,
            name: 'Asian Paints TruCare Interior Wall Primer - Water Thinnable (20L)',
            price: 1999.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/0360.png', 
            description: 'Water-based interior wall primer ensuring excellent adhesion and a smooth base for topcoats. A vital step from Asian Paints TruCare.'
        },
        {
            id: 8,
            name: 'Asian Paints Tractor Uno (20Kg)',
            price: 850.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-uno-asian-paints.png', 
            description: 'Having a beautiful home at an affordable price is no more a dream. This water-based acrylic distemper from Asian Paints has 900+ shades to choose from to make sure you get a home in the colour of your choice. Moreover, Tractor Uno is a washable, lead-free paint with a stylish matt finish.'
        },
        {
            id: 9,
            name: 'Asian Paints Damp Proof Advanced (20L)',
            price: 3800.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/DP-Advanced-Packshot.png', 
            description: 'Formulated with select elastomeric and resilient acrylic polymers and reinforcing polyester fibers, Damp Proof Advanced provides superior whiteness & unmatched waterproofing to Terraces & Exterior walls.'
        },
        {
            id: 10,
            name: 'Asian Paints Damp Proof Xtreme (20L)',
            price: 2950.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/SC-dampproof-xtreme-new.png', 
            description: 'To protect your homes from leakage by extreme rains, Asian Paints brings to you SmartCare Damp Proof Xtreme with Triple Flex-Armour Layer which offers 12 years of waterproofing warranty on terraces and exterior walls.'
        },
        {
            id: 11,
            name: 'Sand Papers',
            price: 1100.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/Tools/sand-paper-spotlight-asian-paints.jpeg', 
            description: 'We Provide You With Many Of the sandpapers quality , grit whether you want just call us and tell us which grit sandpaper do you want'
        },
        {
            id: 12,
            name: 'Asian Paints Tools **Note- Price May Vary**',
            price:  5000.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/Tools/landing-page/mechanized-eq/uipment-trucare-wall-sander-asian-paints.jpeg', 
            description: 'We Have Many Types Of Asian Paints Tools , Whether It Comes to Brush Or Rollers , Sanding Machine , Putty Mixer , Spray Gun , etc you can get any of the asian paints tools you can book your asian paints tools by just calling us :)' 
        }
        ];


    /**
     
     * @param {string} message 
     * @param {number} duration 
     */
    const showToast = (message, duration = 3000) => {
        toastText.textContent = message; 
        messageToast.classList.add('show'); 
        setTimeout(() => {
            messageToast.classList.remove('show'); 
        }, duration);
    };

    
    const renderProducts = () => {
        productGrid.innerHTML = ''; 
        products.forEach(product => {
            const productCard = document.createElement('div');
            
            productCard.className = 'product-card bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-xl';
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="w-36 h-36 object-cover rounded-full mb-4 border-4 border-blue-500 product-image"
                    onerror="this.onerror=null; this.src='https://placehold.co/150x150/000000/FFFFFF?text=Image+Error'; console.error('Image failed to load: ${product.imageUrl}');" />
                <h3 class="text-2xl font-semibold text-blue-200 mb-2 text-center">${product.name}</h3>
                <p class="text-gray-300 text-center mb-3 flex-grow">${product.description}</p>
                <p class="text-xl font-bold text-green-400 mb-4">₹${product.price.toFixed(2)}</p>
                <button class="add-to-cart-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400" data-product-id="${product.id}">
                    Add to Cart
                </button>
            `;
            
            productCard.querySelector('.add-to-cart-button').addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.productId); 
                const productToAdd = products.find(p => p.id === productId); 
                if (productToAdd) {
                    addToCart(productToAdd); 
                }
            });
            productGrid.appendChild(productCard); 
        });
    };

    /**
     * @param {Object} productToAdd 
     */
    const addToCart = (productToAdd) => {
        const existingItem = cart.find(item => item.product.id === productToAdd.id);

        if (existingItem) {
            existingItem.quantity++; 
            showToast(`Increased ${productToAdd.name} quantity.`);
        } else {
            cart.push({ product: productToAdd, quantity: 1 }); 
            showToast(`Added ${productToAdd.name} to cart!`);
        }
        renderCart(); 
    };

    /**
     * @param {number} productId 
     */
    const removeFromCart = (productId) => {
        const itemToRemove = cart.find(item => item.product.id === productId);
        if (itemToRemove) {
            cart = cart.filter(item => item.product.id !== productId); 
            showToast(`Removed ${itemToRemove.product.name} from cart.`);
            renderCart(); 
        }
    };

    /**
     * @param {number} productId 
     * @param {number} change - 
     */
    const updateQuantity = (productId, change) => {
        const itemToUpdate = cart.find(item => item.product.id === productId);
        if (itemToUpdate) {
            itemToUpdate.quantity += change; 
            if (itemToUpdate.quantity <= 0) {
                removeFromCart(productId); 
            } else {
                showToast(`Updated ${itemToUpdate.product.name} quantity.`);
                renderCart(); 
            }
        }
    };

    /**
     * @returns {string} 
     */
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };

    /**
     */
    const renderCart = () => {
        cartItemsList.innerHTML = ''; 

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'flex'; 
            cartTotalSpan.textContent = '₹0.00'; 
        } else {
            emptyCartMessage.style.display = 'none'; 
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
               
                cartItemDiv.className = 'flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-4 shadow-md';
                cartItemDiv.innerHTML = `
                    <img src="${item.product.imageUrl}" alt="${item.product.name}" class="w-16 h-16 object-cover rounded-md mr-4 border border-blue-500" />
                    <div class="flex-grow">
                        <h4 class="text-lg font-semibold text-blue-200">${item.product.name}</h4>
                        <p class="text-gray-300">₹${(item.product.price * item.quantity).toFixed(2)}</p>
                        <div class="flex items-center mt-2">
                            <button class="bg-blue-600 hover:bg-blue-700 text-white rounded-l-md px-3 py-1 text-lg font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" data-product-id="${item.product.id}" data-change="-1">-</button>
                            <span class="bg-gray-700 text-white px-4 py-1 text-lg font-medium">${item.quantity}</span>
                            <button class="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md px-3 py-1 text-lg font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" data-product-id="${item.product.id}" data-change="1">+</button>
                        </div>
                    </div>
                    <button class="remove-item-button ml-4 text-red-500 hover:text-red-600 transition duration-300" data-product-id="${item.product.id}" aria-label="Remove ${item.product.name} from cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                    </button>
                `;

               
                cartItemDiv.querySelectorAll('.quantity-button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const productId = parseInt(event.target.dataset.productId);
                        const change = parseInt(event.target.dataset.change);
                        updateQuantity(productId, change);
                    });
                });
                cartItemDiv.querySelector('.remove-item-button').addEventListener('click', (event) => {
                  
                    removeFromCart(parseInt(event.currentTarget.dataset.productId));
                });

                cartItemsList.appendChild(cartItemDiv); 
            });
            cartTotalSpan.textContent = `₹${calculateTotal()}`; 
        }
       
        const totalItemsInCart = cart.reduce((count, item) => count + item.quantity, 0);
        cartCountSpan.textContent = totalItemsInCart;
    
        if (totalItemsInCart > 0) {
            cartCountSpan.classList.add('animate-bounce');
        } else {
            cartCountSpan.classList.remove('animate-bounce');
        }
    };

    /**
   **/
    const toggleCartSidebar = () => {
        isCartOpen = !isCartOpen; 
        if (isCartOpen) {
            cartSidebar.classList.remove('translate-x-full');
            cartSidebar.classList.add('translate-x-0');
        } else {
            cartSidebar.classList.add('translate-x-full'); 
            cartSidebar.classList.remove('translate-x-0');
        }
    };

    /**
     * @param {string} view 
     */
    const showAuthModal = (view) => {
        authModal.classList.remove('hidden'); 
        setTimeout(() => {
            authModal.classList.add('active');
            if (view === 'signup') {
                showSignupView();
            } else {
                showLoginView();
            }
        }, 10);
    };

    /**
     */
    const hideAuthModal = () => {
        authModal.classList.remove('active');
        setTimeout(() => {
            authModal.classList.add('hidden');
            loginForm.reset(); 
            signupForm.reset(); 
        }, 300); 
    };

    /**
 */
    const showLoginView = () => {
        authModalTitle.textContent = 'Login to Shree Nand Paints';
        loginSection.classList.remove('hidden');
        signupSection.classList.add('hidden');
    };

    /**
   
     */
    const showSignupView = () => {
        authModalTitle.textContent = 'Sign Up for Shree Nand Paints';
        loginSection.classList.add('hidden');
        signupSection.classList.remove('hidden');
    };

    /**

     * @param {Event} event 
     */
    const handleLogin = (event) => {
        event.preventDefault(); 
        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (username === '' || password === '') {
            showToast('Please enter both username and password.', 4000);
            return;
        }

       
        if (users[username] && users[username].password === password) {
            isLoggedIn = true;
            authBtn.textContent = `Logout (${username})`; 
 
            authBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
            authBtn.classList.add('bg-red-600', 'hover:bg-red-700');
            showToast(`Welcome, ${username}! You are now logged in.`, 4000);
            hideAuthModal(); 
        } else {
            showToast('Invalid username or password.', 4000); 
        }
    };

    /**

     * @param {Event} event 
     */
    const handleSignup = (event) => {
        event.preventDefault(); 

        const username = signupUsernameInput.value.trim();
        const password = signupPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (username === '' || password === '' || confirmPassword === '') {
            showToast('Please fill in all fields.', 4000);
            return;
        }
        if (password !== confirmPassword) {
            showToast('Passwords do not match.', 4000);
            return;
        }
        if (users[username]) {
            showToast('Username already exists. Please choose a different one.', 4000);
            return;
        }


        users[username] = { password: password };
        localStorage.setItem('registeredUsers', JSON.stringify(users)); 

        showToast('Account created successfully! You can now log in.', 4000);
        signupForm.reset();
        showLoginView(); 
    };

    /**
     */
    const handleLogout = () => {
        isLoggedIn = false;
        cart = []; 
        authBtn.textContent = 'Login'; 
      
        authBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
        authBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
        renderCart(); 
        showToast('You have been logged out. Your cart has been cleared. Thanks For Visiting!', 4000);
    };

  
    toggleCartBtn.addEventListener('click', toggleCartSidebar); 
    closeCartBtn.addEventListener('click', toggleCartSidebar);


    authBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            handleLogout();
        } else {
            showAuthModal('login'); 
        }
    });

   
    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        showSignupView();
    });
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginView();
    });
    closeAuthModalBtn.addEventListener('click', hideAuthModal); 
   
    authModal.addEventListener('click', (event) => {
        if (event.target === authModal) {
            hideAuthModal();
        }
    });

 
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);

  
    renderProducts(); 
    renderCart();     


});
