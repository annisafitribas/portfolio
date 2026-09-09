/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const header = document.getElementById("header");

const navbar = document.getElementById("navbar");

const menuToggle = document.getElementById("menu-toggle");

const themeToggle = document.getElementById("theme-toggle");

const backToTop = document.getElementById("back-to-top");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section[id]");

const revealElements =
    document.querySelectorAll(".reveal");

const yearElement =
    document.getElementById("year");


/* =========================================
   CURRENT YEAR
========================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================
   MOBILE MENU
========================================= */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");

        const icon =
            menuToggle.querySelector("i");

        if (navbar.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        const icon =
            menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* =========================================
   HEADER SCROLL
========================================= */

function handleHeader() {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeader
);

handleHeader();


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* =========================================
   BACK TO TOP
========================================= */

function handleBackToTop() {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleBackToTop
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================
   DARK MODE
========================================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    updateThemeIcon();

}


function updateThemeIcon() {

    const icon =
        themeToggle.querySelector("i");

    if (
        document.body.classList.contains("dark")
    ) {

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

    } else {

        icon.classList.remove(
            "fa-sun"
        );

        icon.classList.add(
            "fa-moon"
        );

    }

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        const theme =
            document.body.classList.contains("dark")
                ? "dark"
                : "light";

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

        updateThemeIcon();

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {

                    return;

                }


                event.preventDefault();


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.offsetTop -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


/* =========================================
   KEYBOARD ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            navbar.classList.remove(
                "open"
            );

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }
);