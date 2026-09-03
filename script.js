/* =========================================================
   UTSAV RAJESH MADAAN — PORTFOLIO JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            navigation.classList.toggle("active");

        });

    }

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

        });

    });


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            themeToggle.textContent =
                document.body.classList.contains("light-mode")
                    ? "☾"
                    : "☼";

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       NUMBER COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target = Number(counter.dataset.count);

                let current = 0;

                const duration = 1300;

                const startTime = performance.now();

                function animate(time) {

                    const progress =
                        Math.min((time - startTime) / duration, 1);

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    current = Math.floor(target * eased);

                    counter.textContent =
                        target === 85
                            ? current + "+"
                            : current + "+";

                    if (progress < 1) {

                        requestAnimationFrame(animate);

                    } else {

                        counter.textContent = target + "+";

                    }

                }

                requestAnimationFrame(animate);

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       GENERIC SLIDER
    ===================================================== */

    function createSlider(options) {

        const {
            track,
            prev,
            next,
            dotsContainer,
            slidesPerViewDesktop = 1,
            slidesPerViewTablet = 1,
            slidesPerViewMobile = 1,
            autoplay = true,
            interval = 5000
        } = options;

        if (!track) return;

        const slides = Array.from(track.children);

        let currentIndex = 0;

        let timer = null;


        function getSlidesPerView() {

            if (window.innerWidth <= 768) {

                return slidesPerViewMobile;

            }

            if (window.innerWidth <= 1000) {

                return slidesPerViewTablet;

            }

            return slidesPerViewDesktop;

        }


        function getMaxIndex() {

            return Math.max(
                0,
                slides.length - getSlidesPerView()
            );

        }


        function updateSlider() {

            const perView = getSlidesPerView();

            const gap =
                parseFloat(
                    getComputedStyle(slides[0]).marginRight
                ) || 0;

            const slideWidth =
                slides[0].getBoundingClientRect().width + gap;

            track.style.transform =
                `translateX(-${currentIndex * slideWidth}px)`;

            updateDots();

        }


        function createDots() {

            if (!dotsContainer) return;

            dotsContainer.innerHTML = "";

            const numberOfDots =
                getMaxIndex() + 1;

            for (let i = 0; i < numberOfDots; i++) {

                const dot =
                    document.createElement("span");

                dot.className = "slider-dot";

                if (i === currentIndex) {

                    dot.classList.add("active");

                }

                dot.addEventListener("click", () => {

                    currentIndex = i;

                    updateSlider();

                    restartAutoplay();

                });

                dotsContainer.appendChild(dot);

            }

        }


        function updateDots() {

            if (!dotsContainer) return;

            const dots =
                dotsContainer.querySelectorAll(".slider-dot");

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });

        }


        function nextSlide() {

            const maxIndex = getMaxIndex();

            currentIndex++;

            if (currentIndex > maxIndex) {

                currentIndex = 0;

            }

            updateSlider();

        }


        function previousSlide() {

            const maxIndex = getMaxIndex();

            currentIndex--;

            if (currentIndex < 0) {

                currentIndex = maxIndex;

            }

            updateSlider();

        }


        if (next) {

            next.addEventListener("click", () => {

                nextSlide();

                restartAutoplay();

            });

        }


        if (prev) {

            prev.addEventListener("click", () => {

                previousSlide();

                restartAutoplay();

            });

        }


        function startAutoplay() {

            if (!autoplay) return;

            timer = setInterval(
                nextSlide,
                interval
            );

        }


        function restartAutoplay() {

            if (!autoplay) return;

            clearInterval(timer);

            startAutoplay();

        }


        /* TOUCH / SWIPE */

        let startX = 0;

        let endX = 0;

        track.addEventListener("touchstart", event => {

            startX = event.touches[0].clientX;

        }, { passive: true });


        track.addEventListener("touchend", event => {

            endX = event.changedTouches[0].clientX;

            const distance = startX - endX;

            if (Math.abs(distance) > 50) {

                if (distance > 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }

                restartAutoplay();

            }

        });


        window.addEventListener("resize", () => {

            currentIndex =
                Math.min(
                    currentIndex,
                    getMaxIndex()
                );

            createDots();

            updateSlider();

        });


        createDots();

        updateSlider();

        startAutoplay();

    }


    /* =====================================================
       TOOLKIT SLIDER
    ===================================================== */

    createSlider({

        track: document.querySelector(".toolkit-track"),

        prev: document.getElementById("toolkitPrev"),

        next: document.getElementById("toolkitNext"),

        dotsContainer:
            document.getElementById("toolkitDots"),

        slidesPerViewDesktop: 3,

        slidesPerViewTablet: 2,

        slidesPerViewMobile: 1,

        autoplay: true,

        interval: 4500

    });


    /* =====================================================
       PROJECT SLIDER
    ===================================================== */

    createSlider({

        track: document.querySelector(".project-track"),

        prev: document.getElementById("projectPrev"),

        next: document.getElementById("projectNext"),

        dotsContainer:
            document.getElementById("projectDots"),

        slidesPerViewDesktop: 1,

        slidesPerViewTablet: 1,

        slidesPerViewMobile: 1,

        autoplay: true,

        interval: 6000

    });


    /* =====================================================
       3D CARD EFFECT
    ===================================================== */

    const cards = document.querySelectorAll(
        ".toolkit-card, .project-card, .skill-card, .stat-card"
    );

    if (window.innerWidth > 900) {

        cards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX = rect.width / 2;

                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    const cursorDot =
        document.querySelector(".cursor-dot");


    if (
        cursor &&
        cursorDot &&
        window.innerWidth > 900
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;


        window.addEventListener("mousemove", event => {

            mouseX = event.clientX;

            mouseY = event.clientY;

            cursorDot.style.left =
                mouseX + "px";

            cursorDot.style.top =
                mouseY + "px";

        });


        function animateCursor() {

            cursorX +=
                (mouseX - cursorX) * .15;

            cursorY +=
                (mouseY - cursorY) * .15;

            cursor.style.left =
                cursorX + "px";

            cursor.style.top =
                cursorY + "px";

            requestAnimationFrame(
                animateCursor
            );

        }

        animateCursor();


        const interactive =
            document.querySelectorAll(
                "a, button, .toolkit-card, .project-card"
            );


        interactive.forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursor.style.width = "55px";

                cursor.style.height = "55px";

            });


            element.addEventListener("mouseleave", () => {

                cursor.style.width = "35px";

                cursor.style.height = "35px";

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    function updateActiveNavigation() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 200;

            if (window.scrollY >= sectionTop) {

                current = section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* =====================================================
       ESCAPE CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navigation.classList.remove("active");

        }

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroBg =
        document.querySelector(".hero-bg-text");


    if (heroBg && window.innerWidth > 900) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX / window.innerWidth - .5) * 20;

                const y =
                    (event.clientY / window.innerHeight - .5) * 20;

                heroBg.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }

});
