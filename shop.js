/* =====================================================
   GREENBASKET SHOP PAGE
===================================================== */


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       SCROLL ANIMATIONS
    ================================================= */

    const animatedElements =
        document.querySelectorAll(
            ".reveal-left, .reveal-right, .reveal-up"
        );


    function revealElements() {

        animatedElements.forEach(function (element) {

            const elementTop =
                element.getBoundingClientRect().top;


            if (
                elementTop <
                window.innerHeight - 70
            ) {

                element.classList.add("show");

            }

        });

    }


    revealElements();


    window.addEventListener(
        "scroll",
        revealElements,
        {
            passive: true
        }
    );



    /* =================================================
       HERO HEART
    ================================================= */

    const heroHeart =
        document.getElementById(
            "shopHeroHeart"
        );


    if (heroHeart) {

        heroHeart.addEventListener(
            "click",
            function () {

                this.classList.toggle(
                    "active"
                );


                const icon =
                    this.querySelector("i");


                if (
                    this.classList.contains(
                        "active"
                    )
                ) {

                    icon.classList.remove(
                        "bi-heart"
                    );

                    icon.classList.add(
                        "bi-heart-fill"
                    );

                } else {

                    icon.classList.remove(
                        "bi-heart-fill"
                    );

                    icon.classList.add(
                        "bi-heart"
                    );

                }

            }
        );

    }



    /* =================================================
       SHOP SEARCH
    ================================================= */

    const shopSearch =
        document.getElementById(
            "shopSearch"
        );


    const shopSearchBtn =
        document.getElementById(
            "shopSearchBtn"
        );


    if (
        shopSearch &&
        shopSearchBtn
    ) {

        shopSearchBtn.addEventListener(
            "click",
            function () {

                const value =
                    shopSearch.value.trim();


                if (value === "") {

                    shopSearch.focus();

                    return;

                }


                const products =
                    document.getElementById(
                        "shop-products"
                    );


                if (products) {

                    products.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }



    /* =================================================
       QUICK CATEGORY BUTTONS
    ================================================= */

    const quickCategoryButtons =
        document.querySelectorAll(
            ".quick-categories button"
        );


    quickCategoryButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (shopSearch) {

                        shopSearch.value =
                            this.textContent.trim();

                        shopSearch.focus();

                    }

                }
            );

        }
    );



    /* =================================================
       INTERACTIVE SHOP CATEGORIES
    ================================================= */

    const categoryData = {

        fruits: {

            tag: "FARM FRESH",

            title: "Fresh Fruits",

            description:
                "Naturally sweet, colourful and freshly selected for your everyday needs.",

            count: "40+",

            button: "Explore Fruits",

            icon: "bi-apple"

        },


        vegetables: {

            tag: "FROM THE FARM",

            title: "Fresh Vegetables",

            description:
                "Crisp, nutritious vegetables carefully selected to bring freshness to every meal.",

            count: "55+",

            button: "Explore Vegetables",

            icon: "bi-flower1"

        },


        dairy: {

            tag: "FRESH DAILY",

            title: "Dairy & Eggs",

            description:
                "Quality milk, cheese, butter and fresh eggs delivered with care to your doorstep.",

            count: "25+",

            button: "Explore Dairy",

            icon: "bi-cup-hot"

        },


        bakery: {

            tag: "BAKED FRESH",

            title: "Bakery",

            description:
                "Freshly baked breads, pastries and delicious treats made for every occasion.",

            count: "30+",

            button: "Explore Bakery",

            icon: "bi-basket2"

        },


        meat: {

            tag: "QUALITY SELECTED",

            title: "Meat & Fish",

            description:
                "Premium cuts and quality seafood selected carefully for freshness and flavour.",

            count: "20+",

            button: "Explore Meat",

            icon: "bi-egg-fried"

        },


        snacks: {

            tag: "EVERYDAY FAVOURITES",

            title: "Snacks & Drinks",

            description:
                "Your favourite snacks and refreshing drinks for every moment of the day.",

            count: "60+",

            button: "Explore Snacks",

            icon: "bi-cup-straw"

        }

    };



    /* =================================================
       IMPORTANT:
       DIFFERENT NAME TO AVOID CONFLICT
    ================================================= */

    const showcaseCategoryButtons =
        document.querySelectorAll(
            ".category-nav-item"
        );


    const categoryDisplay =
        document.getElementById(
            "categoryDisplay"
        );


    const categoryTag =
        document.getElementById(
            "categoryTag"
        );


    const categoryTitle =
        document.getElementById(
            "categoryTitle"
        );


    const categoryDescription =
        document.getElementById(
            "categoryDescription"
        );


    const categoryCount =
        document.getElementById(
            "categoryCount"
        );


    const categoryExplore =
        document.getElementById(
            "categoryExplore"
        );


    const categoryIcon =
        document.getElementById(
            "categoryIcon"
        );



    /* =================================================
       CHANGE CATEGORY
    ================================================= */

    function changeCategory(category) {

        const data =
            categoryData[category];


        if (!data) {

            return;

        }


        /*
         * Agar section HTML page par
         * exist nahi karta to kuch na karo.
         */

        if (
            !categoryDisplay ||
            !categoryTag ||
            !categoryTitle ||
            !categoryDescription ||
            !categoryCount ||
            !categoryExplore ||
            !categoryIcon
        ) {

            return;

        }



        /* Animation */

        categoryDisplay.classList.remove(
            "changing"
        );


        void categoryDisplay.offsetWidth;


        categoryDisplay.classList.add(
            "changing"
        );



        /* Update text */

        categoryTag.textContent =
            data.tag;


        categoryTitle.textContent =
            data.title;


        categoryDescription.textContent =
            data.description;


        categoryCount.textContent =
            data.count;



        /* Update button */

        categoryExplore.innerHTML = `

            ${data.button}

            <span>
                <i class="bi bi-arrow-right"></i>
            </span>

        `;



        /* Update icon */

        categoryIcon.innerHTML = `

            <i class="bi ${data.icon}"></i>

        `;



        /* Active category */

        showcaseCategoryButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        const activeButton =
            document.querySelector(
                `.category-nav-item[data-category="${category}"]`
            );


        if (activeButton) {

            activeButton.classList.add(
                "active"
            );

        }

    }



    /* =================================================
       CATEGORY CLICK
    ================================================= */

    showcaseCategoryButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const category =
                        this.dataset.category;


                    changeCategory(
                        category
                    );

                }
            );

        }
    );



    /* =================================================
       EXPLORE BUTTON
    ================================================= */

    if (categoryExplore) {

        categoryExplore.addEventListener(
            "click",
            function () {

                const productsSection =
                    document.getElementById(
                        "shop-products"
                    );


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }



    /* =================================================
       DEFAULT CATEGORY
    ================================================= */

    if (
        showcaseCategoryButtons.length > 0
    ) {

        changeCategory("fruits");

    }


});

