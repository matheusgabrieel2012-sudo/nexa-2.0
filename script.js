
document.addEventListener("DOMContentLoaded", () => {

    // MENU MOBILE
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link, .nav-cta");

    function closeMenu() {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }

    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    navItems.forEach((item) => {
        item.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (
            navLinks.classList.contains("open") &&
            !navLinks.contains(event.target) &&
            !navToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // VÍDEO DO HERO
    const backgroundVideo = document.querySelector(".hero-video");

    if (backgroundVideo) {
        backgroundVideo.muted = true;

        const playVideo = backgroundVideo.play();

        if (playVideo !== undefined) {
            playVideo.catch(() => {
                // Alguns navegadores podem bloquear o autoplay.
            });
        }
    }

    // ANIMAÇÕES DE ENTRADA
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // PROGRESSO DA TRILHA
    const journey = document.querySelector(".journey");
    const journeyFill = document.getElementById("journeyTrackFill");

    function updateJourney() {
        if (!journey || !journeyFill) return;

        const rect = journey.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 0.65;
        const end = rect.height + windowHeight * 0.2;

        const progress = (start - rect.top) / end;
        const percentage = Math.max(0, Math.min(100, progress * 100));

        journeyFill.style.height = `${percentage}%`;
    }

    window.addEventListener("scroll", updateJourney, { passive: true });
    window.addEventListener("resize", updateJourney);
    updateJourney();

    // MENU ATIVO DE ACORDO COM A SEÇÃO
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navigationLinks.forEach((link) => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${entry.target.id}`
                            );
                        });
                    }
                });
            },
            {
                threshold: 0.35
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // VOLTAR AO TOPO
    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {
        backToTop.classList.toggle("visible", window.scrollY > 500);
    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // ANO AUTOMÁTICO
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});
