// ==========================================
// FRESHCART CART
// ==========================================

let cart =
    JSON.parse(localStorage.getItem("freshCart")) || [];


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;


    const totalItems =
        cart.reduce(
            (total, product) =>
                total + product.quantity,
            0
        );


    cartCount.textContent =
        totalItems;

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(
    name,
    price,
    image = ""
) {

    const existingProduct =
        cart.find(
            product =>
                product.name === name
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    }

    else {

        cart.push({

            name: name,

            price: Number(price),

            image: image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "freshCart",
        JSON.stringify(cart)
    );


    updateCartCount();

}


// ==========================================
// PAGE INITIALIZATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Favorites functions agar available hain
         * to run karo.
         */

        if (
            typeof updateFavoriteCount ===
            "function"
        ) {

            updateFavoriteCount();

        }


        if (
            typeof renderFavorites ===
            "function"
        ) {

            renderFavorites();

        }


        if (
            typeof updateHeartButtons ===
            "function"
        ) {

            updateHeartButtons();

        }


        /*
         * Cart count
         */

        updateCartCount();

    }
);


// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const animatedElements =
            document.querySelectorAll(
                ".scroll-animate, .scroll-left, .scroll-right, .scroll-zoom"
            );


        /*
         * Agar page par animation elements
         * nahi hain to kuch nahi karna.
         */

        if (
            animatedElements.length === 0
        ) {

            return;

        }


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "active"
                                );


                                /*
                                 * Animation sirf
                                 * ek baar chalegi.
                                 */

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15,

                    rootMargin:
                        "0px 0px -80px 0px"
                }
            );


        animatedElements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }
);