document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const productGrid = document.getElementById('productGrid');
    const toggleCartBtn = document.getElementById('toggleCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItemsList = document.getElementById('cartItems');
    const cartCountSpan = document.getElementById('cartCount');
    const cartTotalSpan = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const authBtn = document.getElementById('authBtn'); // Login/Signup/Logout button
    const authModal = document.getElementById('authModal'); // The unified authentication modal
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

    const messageToast = document.getElementById('messageToast'); // The toast notification container
    const toastText = document.getElementById('toastText'); // The text inside the toast

    // --- Application State ---
    let cart = []; // Stores products currently in the cart: { product: ProductObject, quantity: number }
    let isCartOpen = false; // Boolean to track if the cart sidebar is currently open
    let isLoggedIn = false; // Boolean to track the user's login status (simulated)
    // Client-side storage for users. In a real app, this would be a database.
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || {}; // Load users from localStorage

    // --- Product Data (Asian Paints themed with bucket images and descriptions) ---
    // IMPORTANT: Replace the 'imageUrl' values with direct links to your actual product images.
    // Example: 'imageUrl': 'https://yourwebsite.com/images/apex_ultima_20L.jpg'
    const products = [
        {
            id: 1,
            name: 'Asian Paints Apex Ultima Bucket (20L)',
            price: 9999.00,
            imageUrl: 'https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-ultima-asian-paints.png', // Replace with your image URL
            description: 'Premium exterior emulsion for ultimate protection and beauty. Experience vibrant colors and a long-lasting finish from Asian Paints.'
        },
        {
            id: 2,
            name: 'Asian Paints Royale Luxery Emultion (20L)',
            price: 3499.00,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWqTdj4RZ2T_yu1_OSL7z143ujuJjyhxWCQ&s', // Replace with your image URL
            description: 'Asian Paints Royale Luxury Emulsion is known for its luxurious finish and high durability It Has A Technology Called Teflon.'

        },
        {
            id: 3,
            name: 'Asian Paints Tractor Emulsion (20L)',
            price: 2499.00,
            imageUrl: 'https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-emulsion-asian-paints.png', // Replace with your image URL
            description: 'Economical interior paint providing a smooth and matt finish. Perfect for budget-friendly makeovers with Asian Paints reliability.'
        },
        {
            id: 4,
            name: 'Asian Paints Damp Proof (20L)',
            price: 4999.00,
            imageUrl: 'https://www.asianpaints.com/content/dam/asian_paints/products/packshots/SC-dampproof.png', // Replace with your image URL
            description: 'Asian Paints SmartCare Damp Proof is a fiber reinforced elastomeric liquid applied water proofing membrane. '
        },
        {
            id: 5,
            name: 'Asian Paints SmartCare Damp Sheath (20L)',
            price: 1299.00,
            imageUrl: 'https://www.asianpaints.com/content/dam/asian_paints/products/packshots/sc-Dampsheath-exterior-new.png', // Replace with your image URL
            description: 'Waterproofing solution for interior and exterior surfaces. Protects against efflorescence and damp walls, part of Asian Paints SmartCare.We Sell Both Interior And Exterior'
        },
        {
            id: 6,
            name: 'Asian Paints Apcolite Premium Gloss (1L-20L)',
            price: 5000.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/metals-apcolite-premium-gloss-enamel-asian-paints.png', // Replace with your image URL
            description: 'High-gloss enamel paint for wood, metal, and masonry. Offers a tough, durable, and mirror-like finish from Asian Paints Apcolite' 
        },
        {
            id: 7,
            name: 'Asian Paints TruCare Interior Wall Primer - Water Thinnable (20L)',
            price: 1999.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/0360.png', // Replace with your image URL
            description: 'Water-based interior wall primer ensuring excellent adhesion and a smooth base for topcoats. A vital step from Asian Paints TruCare.'
        },
        {
            id: 8,
            name: 'Asian Paints Tractor Uno (20Kg)',
            price: 850.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-uno-asian-paints.png', // Replace with your image URL
            description: 'Having a beautiful home at an affordable price is no more a dream. This water-based acrylic distemper from Asian Paints has 900+ shades to choose from to make sure you get a home in the colour of your choice. Moreover, Tractor Uno is a washable, lead-free paint with a stylish matt finish.'
        },
        {
            id: 9,
            name: 'Asian Paints Damp Proof Advanced (20L)',
            price: 3800.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/DP-Advanced-Packshot.png', // Replace with your image URL
            description: 'Formulated with select elastomeric and resilient acrylic polymers and reinforcing polyester fibers, Damp Proof Advanced provides superior whiteness & unmatched waterproofing to Terraces & Exterior walls.'
        },
        {
            id: 10,
            name: 'Asian Paints Damp Proof Xtreme (20L)',
            price: 2950.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/packshots/SC-dampproof-xtreme-new.png', // Replace with your image URL
            description: 'To protect your homes from leakage by extreme rains, Asian Paints brings to you SmartCare Damp Proof Xtreme with Triple Flex-Armour Layer which offers 12 years of waterproofing warranty on terraces and exterior walls.'
        },
        {
            id: 11,
            name: 'Sand Papers',
            price: 1100.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/Tools/sand-paper-spotlight-asian-paints.jpeg', // Replace with your image URL
            description: 'We Provide You With Many Of the sandpapers quality , grit whether you want just call us and tell us which grit sandpaper do you want'
        },
        {
            id: 12,
            name: 'Asian Paints Tools **Note- Price May Vary**',
            price:  5000.00,
            imageUrl: 'https://static.asianpaints.com/content/dam/asian_paints/products/Tools/landing-page/mechanized-equipment-trucare-wall-sander-asian-paints.jpeg', // Replace with your image URL
            description: 'We Have Many Types Of Asian Paints Tools , Whether It Comes to Brush Or Rollers , Sanding Machine , Putty Mixer , Spray Gun , etc you can get any of the asian paints tools you can book your asian paints tools by just calling us :)' 
        }
        ];

    // --- UI Utility Functions ---

    /**
     * Displays a temporary toast message at the bottom of the screen.
     * @param {string} message - The text content for the toast message.
     * @param {number} duration - How long the toast should be visible in milliseconds (default: 3000ms).
     */
    const showToast = (message, duration = 3000) => {
        toastText.textContent = message; // Set the message text
        messageToast.classList.add('show'); // Add 'show' class to trigger CSS animation
        setTimeout(() => {
            messageToast.classList.remove('show'); // Remove 'show' class to hide toast after duration
        }, duration);
    };

    /**
     * Renders all products from the 'products' array into the product grid.
     * Clears any existing products before rendering to ensure fresh display.
     */
    const renderProducts = () => {
        productGrid.innerHTML = ''; // Clear existing products HTML
        products.forEach(product => {
            const productCard = document.createElement('div');
            // Apply Tailwind CSS classes along with custom 'product-card' class
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
            // Attach event listener to the "Add to Cart" button for each product
            productCard.querySelector('.add-to-cart-button').addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.productId); // Get product ID from data attribute
                const productToAdd = products.find(p => p.id === productId); // Find the full product object
                if (productToAdd) {
                    addToCart(productToAdd); // Call the addToCart function
                }
            });
            productGrid.appendChild(productCard); // Add the newly created card to the grid
        });
    };

    /**
     * Adds a product to the cart or increments its quantity if it's already present.
     * Shows a toast message for feedback.
     * @param {Object} productToAdd - The product object to be added to the cart.
     */
    const addToCart = (productToAdd) => {
        const existingItem = cart.find(item => item.product.id === productToAdd.id);

        if (existingItem) {
            existingItem.quantity++; // Increment quantity if item already exists
            showToast(`Increased ${productToAdd.name} quantity.`);
        } else {
            cart.push({ product: productToAdd, quantity: 1 }); // Add new item with quantity 1
            showToast(`Added ${productToAdd.name} to cart!`);
        }
        renderCart(); // Re-render the cart display to reflect changes
    };

    /**
     * Removes a product entirely from the cart.
     * Shows a toast message for feedback.
     * @param {number} productId - The ID of the product to remove.
     */
    const removeFromCart = (productId) => {
        const itemToRemove = cart.find(item => item.product.id === productId);
        if (itemToRemove) {
            cart = cart.filter(item => item.product.id !== productId); // Filter out the item
            showToast(`Removed ${itemToRemove.product.name} from cart.`);
            renderCart(); // Re-render the cart display
        }
    };

    /**
     * Updates the quantity of a specific product in the cart.
     * Ensures quantity does not go below 1. If it drops to 0 or less, the item is removed.
     * Shows a toast message for feedback.
     * @param {number} productId - The ID of the product to update.
     * @param {number} change - The amount to change the quantity by (e.g., +1 for increment, -1 for decrement).
     */
    const updateQuantity = (productId, change) => {
        const itemToUpdate = cart.find(item => item.product.id === productId);
        if (itemToUpdate) {
            itemToUpdate.quantity += change; // Apply the quantity change
            if (itemToUpdate.quantity <= 0) {
                removeFromCart(productId); // Remove if quantity becomes zero or negative
            } else {
                showToast(`Updated ${itemToUpdate.product.name} quantity.`);
                renderCart(); // Re-render the cart display
            }
        }
    };

    /**
     * Calculates the total price of all items currently in the cart.
     * @returns {string} - The total price formatted to two decimal places (e.g., "123.45").
     */
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };

    /**
     * Renders the current state of the cart to the sidebar.
     * Clears existing cart items, populates with current items, updates total price,
     * and refreshes the cart item count in the header. Manages empty cart message visibility.
     */
    const renderCart = () => {
        cartItemsList.innerHTML = ''; // Clear existing cart items in the display

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'flex'; // Show "Your cart is empty" message
            cartTotalSpan.textContent = '₹0.00'; // Reset total price display
        } else {
            emptyCartMessage.style.display = 'none'; // Hide empty message
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                // Apply Tailwind CSS classes for cart item styling
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

                // Add event listeners for quantity and remove buttons
                cartItemDiv.querySelectorAll('.quantity-button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const productId = parseInt(event.target.dataset.productId);
                        const change = parseInt(event.target.dataset.change);
                        updateQuantity(productId, change); // Call updateQuantity
                    });
                });
                cartItemDiv.querySelector('.remove-item-button').addEventListener('click', (event) => {
                    // Use currentTarget to ensure we get the button's data-product-id
                    removeFromCart(parseInt(event.currentTarget.dataset.productId));
                });

                cartItemsList.appendChild(cartItemDiv); // Add the cart item to the list
            });
            cartTotalSpan.textContent = `₹${calculateTotal()}`; // Update total price display
        }
        // Update the total number of items shown in the header cart icon's badge
        const totalItemsInCart = cart.reduce((count, item) => count + item.quantity, 0);
        cartCountSpan.textContent = totalItemsInCart;
        // Add/remove bounce animation based on cart items
        if (totalItemsInCart > 0) {
            cartCountSpan.classList.add('animate-bounce');
        } else {
            cartCountSpan.classList.remove('animate-bounce');
        }
    };

    /**
     * Toggles the visibility of the cart sidebar by adding/removing CSS transform classes.
     */
    const toggleCartSidebar = () => {
        isCartOpen = !isCartOpen; // Toggle the state
        if (isCartOpen) {
            cartSidebar.classList.remove('translate-x-full'); // Slide in
            cartSidebar.classList.add('translate-x-0');
        } else {
            cartSidebar.classList.add('translate-x-full'); // Slide out
            cartSidebar.classList.remove('translate-x-0');
        }
    };

    /**
     * Shows the authentication modal (Login or Sign Up view).
     * @param {string} view - 'login' or 'signup' to set the initial form view.
     */
    const showAuthModal = (view) => {
        authModal.classList.remove('hidden'); // Make the modal visible
        // Trigger the scale animation after a very short delay
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
     * Hides the authentication modal with an animation and resets forms.
     */
    const hideAuthModal = () => {
        authModal.classList.remove('active'); // Start the exit animation
        // Hide completely after the transition duration
        setTimeout(() => {
            authModal.classList.add('hidden');
            loginForm.reset(); // Clear login form fields
            signupForm.reset(); // Clear signup form fields
        }, 300); // Matches the CSS transition duration
    };

    /**
     * Switches the authentication modal to the Login view.
     */
    const showLoginView = () => {
        authModalTitle.textContent = 'Login to Shree Nand Paints';
        loginSection.classList.remove('hidden');
        signupSection.classList.add('hidden');
    };

    /**
     * Switches the authentication modal to the Sign Up view.
     */
    const showSignupView = () => {
        authModalTitle.textContent = 'Sign Up for Shree Nand Paints';
        loginSection.classList.add('hidden');
        signupSection.classList.remove('hidden');
    };

    /**
     * Handles the login process (simulated).
     * Checks credentials against stored users in localStorage.
     * @param {Event} event - The form submission event, used to prevent default behavior.
     */
    const handleLogin = (event) => {
        event.preventDefault(); // Prevent default browser form submission (page reload)

        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (username === '' || password === '') {
            showToast('Please enter both username and password.', 4000);
            return;
        }

        // Check if user exists and password matches
        if (users[username] && users[username].password === password) {
            isLoggedIn = true;
            authBtn.textContent = `Logout (${username})`; // Show logged-in username
            // Change button color for logged-in state
            authBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
            authBtn.classList.add('bg-red-600', 'hover:bg-red-700');
            showToast(`Welcome, ${username}! You are now logged in.`, 4000);
            hideAuthModal(); // Close modal on successful login
        } else {
            showToast('Invalid username or password.', 4000); // Feedback for incorrect credentials
        }
    };

    /**
     * Handles the sign-up process (simulated).
     * Stores new user credentials in localStorage.
     * @param {Event} event - The form submission event, used to prevent default behavior.
     */
    const handleSignup = (event) => {
        event.preventDefault(); // Prevent default browser form submission

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

        // Store new user
        users[username] = { password: password };
        localStorage.setItem('registeredUsers', JSON.stringify(users)); // Save to localStorage

        showToast('Account created successfully! You can now log in.', 4000);
        signupForm.reset(); // Clear signup form
        showLoginView(); // Switch to login view after signup
    };

    /**
     * Handles the logout process.
     * Resets login status, clears cart, and updates UI. Shows toast message.
     */
    const handleLogout = () => {
        isLoggedIn = false;
        cart = []; // Clear the cart when logging out
        authBtn.textContent = 'Login'; // Change button text back
        // Change button color back to login state
        authBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
        authBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
        renderCart(); // Update cart display to show it's cleared
        showToast('You have been logged out. Your cart has been cleared.', 4000);
    };

    // --- Event Listeners Initialization ---
    toggleCartBtn.addEventListener('click', toggleCartSidebar); // Open/close cart sidebar
    closeCartBtn.addEventListener('click', toggleCartSidebar); // Close cart sidebar

    // Main auth button in header
    authBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            handleLogout();
        } else {
            showAuthModal('login'); // Show login view by default
        }
    });

    // Modal navigation buttons
    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        showSignupView();
    });
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        showLoginView();
    });
    closeAuthModalBtn.addEventListener('click', hideAuthModal); // Close button inside modal
    // Close modal if clicked on the dimmed background overlay
    authModal.addEventListener('click', (event) => {
        if (event.target === authModal) {
            hideAuthModal();
        }
    });

    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);

    // --- Initial Application Setup ---
    renderProducts(); // Populate the product grid with items
    renderCart();     // Initialize cart display (will show as empty initially)

    // Check if user was previously logged in (e.g., from a persistent session)
    // For this client-side example, login state isn't persisted beyond session,
    // but a real app would load this from storage.
    // For now, we only update the button on actual login/logout actions.
});
