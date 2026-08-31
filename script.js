/* =========================================
   PORTFOLIO JAVASCRIPT
   UTSAV RAJESH MADAAN
========================================= */


/* =========================================
   SELECT ELEMENTS
========================================= */

const body = document.body;

const header = document.getElementById("header");

const themeToggle =
    document.getElementById("themeToggle");

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");



/* =========================================
   DARK / LIGHT MODE
========================================= */

const savedTheme =
    localStorage.getItem("utsav-theme");


if (savedTheme) {

    body.dataset.theme = savedTheme;

}


updateThemeIcon();



themeToggle.addEventListener(
    "click",
    () => {

        if (
            body.dataset.theme === "light"
        ) {

            body.dataset.theme = "dark";

        } else {

            body.dataset.theme = "light";

        }


        localStorage.setItem(
            "utsav-theme",
            body.dataset.theme
        );


        updateThemeIcon();

    }
);



function updateThemeIcon() {

    if (
        body.dataset.theme === "light"
    ) {

        themeToggle.textContent = "☾";

    } else {

        themeToggle.textContent = "☼";

    }

}



/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener(
    "click",
    () => {

        nav.classList.toggle("open");

    }
);



/* Close menu after clicking a link */

document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

            }
        );

    });



/* =========================================
   HEADER SCROLL EFFECT
========================================= */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 30
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    },
    {
        passive: true
    }
);



/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );



document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(
            element
        );

    });



/* =========================================
   CUSTOM CURSOR
========================================= */

const dot =
    document.querySelector(
        ".cursor-dot"
    );

const ring =
    document.querySelector(
        ".cursor-ring"
    );



if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    let mouseX = 0;

    let mouseY = 0;

    let ringX = 0;

    let ringY = 0;



    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;

            mouseY = event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );



    function animateCursor() {

        ringX +=
            (mouseX - ringX) *
            0.16;

        ringY +=
            (mouseY - ringY) *
            0.16;


        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();



    /* Cursor grows on interactive elements */

    document
        .querySelectorAll(
            "a, button, .project-card, .profile-card"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    ring.style.width =
                        "45px";

                    ring.style.height =
                        "45px";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    ring.style.width =
                        "28px";

                    ring.style.height =
                        "28px";

                }
            );

        });

}



/* =========================================
   INTERACTIVE PROFILE CARD
========================================= */

const card =
    document.querySelector(
        ".profile-card"
    );

const heroWrap =
    document.querySelector(
        ".hero-card-wrap"
    );



if (
    card &&
    heroWrap &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    heroWrap.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroWrap.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                0.5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                0.5;


            card.style.transform =

                `rotate(${x * 5 + 3}deg)
                 translate(${x * 8}px, ${y * 8}px)`;

        }
    );



    heroWrap.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "rotate(3deg)";

        }
    );

}



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav a"
    );



const activeObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        navLinks.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",

                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`
                                );

                            }
                        );

                    }

                }
            );

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );



sections.forEach(
    section => {

        activeObserver.observe(
            section
        );

    }
);



/* =========================================
   SMOOTH BUTTON FEEDBACK
========================================= */

document
    .querySelectorAll(".btn")
    .forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.style.transform =
                    "translateY(-3px)";

            }
        );

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });



/* =========================================
   PROJECT CARD TILT EFFECT
========================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );



if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${-y * 2}deg)
                     rotateY(${x * 2}deg)
                     translateY(-7px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}



/* =========================================
   KEYBOARD ACCESSIBILITY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            nav.classList.remove(
                "open"
            );

        }

    }
);