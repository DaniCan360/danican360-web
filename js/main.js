// =========================================================
// DANICAN 360 WEB
// JavaScript principal
// =========================================================



// =========================================================
// AÑO AUTOMÁTICO DEL FOOTER
// =========================================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}



// =========================================================
// MENÚ PARA CELULARES
// =========================================================

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        const menuIsOpen = nav.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            menuIsOpen ? "true" : "false"
        );

    });

}



// =========================================================
// ENLACES DE NAVEGACIÓN
// =========================================================

const navLinks = document.querySelectorAll('.nav a[href^="#"]');



// =========================================================
// CERRAR MENÚ DESPUÉS DE SELECCIONAR UNA OPCIÓN
// =========================================================

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (nav) {
            nav.classList.remove("active");
        }

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }

    });

});



// =========================================================
// PESTAÑA ACTIVA SEGÚN LA SECCIÓN VISIBLE
// =========================================================

// Relacionamos automáticamente cada enlace del menú
// con su sección correspondiente del index.html

const sections = Array.from(navLinks)
    .map((link) => {

        const sectionId = link.getAttribute("href");

        return document.querySelector(sectionId);

    })
    .filter((section) => section !== null);



function updateActiveNavigation() {

    if (sections.length === 0) {
        return;
    }


    const header = document.querySelector(".header");

    const headerHeight = header
        ? header.offsetHeight
        : 0;


    // Punto de referencia para determinar qué sección
    // está siendo visualizada actualmente.
    const referencePoint =
        window.scrollY +
        headerHeight +
        (window.innerHeight * 0.35);


    // Por defecto consideramos Inicio como sección activa.
    let activeSection = sections[0];


    sections.forEach((section) => {

        if (referencePoint >= section.offsetTop) {
            activeSection = section;
        }

    });


    // Si llegamos prácticamente al final de la página,
    // activamos la última sección.
    const pageBottom =
        window.innerHeight + window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight;


    if (pageBottom >= documentHeight - 10) {
        activeSection = sections[sections.length - 1];
    }


    // Quitamos "active" de todas las pestañas
    // y lo aplicamos únicamente a la correcta.

    navLinks.forEach((link) => {

        const targetId =
            link.getAttribute("href").substring(1);

        const isActive =
            activeSection &&
            targetId === activeSection.id;


        link.classList.toggle("active", isActive);


        // Accesibilidad
        if (isActive) {

            link.setAttribute("aria-current", "page");

        } else {

            link.removeAttribute("aria-current");

        }

    });

}



// =========================================================
// ACTUALIZAR NAVEGACIÓN AL HACER SCROLL
// =========================================================

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);



// =========================================================
// ACTUALIZAR SI CAMBIA EL TAMAÑO DE LA VENTANA
// =========================================================

window.addEventListener(
    "resize",
    updateActiveNavigation
);



// =========================================================
// ACTUALIZAR AL TERMINAR DE CARGAR LA PÁGINA
// =========================================================

window.addEventListener(
    "load",
    updateActiveNavigation
);



// =========================================================
// FILTRO DE PRODUCTOS
// =========================================================

const filterButtons =
    document.querySelectorAll(".filter-button");

const productCards =
    document.querySelectorAll(".product-card");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Obtenemos la categoría seleccionada
        const selectedFilter =
            button.dataset.filter;


        // Quitamos el estado activo
        // de todos los botones
        filterButtons.forEach((filterButton) => {

            filterButton.classList.remove("active");

        });


        // Activamos el botón seleccionado
        button.classList.add("active");


        // Recorremos todos los productos
        productCards.forEach((card) => {

            const productCategory =
                card.dataset.category;


            // Mostrar todos
            if (selectedFilter === "all") {

                card.classList.remove("hidden");

                return;

            }


            // Mostrar solamente
            // la categoría seleccionada
            if (productCategory === selectedFilter) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});