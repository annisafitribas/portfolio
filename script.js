/* =========================================================
   AN NISA FITRI — PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const header = document.getElementById("header");

const navbar = document.getElementById("navbar");

const menuToggle =
    document.getElementById("menuToggle");

const themeToggle =
    document.getElementById("themeToggle");

const backToTop =
    document.getElementById("backToTop");

const navLinks =
    document.querySelectorAll(".nav-link");

const revealElements =
    document.querySelectorAll(".reveal");


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && navbar) {

    menuToggle.addEventListener(
        "click",
        () => {

            navbar.classList.toggle("active");

            const icon =
                menuToggle.querySelector("i");

            if (
                navbar.classList.contains("active")
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                if (!navbar) return;

                navbar.classList.remove(
                    "active"
                );


                const icon =
                    menuToggle?.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );

    }
);


/* =========================================================
   HEADER ON SCROLL
========================================================= */

function updateHeader() {

    if (!header) return;


    if (window.scrollY > 30) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader
);

updateHeader();


/* =========================================================
   DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark"
    );

}


function updateThemeIcon() {

    if (!themeToggle) return;


    const icon =
        themeToggle.querySelector("i");


    if (
        document.body.classList.contains(
            "dark"
        )
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


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const theme =
                document.body.classList.contains(
                    "dark"
                )
                    ? "dark"
                    : "light";


            localStorage.setItem(
                "portfolio-theme",
                theme
            );


            updateThemeIcon();

        }
    );

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
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


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                navLinks.forEach(
                    link => {

                        link.classList.remove(
                            "active"
                        );


                        const target =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            target ===
                            `#${sectionId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* =========================================================
   BACK TO TOP
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) return;


        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
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
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.offsetTop -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


/* =========================================================
   IMAGE FALLBACK
========================================================= */

document
    .querySelectorAll(
        ".timeline-marker img"
    )
    .forEach(
        image => {

            image.addEventListener(
                "error",
                function () {

                    this.style.display =
                        "none";


                    const marker =
                        this.parentElement;


                    marker.classList.add(
                        "image-error"
                    );


                    if (
                        !marker.querySelector(
                            ".fallback-icon"
                        )
                    ) {

                        const icon =
                            document.createElement(
                                "i"
                            );


                        icon.className =
                            "fa-solid fa-image fallback-icon";


                        marker.appendChild(
                            icon
                        );

                    }

                }
            );

        }
    );

/* ========================================
   BACKGROUND MUSIC
======================================== */

const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

if (backgroundMusic && musicToggle) {

    /* ========================================
       PENGATURAN AWAL
    ======================================== */

    // Volume awal
    backgroundMusic.volume = 0.35;

    // Pastikan musik mengulang
    backgroundMusic.loop = true;


    /* ========================================
       UPDATE TOMBOL MUSIK
    ======================================== */

    function updateMusicButton() {

        if (backgroundMusic.paused) {

            // Musik mati
            musicToggle.innerHTML =
                '<i class="fa-solid fa-volume-xmark"></i>';

            musicToggle.classList.remove("playing");

            musicToggle.setAttribute(
                "aria-label",
                "Turn on background music"
            );

            musicToggle.setAttribute(
                "title",
                "Turn on background music"
            );

        } else {

            // Musik hidup
            musicToggle.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';

            musicToggle.classList.add("playing");

            musicToggle.setAttribute(
                "aria-label",
                "Turn off background music"
            );

            musicToggle.setAttribute(
                "title",
                "Turn off background music"
            );
        }
    }


    /* ========================================
       COBA AUTOPLAY SAAT WEBSITE DIBUKA
    ======================================== */

    function tryPlayMusic() {

        if (!backgroundMusic.paused) {
            updateMusicButton();
            return;
        }

        backgroundMusic
            .play()
            .then(() => {

                // Autoplay berhasil
                console.log("Background music started.");

                updateMusicButton();

                // Hapus fallback karena tidak diperlukan lagi
                removeInteractionListeners();

            })
            .catch((error) => {

                // Autoplay diblokir browser
                console.log(
                    "Autoplay diblokir browser.",
                    error
                );

                updateMusicButton();
            });
    }


    /* ========================================
       FALLBACK SETELAH USER BERINTERAKSI
    ======================================== */

    function startMusicAfterInteraction(event) {

        // Jangan trigger dari tombol musik
        if (
            event.target.closest &&
            event.target.closest("#musicToggle")
        ) {
            return;
        }

        // Kalau musik masih mati, coba hidupkan
        if (backgroundMusic.paused) {

            backgroundMusic
                .play()
                .then(() => {

                    console.log(
                        "Music started after user interaction."
                    );

                    updateMusicButton();

                    // Setelah berhasil, hapus listener
                    removeInteractionListeners();

                })
                .catch((error) => {

                    console.log(
                        "Musik gagal diputar:",
                        error
                    );

                });

        } else {

            removeInteractionListeners();

        }
    }


    /* ========================================
       REMOVE FALLBACK LISTENERS
    ======================================== */

    function removeInteractionListeners() {

        document.removeEventListener(
            "click",
            startMusicAfterInteraction
        );

        document.removeEventListener(
            "touchstart",
            startMusicAfterInteraction
        );

        document.removeEventListener(
            "keydown",
            startMusicAfterInteraction
        );
    }


    /* ========================================
       TAMBAHKAN FALLBACK INTERACTION
    ======================================== */

    document.addEventListener(
        "click",
        startMusicAfterInteraction
    );

    document.addEventListener(
        "touchstart",
        startMusicAfterInteraction
    );

    document.addEventListener(
        "keydown",
        startMusicAfterInteraction
    );


    /* ========================================
       MUSIC TOGGLE BUTTON
    ======================================== */

    musicToggle.addEventListener("click", (event) => {

        // Jangan biarkan event diteruskan
        event.stopPropagation();


        // =====================================
        // MUSIK SEDANG MATI
        // =====================================

        if (backgroundMusic.paused) {

            backgroundMusic
                .play()
                .then(() => {

                    updateMusicButton();

                    // Karena user sudah mengizinkan musik,
                    // fallback tidak diperlukan lagi
                    removeInteractionListeners();

                })
                .catch((error) => {

                    console.log(
                        "Musik tidak dapat diputar:",
                        error
                    );

                });

        }


        // =====================================
        // MUSIK SEDANG HIDUP
        // =====================================

        else {

            backgroundMusic.pause();

            updateMusicButton();

        }

    });


    /* ========================================
       EVENT MUSIC
    ======================================== */

    backgroundMusic.addEventListener(
        "play",
        updateMusicButton
    );

    backgroundMusic.addEventListener(
        "pause",
        updateMusicButton
    );


    /* ========================================
       SAAT HALAMAN SELESAI LOAD
    ======================================== */

    window.addEventListener("load", () => {

        // Set icon terlebih dahulu
        updateMusicButton();

        // Coba autoplay
        tryPlayMusic();

    });

}