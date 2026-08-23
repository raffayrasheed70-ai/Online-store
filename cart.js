/* =========================================================
   GREENBASKET
   COMPLETE CART SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SETTINGS
    ===================================================== */

    const CART_KEY = "freshCart";

    const FAVORITES_KEY = "freshFavorites";

    const FREE_DELIVERY_LIMIT = 50;

    const DELIVERY_FEE = 5;

    let discount = 0;

    let appliedCoupon = "";


    /* =====================================================
       GET CART
    ===================================================== */

    function getCart() {

        try {

            const savedCart =
                localStorage.getItem(CART_KEY);

            if (!savedCart) {
                return [];
            }

            const cart =
                JSON.parse(savedCart);

            if (!Array.isArray(cart)) {
                return [];
            }

            return cart.map(function (product) {

                return {

                    name:
                        product.name ||
                        "Fresh Product",

                    price:
                        Number(product.price) || 0,

                    image:
                        product.image || "",

                    quantity:
                        Math.max(
                            1,
                            Number(product.quantity) || 1
                        )

                };

            });

        } catch (error) {

            console.error(
                "Cart loading error:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE CART
    ===================================================== */

    function saveCart(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       ADD TO CART
       USED BY SHOP + HOME
    ===================================================== */

    function addToCart(
        name,
        price,
        image = ""
    ) {

        const cart = getCart();

        const existingProduct =
            cart.find(function (product) {

                return product.name === name;

            });


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                name: name,

                price: Number(price),

                image: image,

                quantity: 1

            });

        }


        saveCart(cart);

        updateCartCount();

        renderCart();


        /* Success message */

        showCartToast(
            name + " added to cart"
        );

    }


    /* =====================================================
       CART TOAST
    ===================================================== */

    function showCartToast(message) {

        let toast =
            document.getElementById(
                "greenBasketToast"
            );


        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "greenBasketToast";

            toast.style.position =
                "fixed";

            toast.style.bottom =
                "25px";

            toast.style.right =
                "25px";

            toast.style.zIndex =
                "99999";

            toast.style.padding =
                "14px 20px";

            toast.style.borderRadius =
                "12px";

            toast.style.background =
                "#198754";

            toast.style.color =
                "#ffffff";

            toast.style.fontSize =
                "14px";

            toast.style.fontWeight =
                "600";

            toast.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.18)";

            toast.style.transform =
                "translateY(20px)";

            toast.style.opacity =
                "0";

            toast.style.transition =
                "all .3s ease";

            document.body.appendChild(toast);

        }


        toast.innerHTML =
            `<i class="bi bi-check-circle-fill"></i>
             &nbsp; ${message}`;


        toast.style.opacity =
            "1";

        toast.style.transform =
            "translateY(0)";


        clearTimeout(
            toast.hideTimer
        );


        toast.hideTimer =
            setTimeout(function () {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateY(20px)";

            }, 2200);

    }


    /* =====================================================
       MONEY FORMAT
    ===================================================== */

    function money(value) {

        return "$" +
            Number(value).toFixed(2);

    }


    /* =====================================================
       UPDATE CART COUNT
    ===================================================== */

    function updateCartCount() {

        const cart =
            getCart();


        const totalItems =
            cart.reduce(
                function (total, product) {

                    return total +
                        product.quantity;

                },
                0
            );


        const cartCount =
            document.getElementById(
                "cartCount"
            );


        const cartItemsCount =
            document.getElementById(
                "cartItemsCount"
            );


        const cartHeroCount =
            document.getElementById(
                "cartHeroCount"
            );


        if (cartCount) {

            cartCount.textContent =
                totalItems;

        }


        if (cartItemsCount) {

            cartItemsCount.textContent =
                totalItems +
                (
                    totalItems === 1
                        ? " Item"
                        : " Items"
                );

        }


        if (cartHeroCount) {

            cartHeroCount.textContent =
                totalItems +
                (
                    totalItems === 1
                        ? " Item"
                        : " Items"
                );

        }

    }


    /* =====================================================
       UPDATE FAVORITE COUNT
    ===================================================== */

    function updateFavoriteCount() {

        const favoriteCount =
            document.getElementById(
                "favoriteCount"
            );


        if (!favoriteCount) {
            return;
        }


        try {

            const favorites =
                JSON.parse(
                    localStorage.getItem(
                        FAVORITES_KEY
                    )
                ) || [];


            favoriteCount.textContent =
                Array.isArray(favorites)
                    ? favorites.length
                    : 0;

        } catch (error) {

            favoriteCount.textContent =
                "0";

        }

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       ESCAPE ATTRIBUTE
    ===================================================== */

    function escapeAttribute(value) {

        return String(value)

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        const cartProducts =
            document.getElementById(
                "cartProducts"
            );


        if (!cartProducts) {
            return;
        }


        const cart =
            getCart();


        /* =================================================
           EMPTY CART
        ================================================= */

        if (cart.length === 0) {

            cartProducts.innerHTML = `

                <div class="empty-cart-box">

                    <div class="empty-cart-icon">
                        <i class="bi bi-cart-x"></i>
                    </div>

                    <h2>
                        Your Cart is Empty
                    </h2>

                    <p>
                        Looks like you haven't added
                        anything to your shopping cart yet.
                        Explore our fresh products and
                        start shopping.
                    </p>

                    <a
                        href="shop.html"
                        class="empty-cart-btn"
                    >

                        <i class="bi bi-shop"></i>

                        Start Shopping

                    </a>

                </div>

            `;


            updateSummary();

            return;

        }


        /* =================================================
           CART PRODUCTS
        ================================================= */

        cartProducts.innerHTML =

            cart.map(
                function (product, index) {


                    const itemTotal =
                        product.price *
                        product.quantity;


                    const safeName =
                        escapeHTML(
                            product.name
                        );


                    /*
                       IMPORTANT:

                       Image path is taken directly
                       from addToCart().
                    */

                    const safeImage =
                        product.image ||
                        "images/product-placeholder.jpg";


                    return `

                        <div
                            class="cart-product-card"
                            data-index="${index}"
                        >


                            <!-- PRODUCT IMAGE -->

                            <div class="cart-product-image">

                                <img
                                    src="${escapeAttribute(
                                        safeImage
                                    )}"

                                    alt="${escapeAttribute(
                                        safeName
                                    )}"

                                    onerror="
                                        this.onerror=null;
                                        this.src='images/product-placeholder.jpg';
                                    "
                                >

                            </div>


                            <!-- PRODUCT INFO -->

                            <div class="cart-product-info">

                                <h3>
                                    ${safeName}
                                </h3>

                                <p>
                                    Fresh & quality
                                    grocery product
                                </p>

                                <strong
                                    class="cart-product-price"
                                >
                                    ${money(
                                        product.price
                                    )}
                                </strong>

                            </div>


                            <!-- QUANTITY -->

                            <div
                                class="cart-quantity-box"
                            >

                                <button
                                    type="button"
                                    class="quantity-minus"
                                    data-index="${index}"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>


                                <span>
                                    ${product.quantity}
                                </span>


                                <button
                                    type="button"
                                    class="quantity-plus"
                                    data-index="${index}"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>

                            </div>


                            <!-- TOTAL -->

                            <div
                                class="cart-product-total"
                            >

                                <strong>
                                    ${money(
                                        itemTotal
                                    )}
                                </strong>

                            </div>


                            <!-- REMOVE -->

                            <button
                                class="cart-remove-btn"
                                type="button"
                                data-index="${index}"
                                aria-label="Remove product"
                            >

                                <i
                                    class="bi bi-trash3"
                                ></i>

                            </button>


                        </div>

                    `;

                }
            ).join("");


        updateSummary();

    }


    /* =====================================================
       UPDATE SUMMARY
    ===================================================== */

    function updateSummary() {

        const cart =
            getCart();


        const subtotal =
            cart.reduce(
                function (
                    total,
                    product
                ) {

                    return total +
                        product.price *
                        product.quantity;

                },
                0
            );


        let delivery = 0;


        if (subtotal > 0) {

            delivery =
                subtotal >=
                FREE_DELIVERY_LIMIT

                    ? 0

                    : DELIVERY_FEE;

        }


        const total =
            Math.max(
                0,
                subtotal +
                delivery -
                discount
            );


        const subtotalElement =
            document.getElementById(
                "cartSubtotal"
            );


        const deliveryElement =
            document.getElementById(
                "cartDelivery"
            );


        const discountElement =
            document.getElementById(
                "cartDiscount"
            );


        const totalElement =
            document.getElementById(
                "cartTotal"
            );


        if (subtotalElement) {

            subtotalElement.textContent =
                money(subtotal);

        }


        if (deliveryElement) {

            if (
                delivery === 0 &&
                subtotal > 0
            ) {

                deliveryElement.textContent =
                    "FREE";

            } else {

                deliveryElement.textContent =
                    money(delivery);

            }

        }


        if (discountElement) {

            discountElement.textContent =
                "-" +
                money(discount);

        }


        if (totalElement) {

            totalElement.textContent =
                money(total);

        }


        /* =================================================
           CHECKOUT BUTTON
        ================================================= */

        const checkoutBtn =
            document.getElementById(
                "checkoutBtn"
            );


        if (checkoutBtn) {

            if (cart.length === 0) {

                checkoutBtn.classList.add(
                    "disabled"
                );

                checkoutBtn.setAttribute(
                    "aria-disabled",
                    "true"
                );

            } else {

                checkoutBtn.classList.remove(
                    "disabled"
                );

                checkoutBtn.removeAttribute(
                    "aria-disabled"
                );

            }

        }

    }


    /* =====================================================
       CHANGE QUANTITY
    ===================================================== */

    function changeQuantity(
        index,
        amount
    ) {

        const cart =
            getCart();


        if (!cart[index]) {
            return;
        }


        cart[index].quantity +=
            amount;


        if (
            cart[index].quantity <= 0
        ) {

            cart.splice(
                index,
                1
            );

        }


        saveCart(cart);

        renderCart();

        updateCartCount();

    }


    /* =====================================================
       REMOVE PRODUCT
    ===================================================== */

    function removeProduct(index) {

        const cart =
            getCart();


        if (!cart[index]) {
            return;
        }


        const productName =
            cart[index].name;


        cart.splice(
            index,
            1
        );


        saveCart(cart);

        renderCart();

        updateCartCount();


        showCartToast(
            productName +
            " removed from cart"
        );

    }


    /* =====================================================
       CART CLICK EVENTS
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {


            /* PLUS */

            const plusButton =
                event.target.closest(
                    ".quantity-plus"
                );


            if (plusButton) {

                const index =
                    Number(
                        plusButton.dataset.index
                    );


                changeQuantity(
                    index,
                    1
                );


                return;

            }


            /* MINUS */

            const minusButton =
                event.target.closest(
                    ".quantity-minus"
                );


            if (minusButton) {

                const index =
                    Number(
                        minusButton.dataset.index
                    );


                changeQuantity(
                    index,
                    -1
                );


                return;

            }


            /* REMOVE */

            const removeButton =
                event.target.closest(
                    ".cart-remove-btn"
                );


            if (removeButton) {

                const index =
                    Number(
                        removeButton.dataset.index
                    );


                removeProduct(
                    index
                );

            }

        }
    );


    /* =====================================================
       COUPON
    ===================================================== */

    const applyCoupon =
        document.getElementById(
            "applyCoupon"
        );


    const couponInput =
        document.getElementById(
            "couponInput"
        );


    const couponMessage =
        document.getElementById(
            "couponMessage"
        );


    if (applyCoupon) {

        applyCoupon.addEventListener(
            "click",
            function () {


                const code =
                    couponInput
                        ? couponInput.value
                            .trim()
                            .toUpperCase()
                        : "";


                if (!code) {

                    showCouponMessage(
                        "Please enter a coupon code.",
                        "error"
                    );

                    return;

                }


                const cart =
                    getCart();


                const subtotal =
                    cart.reduce(
                        function (
                            total,
                            product
                        ) {

                            return total +
                                product.price *
                                product.quantity;

                        },
                        0
                    );


                if (subtotal <= 0) {

                    showCouponMessage(
                        "Add products to your cart first.",
                        "error"
                    );

                    return;

                }


                if (appliedCoupon) {

                    showCouponMessage(
                        "A coupon is already applied.",
                        "error"
                    );

                    return;

                }


                /* GREEN10 */

                if (
                    code === "GREEN10"
                ) {

                    discount =
                        subtotal * 0.10;

                    appliedCoupon =
                        code;


                    showCouponMessage(
                        "GREEN10 applied — 10% discount added.",
                        "success"
                    );


                    updateSummary();


                    return;

                }


                /* FRESH20 */

                if (
                    code === "FRESH20"
                ) {

                    discount =
                        subtotal * 0.20;

                    appliedCoupon =
                        code;


                    showCouponMessage(
                        "FRESH20 applied — 20% discount added.",
                        "success"
                    );


                    updateSummary();


                    return;

                }


                /* INVALID */

                showCouponMessage(
                    "Invalid coupon code.",
                    "error"
                );

            }
        );

    }


    /* =====================================================
       COUPON MESSAGE
    ===================================================== */

    function showCouponMessage(
        message,
        type
    ) {

        if (!couponMessage) {
            return;
        }


        couponMessage.textContent =
            message;


        couponMessage.className =
            "coupon-message " +
            type;

    }


    /* =====================================================
       HEADER SEARCH
    ===================================================== */

    const headerSearch =
        document.getElementById(
            "headerSearch"
        );


    if (headerSearch) {

        headerSearch.addEventListener(
            "keydown",
            function (event) {


                if (
                    event.key === "Enter"
                ) {

                    const searchValue =
                        headerSearch.value.trim();


                    if (searchValue) {

                        window.location.href =
                            "shop.html?search=" +
                            encodeURIComponent(
                                searchValue
                            );

                    }

                }

            }
        );

    }


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.querySelector(
            ".fc-newsletter-form"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const emailInput =
                    newsletterForm.querySelector(
                        'input[type="email"]'
                    );


                if (!emailInput) {
                    return;
                }


                const email =
                    emailInput.value.trim();


                if (!email) {
                    return;
                }


                alert(
                    "Thank you for subscribing to GreenBasket!"
                );


                newsletterForm.reset();

            }
        );

    }


    /* =====================================================
       SCROLL ANIMATION
    ===================================================== */

    const animationSections =
        document.querySelectorAll(
            ".cart-page-hero, .cart-main-section"
        );


    const orderInfo =
        document.querySelector(
            ".cart-order-info"
        );


    function revealCartSections() {


        animationSections.forEach(
            function (section) {

                const rect =
                    section.getBoundingClientRect();


                if (
                    rect.top <
                    window.innerHeight * 0.88
                ) {

                    section.classList.add(
                        "cart-visible"
                    );

                }

            }
        );


        if (orderInfo) {

            const rect =
                orderInfo.getBoundingClientRect();


            if (
                rect.top <
                window.innerHeight * 0.88
            ) {

                orderInfo.classList.add(
                    "cart-info-visible"
                );

            }

        }

    }


    window.addEventListener(
        "scroll",
        revealCartSections,
        {
            passive: true
        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    renderCart();

    updateCartCount();

    updateFavoriteCount();

    revealCartSections();


    /* =====================================================
       GLOBAL FUNCTIONS
       IMPORTANT FOR onclick=""
    ===================================================== */

    window.addToCart =
        addToCart;


    window.updateCartCount =
        updateCartCount;


    window.renderCart =
        renderCart;


    window.changeQuantity =
        changeQuantity;


    window.removeProduct =
        removeProduct;

});