/* =====================================================
   SECTION 3 — PRODUCT FILTERS
===================================================== */

const productFilters =
    document.querySelectorAll(".product-filter");

const productCards =
    document.querySelectorAll(".popular-product-card");

productFilters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        /* Remove active */
        productFilters.forEach(function (btn) {
            btn.classList.remove("active");
        });

        /* Add active */
        this.classList.add("active");

        const category =
            this.textContent.trim().toLowerCase();

        productCards.forEach(function (card) {

            const productCategory =
                card.querySelector(".product-category");

            if (!productCategory) return;

            const productText =
                productCategory.textContent
                    .trim()
                    .toLowerCase();

            if (
                category === "all" ||
                productText.includes(category.replace("vegetables", "vegetables"))
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =====================================================
   SECTION 3 — PRODUCT FAVORITES
===================================================== */

const productFavoriteButtons =
    document.querySelectorAll(".product-favorite");

productFavoriteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        this.classList.toggle("active");

        const icon =
            this.querySelector("i");

        if (!icon) return;

        if (this.classList.contains("active")) {

            icon.classList.remove("bi-heart");

            icon.classList.add("bi-heart-fill");

        } else {

            icon.classList.remove("bi-heart-fill");

            icon.classList.add("bi-heart");

        }

    });

});


/* =====================================================
   SECTION 3 — PRODUCT CART BUTTON
   Existing addToCart() will be used
===================================================== */

const productCartButtons =
    document.querySelectorAll(".product-cart-btn");

productCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        this.classList.add("added");

        const icon =
            this.querySelector("i");

        if (icon) {

            icon.classList.remove("bi-plus");

            icon.classList.add("bi-check");

        }

        setTimeout(function () {

            button.classList.remove("added");

            if (icon) {

                icon.classList.remove("bi-check");

                icon.classList.add("bi-plus");

            }

        }, 1200);

    });

});

