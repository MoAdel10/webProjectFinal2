var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    },
    );
let dark_light = document.querySelector(".dark_light")

    dark_light.addEventListener("click" , () => {
    document.body.classList.toggle("dark_mode")
    }
    );
console.log(dark_light);