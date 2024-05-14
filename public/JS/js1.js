document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector(".Search_fill_btn_header");
    const pages = document.querySelector(".pages");

    menu.addEventListener("click", (event) => {
        event.preventDefault();
        pages.classList.toggle('active');
    });
});
