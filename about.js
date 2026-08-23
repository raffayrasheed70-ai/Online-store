document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       SECTION 1
    ========================================== */

    const section1Elements = document.querySelectorAll(
        ".about1-content, .about1-visual"
    );


    /* ==========================================
       SECTION 2
    ========================================== */

    const section2Elements = document.querySelectorAll(
        ".about2-heading, .about2-visual, .about2-content"
    );


    /* ==========================================
       OBSERVER
    ========================================== */

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    /* Section 1 */

                    if (
                        entry.target.classList.contains(
                            "about1-content"
                        ) ||
                        entry.target.classList.contains(
                            "about1-visual"
                        )
                    ) {

                        entry.target.classList.add(
                            "about1-visible"
                        );

                    }


                    /* Section 2 */

                    if (
                        entry.target.classList.contains(
                            "about2-heading"
                        ) ||
                        entry.target.classList.contains(
                            "about2-visual"
                        ) ||
                        entry.target.classList.contains(
                            "about2-content"
                        )
                    ) {

                        entry.target.classList.add(
                            "about2-visible"
                        );

                    }


                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }
    );


    /* Observe Section 1 */

    section1Elements.forEach(function (element) {

        observer.observe(element);

    });


    /* Observe Section 2 */

    section2Elements.forEach(function (element) {

        observer.observe(element);

    });

});
document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ALL ABOUT PAGE SCROLL ELEMENTS
    ===================================================== */

    const scrollElements = document.querySelectorAll(

        ".about1-content, " +
        ".about1-visual, " +

        ".about2-heading, " +
        ".about2-visual, " +
        ".about2-content, " +

        ".about3-heading, " +
        ".about3-card"

    );


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {


                    /* ==============================
                       SECTION 1
                    ============================== */

                    if (
                        entry.target.classList.contains(
                            "about1-content"
                        ) ||
                        entry.target.classList.contains(
                            "about1-visual"
                        )
                    ) {

                        entry.target.classList.add(
                            "about1-visible"
                        );

                    }


                    /* ==============================
                       SECTION 2
                    ============================== */

                    if (
                        entry.target.classList.contains(
                            "about2-heading"
                        ) ||
                        entry.target.classList.contains(
                            "about2-visual"
                        ) ||
                        entry.target.classList.contains(
                            "about2-content"
                        )
                    ) {

                        entry.target.classList.add(
                            "about2-visible"
                        );

                    }


                    /* ==============================
                       SECTION 3
                    ============================== */

                    if (
                        entry.target.classList.contains(
                            "about3-heading"
                        ) ||
                        entry.target.classList.contains(
                            "about3-card"
                        )
                    ) {

                        entry.target.classList.add(
                            "about3-visible"
                        );

                    }


                    /* Animation only once */

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold: 0.15

        }

    );


    /* =====================================================
       START OBSERVING
    ===================================================== */

    scrollElements.forEach(function (element) {

        observer.observe(element);

    });

});

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ALL ABOUT PAGE ANIMATIONS
    ===================================================== */

    const scrollElements = document.querySelectorAll(

        /* Section 1 */

        ".about1-content, " +
        ".about1-visual, " +

        /* Section 2 */

        ".about2-heading, " +
        ".about2-visual, " +
        ".about2-content, " +

        /* Section 3 */

        ".about3-heading, " +
        ".about3-card, " +

        /* Section 4 */

        ".about4-content, " +
        ".about4-box"

    );


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }


                /* =========================
                   SECTION 1
                ========================= */

                if (
                    entry.target.classList.contains(
                        "about1-content"
                    ) ||
                    entry.target.classList.contains(
                        "about1-visual"
                    )
                ) {

                    entry.target.classList.add(
                        "about1-visible"
                    );

                }


                /* =========================
                   SECTION 2
                ========================= */

                if (
                    entry.target.classList.contains(
                        "about2-heading"
                    ) ||
                    entry.target.classList.contains(
                        "about2-visual"
                    ) ||
                    entry.target.classList.contains(
                        "about2-content"
                    )
                ) {

                    entry.target.classList.add(
                        "about2-visible"
                    );

                }


                /* =========================
                   SECTION 3
                ========================= */

                if (
                    entry.target.classList.contains(
                        "about3-heading"
                    ) ||
                    entry.target.classList.contains(
                        "about3-card"
                    )
                ) {

                    entry.target.classList.add(
                        "about3-visible"
                    );

                }


                /* =========================
                   SECTION 4
                ========================= */

                if (
                    entry.target.classList.contains(
                        "about4-content"
                    ) ||
                    entry.target.classList.contains(
                        "about4-box"
                    )
                ) {

                    entry.target.classList.add(
                        "about4-visible"
                    );

                }


                /* Animation only once */

                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.15
        }

    );


    /* =====================================================
       START OBSERVING
    ===================================================== */

    scrollElements.forEach(function (element) {

        observer.observe(element);

    });

});
