"use strict";

// Задача №1
// Дано в html: три елементи з класом item.
// При кліку на кожен з елментів додати клас active,
//     при повторному кліку прибрати клас

function changeClass(e) {
    if (e.target.closest('.item')) {
        e.target.classList.toggle('active')
    }
}

document.addEventListener("click", changeClass)


// Задача №2
// Дано в css / scss: body прозорий
// При повному завантаженню сторінки додати клас до body який прибирає прозорість.

window.addEventListener("load", function () {
    setTimeout(() => {
        document.body.classList.add('showed')
    }, 2000)
})

//     Задача №3
// Дано в html: header main footer
// Пи наведенні курсору на header змінювати колір фону у footer.
// Коли курсор йде з header повертати початковий фон для footer.
const header = document.querySelector('.header')
const footer = document.querySelector('.footer')
header.addEventListener('mouseover', function () {
    if (header) {
        footer.style.backgroundColor = 'grey'
    }
})
header.addEventListener('mouseleave', function () {
    if (header) {
        footer.style.backgroundColor = ''
    }
})


//     Задача №4
// Дано в html: текст, елемент з класом item, текст.Так, що елемент з класом item за межами в'юпотрта.
// Створити функцію яка будує інтервал який буде змінювати контент в елементі item виводячи цифру яка збільшується на одиницю: 1 2 3 ... і т.д.
// Затримка між зміною числа, та до якого числа має працювати інтервал має задаватись в дата атрибутах елемента item.
// Функція має запустатить коли ми доскролюємо до елементу item(його видно), і не запускатись повторно.
const target = document.querySelector('.item4')

const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    theshold: 0.3
}
const callback = (entries, observer) => {
    entries.forEach(entry => {
        const currentElement = entry.target
        const intervalDelay = currentElement.dataset.delay || 1000
        const intervalMaxRage = currentElement.dataset.max || 10
        if (entry.isIntersecting) {
            setInterval(() => {
                if (+currentElement.innerHTML < intervalMaxRage) {
                    currentElement.innerHTML = +currentElement.innerHTML + 1
                } else {
                    clearInterval()
                }
            }, intervalDelay)
            observer.unobserve(target)
        }
    });
}

const observer = new IntersectionObserver(callback, options)

observer.observe(target)