/* =====================================================
   SECTION 3 — SHOP PRODUCT FUNCTIONALITY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const productsGrid =
        document.getElementById("shopProductsGrid");

    const searchInput =
        document.getElementById("catalogSearch");

    const categoryButtons =
        document.querySelectorAll(".catalog-filter");

    const sortSelect =
        document.getElementById("productSort");

    const productCount =
        document.getElementById("productsCount");

    const noResults =
        document.getElementById("shopNoResults");


    if (!productsGrid) return;


    let products = Array.from(
        productsGrid.querySelectorAll(".shop-product-card")
    );


    /* =================================================
       FILTER + SEARCH + SORT
    ================================================= */

    function updateProducts() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        const activeButton =
            document.querySelector(
                ".catalog-filter.active"
            );

        const selectedCategory =
            activeButton
                ? activeButton.dataset.category
                : "all";


        /* ---------------------------------------------
           FILTER PRODUCTS
        --------------------------------------------- */

        let visibleProducts =
            products.filter(function (product) {

                const productName =
                    (
                        product.dataset.name || ""
                    ).toLowerCase();

                const productCategory =
                    (
                        product.dataset.category || ""
                    ).toLowerCase();


                const matchesSearch =
                    productName.includes(searchValue);


                const matchesCategory =
                    selectedCategory === "all" ||
                    productCategory === selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            });


        /* ---------------------------------------------
           SORT PRODUCTS
        --------------------------------------------- */

        const sortValue =
            sortSelect
                ? sortSelect.value
                : "default";


        if (sortValue === "low") {

            visibleProducts.sort(function (a, b) {

                return (
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
                );

            });

        }


        else if (sortValue === "high") {

            visibleProducts.sort(function (a, b) {

                return (
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
                );

            });

        }


        else if (sortValue === "name") {

            visibleProducts.sort(function (a, b) {

                return (
                    a.dataset.name || ""
                ).localeCompare(
                    b.dataset.name || ""
                );

            });

        }


        /* ---------------------------------------------
           HIDE ALL PRODUCTS
        --------------------------------------------- */

        products.forEach(function (product) {

            product.style.display = "none";

        });


        /* ---------------------------------------------
           SHOW MATCHING PRODUCTS
        --------------------------------------------- */

        visibleProducts.forEach(function (product) {

            product.style.display = "";

            productsGrid.appendChild(product);

        });


        /* ---------------------------------------------
           PRODUCT COUNT
        --------------------------------------------- */

        if (productCount) {

            productCount.textContent =
                visibleProducts.length;

        }


        /* ---------------------------------------------
           NO RESULTS
        --------------------------------------------- */

        if (noResults) {

            if (visibleProducts.length === 0) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }

    }


    /* =================================================
       CATEGORY BUTTONS
    ================================================= */

    categoryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                /* Remove active */

                categoryButtons.forEach(
                    function (btn) {

                        btn.classList.remove("active");

                    }
                );


                /* Add active */

                this.classList.add("active");


                /* Update products */

                updateProducts();

            }
        );

    });


    /* =================================================
       PRODUCT SEARCH
    ================================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                updateProducts();

            }
        );

    }


    /* =================================================
       SORT PRODUCTS
    ================================================= */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            function () {

                updateProducts();

            }
        );

    }


    /* =================================================
       FAVORITE BUTTONS
    ================================================= */

    function setupFavoriteButtons() {

        const favoriteButtons =
            document.querySelectorAll(
                ".shop-product-heart"
            );


        favoriteButtons.forEach(
            function (button) {

                if (
                    button.dataset.favoriteReady === "true"
                ) {
                    return;
                }


                button.dataset.favoriteReady =
                    "true";


                button.addEventListener(
                    "click",
                    function () {

                        this.classList.toggle(
                            "active"
                        );


                        const icon =
                            this.querySelector("i");


                        if (!icon) return;


                        if (
                            this.classList.contains(
                                "active"
                            )
                        ) {

                            icon.classList.remove(
                                "bi-heart"
                            );

                            icon.classList.add(
                                "bi-heart-fill"
                            );

                        } else {

                            icon.classList.remove(
                                "bi-heart-fill"
                            );

                            icon.classList.add(
                                "bi-heart"
                            );

                        }

                    }
                );

            }
        );

    }


    /* =================================================
       ADD TO CART BUTTONS
    ================================================= */

    function setupCartButtons() {

        const cartButtons =
            document.querySelectorAll(
                ".shop-add-cart"
            );


        cartButtons.forEach(
            function (button) {

                if (
                    button.dataset.cartReady === "true"
                ) {
                    return;
                }


                button.dataset.cartReady =
                    "true";


                button.addEventListener(
                    "click",
                    function () {

                        const icon =
                            this.querySelector("i");


                        /* Button animation */

                        this.classList.add("added");


                        if (icon) {

                            icon.classList.remove(
                                "bi-plus"
                            );

                            icon.classList.add(
                                "bi-check"
                            );

                        }


                        /* --------------------------------
                           Existing addToCart function
                        -------------------------------- */

                        const card =
                            this.closest(
                                ".shop-product-card"
                            );


                        if (card) {

                            const name =
                                card.dataset.name;


                            const price =
                                Number(
                                    card.dataset.price
                                );


                            const image =
                                card.querySelector(
                                    ".shop-product-image img"
                                );


                            const imageSrc =
                                image
                                    ? image.getAttribute("src")
                                    : "";


                            if (
                                typeof addToCart ===
                                "function"
                            ) {

                                addToCart(
                                    name,
                                    price,
                                    imageSrc
                                );

                            }

                        }


                        /* Reset button */

                        setTimeout(
                            function () {

                                button.classList.remove(
                                    "added"
                                );


                                if (icon) {

                                    icon.classList.remove(
                                        "bi-check"
                                    );

                                    icon.classList.add(
                                        "bi-plus"
                                    );

                                }

                            },
                            1000
                        );

                    }
                );

            }
        );

    }


    /* =================================================
       INITIALIZE
    ================================================= */

    setupFavoriteButtons();

    setupCartButtons();

    updateProducts();

});
/* =====================================================
   SECTION 4 — DAILY DEAL COUNTDOWN
===================================================== */

