const menuIcon = document.querySelector('.menu-header__button');


document.addEventListener('click', (e) => {
    if (e.target.closest('.menu-header__button')) {
        document.documentElement.classList.toggle('open-menu');
    }
});