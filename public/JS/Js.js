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
    breakpoints: {
        // When window width is <= 400px
        400: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // When window width is <= 991px
        991: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // When window width is <= 1199px
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    }
    );





    document.addEventListener('DOMContentLoaded', () => {
        const menu = document.querySelector(".Search_fill_btn_header");
        const pages = document.querySelector(".pages");
        let dark_light = document.querySelector(".dark_light");
        var btn = document.querySelector('.btn');
        var close_btn = document.querySelector('.close_btn');
        var msg = document.querySelector('.msg');
        var emailInput = document.querySelector('.email-box input');


        dark_light.addEventListener("click" , () => {
            document.body.classList.toggle("dark_mode")
            }
            );

        menu.addEventListener("click", (event) => {
            event.preventDefault();
            pages.classList.toggle('active');
        });

        btn.addEventListener('click', function (event) {
            event.preventDefault(); 


            if (validateEmail(emailInput.value)) {
                msg.classList.add('active');
                action = setTimeout(function () {
                    msg.classList.remove('active');
                }, 5000);
            }
        });

        close_btn.addEventListener('click', function () {
            msg.classList.remove('active');
            clearTimeout(action);
        });

        function validateEmail(email) {
            var regex = /\S+@\S+\.\S+/;
            return regex.test(email);
        }

        function clearEmailField() {
            var emailInput = document.getElementById('email');
            emailInput.value = '';
        }

        document.getElementById('clearButton').addEventListener('click', clearEmailField);
    });
    
        