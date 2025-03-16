// const menuIcon = document.querySelector('.open-menu');


document.addEventListener('click', (e) => {
    if (e.target.closest('.open-menu')) {
        document.documentElement.classList.toggle('active');
    }
});