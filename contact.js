document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GREENBASKET CONTACT PAGE JS
    ===================================================== */

    const animatedElements =
        document.querySelectorAll("[data-animation]");


    console.log(
        "Contact animation elements:",
        animatedElements.length
    );


    /* =====================================================
       ANIMATION SYSTEM
       
       Page load par animation OFF rahegi.
       Is wajah se first section normally visible rahega.
    ===================================================== */

    let animationStarted = false;


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    /*
                     * Element viewport mein enter hua
                     * Animation ON
                     */

                    entry.target.classList.add(
                        "animation-show"
                    );

                } else {

                    /*
                     * Element viewport se bahar gaya
                     * Animation reset
                     */

                    entry.target.classList.remove(
                        "animation-show"
                    );

                }

            });

        },

        {
            threshold: 0.15,

            rootMargin:
                "0px 0px -80px 0px"
        }

    );


    /* =====================================================
       OBSERVE ALL ELEMENTS
    ===================================================== */

    animatedElements.forEach(function (element) {

        observer.observe(element);

    });


    /* =====================================================
       START ANIMATION ONLY WHEN USER SCROLLS
    ===================================================== */

    window.addEventListener(
        "scroll",
        function () {

            /*
             * Sirf first scroll par class add hogi.
             */

            if (!animationStarted) {

                animationStarted = true;

                document.body.classList.add(
                    "scroll-animation-ready"
                );

            }

        },
        {
            passive: true
        }
    );



    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const button =
            item.querySelector(".faq-question");


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                const isActive =
                    item.classList.contains("active");


                /*
                 * Pehle sab FAQs close
                 */

                faqItems.forEach(function (faq) {

                    faq.classList.remove("active");

                });


                /*
                 * Clicked FAQ open
                 */

                if (!isActive) {

                    item.classList.add("active");

                }

            }
        );

    });



    /* =====================================================
       HERO BUTTON
    ===================================================== */

    const heroButton =
        document.querySelector(".hero-button");


    if (heroButton) {

        heroButton.addEventListener(
            "click",
            function (event) {

                const targetID =
                    this.getAttribute("href");


                if (
                    !targetID ||
                    !targetID.startsWith("#")
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetID);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    }



    /* =====================================================
       LIVE CHAT
    ===================================================== */

    const chatButton =
        document.getElementById("chatButton");


    if (chatButton) {

        chatButton.addEventListener(
            "click",
            function () {

                alert(
                    "Our live chat support will be available soon."
                );

            }
        );

    }



    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.querySelector(
            ".search-box input"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    const value =
                        this.value.trim();


                    if (value !== "") {

                        window.location.href =
                            "shop.html?search=" +
                            encodeURIComponent(value);

                    }

                }

            }
        );

    }

});
/* =====================================================
   CONTACT MESSAGE FORM
===================================================== */

const contactForm =
    document.getElementById("contactMessageForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const subject =
            document.getElementById("messageSubject").value;

        const message =
            document.getElementById("contactMessage").value.trim();


        if (!name || !email || !subject || !message) {

            alert("Please fill in all required fields.");

            return;
        }


        alert(
            "Thank you, " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    });

}