/* =========================================================
   GREENBASKET CHECKOUT JAVASCRIPT
   CART DATA + PRODUCT IMAGES + PAYMENT + ORDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SETTINGS
    ===================================================== */

    const CART_KEY = "freshCart";


    /* =====================================================
       GET CART FROM LOCAL STORAGE
    ===================================================== */

    function getCart() {

        try {

            const savedCart =
                localStorage.getItem(CART_KEY);

            if (!savedCart) {
                return [];
            }

            const cart = JSON.parse(savedCart);

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
                "Checkout cart error:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       MONEY FORMAT
    ===================================================== */

    function money(value) {

        return "$" +
            Number(value).toFixed(2);

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       ESCAPE ATTRIBUTE
    ===================================================== */

    function escapeAttribute(value) {

        return String(value)

            .replace(/&/g, "&amp;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       LOAD PRODUCTS INTO CHECKOUT
       USING .order5-product CLASS
    ===================================================== */

    function loadCheckoutProducts() {

        const cart = getCart();

        const products =
            document.querySelectorAll(
                ".order5-product"
            );


        /* ===============================================
           IF CART IS EMPTY
        =============================================== */

        if (cart.length === 0) {

            products.forEach(function (product) {

                product.style.display = "none";

            });

            updateCheckoutCount(0);

            updateCheckoutSummary([]);

            return;

        }


        /* ===============================================
           HIDE EXTRA HARDCODED PRODUCTS
        =============================================== */

        products.forEach(function (product, index) {

            if (index >= cart.length) {

                product.style.display = "none";

            }

        });


        /* ===============================================
           SHOW CART PRODUCTS
        =============================================== */

        cart.forEach(function (product, index) {

            let productElement = products[index];


            /* -------------------------------------------
               IF THERE ARE NOT ENOUGH HTML PRODUCTS,
               CREATE ONE
            ------------------------------------------- */

            if (!productElement) {

                const itemsCard =
                    document.querySelector(
                        ".order5-items-card"
                    );

                const editCart =
                    document.querySelector(
                        ".order5-edit"
                    );

                if (!itemsCard) {
                    return;
                }

                productElement =
                    document.createElement("div");

                productElement.className =
                    "order5-product";

                if (editCart) {

                    itemsCard.insertBefore(
                        productElement,
                        editCart
                    );

                } else {

                    itemsCard.appendChild(
                        productElement
                    );

                }

            }


            /* -------------------------------------------
               PRODUCT IMAGE
            ------------------------------------------- */

            let imagePath =
                product.image;

            if (!imagePath) {

                imagePath =
                    "images/product-placeholder.jpg";

            }


            /* -------------------------------------------
               PRODUCT DATA
            ------------------------------------------- */

            const name =
                escapeHTML(product.name);

            const image =
                escapeAttribute(imagePath);

            const quantity =
                product.quantity;

            const price =
                Number(product.price) *
                quantity;


            /* -------------------------------------------
               PRODUCT HTML
            ------------------------------------------- */

            productElement.style.display = "";

            productElement.innerHTML = `

                <div class="order5-product-image">

                    <img
                        src="${image}"
                        alt="${escapeAttribute(product.name)}"
                        onerror="
                            this.onerror=null;
                            this.src='images/product-placeholder.jpg';
                        "
                    >

                </div>


                <div class="order5-product-info">

                    <strong>
                        ${name}
                    </strong>

                    <span>
                        Fresh & Quality Grocery
                    </span>

                    <small>
                        Quantity: ${quantity}
                    </small>

                </div>


                <strong class="order5-price">
                    ${money(price)}
                </strong>

            `;

        });


        /* ===============================================
           UPDATE COUNT
        =============================================== */

        const totalQuantity =
            cart.reduce(
                function (total, product) {

                    return total +
                        product.quantity;

                },
                0
            );

        updateCheckoutCount(
            totalQuantity
        );


        /* ===============================================
           UPDATE SUMMARY
        =============================================== */

        updateCheckoutSummary(cart);

    }


    /* =====================================================
       UPDATE "3 ITEMS"
    ===================================================== */

    function updateCheckoutCount(totalItems) {

        const countElement =
            document.querySelector(
                ".order5-count"
            );

        if (!countElement) {
            return;
        }

        countElement.textContent =
            totalItems +
            (
                totalItems === 1
                    ? " Item"
                    : " Items"
            );

    }


    /* =====================================================
       UPDATE ORDER SUMMARY
    ===================================================== */

    function updateCheckoutSummary(cart) {

        const subtotal =
            cart.reduce(
                function (total, product) {

                    return total +
                        (
                            Number(product.price) *
                            Number(product.quantity)
                        );

                },
                0
            );


        /* ===============================================
           DELIVERY
        =============================================== */

        let delivery = 0;

        if (subtotal > 0) {

            delivery =
                subtotal >= 50
                    ? 0
                    : 5;

        }


        /* ===============================================
           DISCOUNT
        =============================================== */

        let discount = 0;

        /*
           Agar tumhara cart page coupon use karta hai,
           checkout yahan default 0 rakhega.
        */

        const total =
            Math.max(
                0,
                subtotal +
                delivery -
                discount
            );


        /* ===============================================
           FIND SUMMARY ELEMENTS USING CLASSES
        =============================================== */

        const priceRows =
            document.querySelectorAll(
                ".order5-prices > div"
            );


        if (priceRows.length >= 1) {

            const subtotalPrice =
                priceRows[0].querySelector(
                    "strong"
                );

            if (subtotalPrice) {

                subtotalPrice.textContent =
                    money(subtotal);

            }

        }


        if (priceRows.length >= 2) {

            const deliveryPrice =
                priceRows[1].querySelector(
                    "strong"
                );

            if (deliveryPrice) {

                deliveryPrice.textContent =
                    delivery === 0
                        ? "FREE"
                        : money(delivery);

            }

        }


        if (priceRows.length >= 3) {

            const discountPrice =
                priceRows[2].querySelector(
                    "strong"
                );

            if (discountPrice) {

                discountPrice.textContent =
                    discount > 0
                        ? "-" + money(discount)
                        : "-$0.00";

            }

        }


        /* ===============================================
           TOTAL
        =============================================== */

        const totalElement =
            document.querySelector(
                ".order5-total strong"
            );

        if (totalElement) {

            totalElement.textContent =
                money(total);

        }

    }


    /* =====================================================
       PAYMENT METHOD
    ===================================================== */

    const paymentOptions =
        document.querySelectorAll(
            'input[name="payment"]'
        );


    const selectedPaymentText =
        document.getElementById(
            "selectedPaymentText"
        );


    paymentOptions.forEach(
        function (option) {

            option.addEventListener(
                "change",
                function () {

                    if (!selectedPaymentText) {
                        return;
                    }


                    if (this.value === "cod") {

                        selectedPaymentText.textContent =
                            "Cash on Delivery";

                    }


                    else if (this.value === "card") {

                        selectedPaymentText.textContent =
                            "Credit / Debit Card";

                    }


                    else if (this.value === "wallet") {

                        selectedPaymentText.textContent =
                            "Digital Wallet";

                    }

                }
            );

        }
    );


    /* =====================================================
       EDIT CART
    ===================================================== */

    const editCart =
        document.querySelector(
            ".order5-edit"
        );


    if (editCart) {

        editCart.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.location.href =
                    "cart.html";

            }
        );

    }


    /* =====================================================
       PLACE ORDER
    ===================================================== */

    const placeOrderBtn =
        document.getElementById(
            "placeOrderBtn"
        );


    if (placeOrderBtn) {

        placeOrderBtn.addEventListener(
            "click",
            function () {

                if (placeOrderBtn.disabled) {
                    return;
                }


                /* =========================================
                   CHECK CART
                ========================================= */

                const cart = getCart();

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty. Please add products first."
                    );

                    return;

                }


                /* =========================================
                   CHECK DELIVERY FORM
                ========================================= */

                const form =
                    document.getElementById(
                        "deliveryAddressForm"
                    );


                if (form) {

                    if (!form.checkValidity()) {

                        form.reportValidity();

                        return;

                    }

                }


                /* =========================================
                   DISABLE BUTTON
                ========================================= */

                placeOrderBtn.disabled =
                    true;


                placeOrderBtn.innerHTML = `

                    <span>
                        Processing Order...
                    </span>

                    <i class="bi bi-arrow-repeat checkout-loading"></i>

                `;


                /* =========================================
                   PROCESS ORDER
                ========================================= */

                setTimeout(
                    function () {

                        placeOrderBtn.innerHTML = `

                            <span>
                                Order Placed Successfully
                            </span>

                            <i class="bi bi-check-circle-fill"></i>

                        `;


                        placeOrderBtn.classList.add(
                            "order-success"
                        );


                        showOrderSuccess();


                        /*
                           OPTIONAL:
                           Clear cart after order
                        */

                        localStorage.removeItem(
                            CART_KEY
                        );

                    },
                    1500
                );

            }
        );

    }


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    function showOrderSuccess() {

        const oldMessage =
            document.querySelector(
                ".checkout-success-message"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        const message =
            document.createElement("div");


        message.className =
            "checkout-success-message";


        message.innerHTML = `

            <div class="checkout-success-icon">

                <i class="bi bi-check-lg"></i>

            </div>


            <div class="checkout-success-content">

                <strong>
                    Order Placed Successfully!
                </strong>

                <span>
                    Thank you for shopping with GreenBasket.
                </span>

            </div>


            <button
                type="button"
                class="checkout-success-close"
                aria-label="Close"
            >

                <i class="bi bi-x"></i>

            </button>

        `;


        document.body.appendChild(
            message
        );


        setTimeout(
            function () {

                message.classList.add(
                    "show"
                );

            },
            50
        );


        const closeButton =
            message.querySelector(
                ".checkout-success-close"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    hideSuccessMessage(
                        message
                    );

                }
            );

        }


        setTimeout(
            function () {

                if (
                    document.body.contains(
                        message
                    )
                ) {

                    hideSuccessMessage(
                        message
                    );

                }

            },
            5000
        );

    }


    /* =====================================================
       HIDE SUCCESS MESSAGE
    ===================================================== */

    function hideSuccessMessage(
        message
    ) {

        message.classList.remove(
            "show"
        );


        setTimeout(
            function () {

                if (
                    document.body.contains(
                        message
                    )
                ) {

                    message.remove();

                }

            },
            400
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

    const animatedSections =
        document.querySelectorAll(
            ".checkout-hero, .delivery-address-section, .delivery-method-section, .payment4-section, .order5-section"
        );


    function revealSections() {

        animatedSections.forEach(
            function (section) {

                const rect =
                    section.getBoundingClientRect();


                if (
                    rect.top <
                    window.innerHeight * 0.88
                ) {

                    section.classList.add(
                        "checkout-visible"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        revealSections,
        {
            passive: true
        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadCheckoutProducts();

    revealSections();

});