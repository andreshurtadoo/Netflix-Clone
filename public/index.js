document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slider-container");

    sliders.forEach(container => {
        const wrapper = container.querySelector(".wrapper");
        const leftBtn = container.querySelector(".left-btn");
        const rightBtn = container.querySelector(".right-btn");

        // Calcula cuánto se moverá (el 75% del ancho visible del carrusel)
        const getScrollAmount = () => wrapper.clientWidth * 0.75;

        rightBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        });

        leftBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
        });
    });
});