(function () {

    const hoursElement =
        document.getElementById("dealHours");

    const minutesElement =
        document.getElementById("dealMinutes");

    const secondsElement =
        document.getElementById("dealSeconds");


    if (
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    /* 12 hour daily deal */

    let dealTime =
        (12 * 60 * 60) +
        (45 * 60) +
        30;


    function updateDealTimer() {

        const hours =
            Math.floor(
                dealTime / 3600
            );


        const minutes =
            Math.floor(
                (dealTime % 3600) / 60
            );


        const seconds =
            dealTime % 60;


        hoursElement.textContent =
            String(hours).padStart(2, "0");


        minutesElement.textContent =
            String(minutes).padStart(2, "0");


        secondsElement.textContent =
            String(seconds).padStart(2, "0");


        if (dealTime > 0) {

            dealTime--;

        } else {

            dealTime =
                12 * 60 * 60;

        }

    }


    updateDealTimer();


    setInterval(
        updateDealTimer,
        1000
    );

})();
// ==========================================
//    GREENBASKET SHOP — DARK / LIGHT MODE
//    SAME SYSTEM AS HOME PAGE
// ========================================== */

// document.addEventListener("DOMContentLoaded", function () {

//     const themeToggle =
//         document.getElementById("themeToggle");

//     if (!themeToggle) return;


//     const icon =
//         themeToggle.querySelector("i");


    /* ==========================================
       LOAD SAVED THEME
    ========================================== */

    // const savedTheme =
    //     localStorage.getItem("freshTheme");


    // if (savedTheme === "dark") {

    //     document.body.classList.add(
    //         "dark-theme"
    //     );


    //     if (icon) {

    //         icon.classList.remove(
    //             "bi-moon-fill"
    //         );

    //         icon.classList.add(
    //             "bi-sun-fill"
    //         );

    //     }

    // }


    /* ==========================================
       TOGGLE THEME
    ========================================== */

    // themeToggle.addEventListener(
    //     "click",
    //     function () {

    //         document.body.classList.toggle(
    //             "dark-theme"
    //         );


    //         const darkMode =
    //             document.body.classList.contains(
    //                 "dark-theme"
    //             );


    //         if (darkMode) {

    //             if (icon) {

    //                 icon.classList.remove(
    //                     "bi-moon-fill"
    //                 );

    //                 icon.classList.add(
    //                     "bi-sun-fill"
    //                 );

    //             }


    //             localStorage.setItem(
    //                 "freshTheme",
    //                 "dark"
    //             );

    //         }

    //         else {

    //             if (icon) {

    //                 icon.classList.remove(
    //                     "bi-sun-fill"
    //                 );

    //                 icon.classList.add(
    //                     "bi-moon-fill"
    //                 );

    //             }


//                 localStorage.setItem(
//                     "freshTheme",
//                     "light"
//                 );

//             }

//         }
//     );

// });
/* ==========================================
   SHOP → CART
========================================== */

function addToCart(name, price, image) {

    let cart =
        JSON.parse(
            localStorage.getItem("freshCart")
        ) || [];


    const existingProduct =
        cart.find(
            product => product.name === name
        );


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


    localStorage.setItem(
        "freshCart",
        JSON.stringify(cart)
    );


    /* Header cart count */

    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        const totalItems =
            cart.reduce(
                (total, product) =>
                    total + product.quantity,
                0
            );

        cartCount.textContent =
            totalItems;

    }


    /* Success message */

    alert(
        name + " added to cart!"
    );

}