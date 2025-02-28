// 1.
// let someVar = 0;
// ++someVar

// if (someVar) {
//     console.log(someVar);
// }
// Консоль виведе число 1

// 2.
// for (let i = 1; i <= 10; i++) {
//     console.log(`Пункт №${i}`)
// }

// 3.
// if (2 * 20 <= 10 || 30 / 2 < 5 && 10 <= "10" || 20 === "20") {
//     console.log('000')
// }
// В консолі нічого не побачимо, оскільки результат буде false

// 4.
// Створіть функцію, яка повертає результат ділення числа a на число b з додаванням рядка "Результат ділення: "
// Викличте функцію передаючі різні значення, у тому числі не передаючи зовсім.
// Функція не має повертати NaN, Infinite або помилку
// let t = 2 * "h"
// function divide(a = 2, b = 1) {
//     let result = a / b

//     if (b === Infinity || result === Infinity) {
//         console.log("Помилка: отримано нескінченність")
//     } else if (typeof result === 'number' && !isNaN(result)) {
//         console.log(result)
//     } else {
//         console.log("Щось пішло не так. Перевір значення")
//     }
// }
// function divide(a = 2, b = 1) {
//     if (typeof a !== "number" || isNaN(a) || typeof a !== "number" || isNaN(a) || a === Infinity || b === Infinity) {
//         console.log("Щось пішло не так. Перевір значення")
//     } else if (b === 0) {
//         console.log("Помилка: ділення на нуль")
//     } else {
//         console.log(`Результат ділення: ${a / b}`)
//     }
// }
// function divide(a = 2, b = 1) {
//     if (b === 0) {
//         console.log("Помилка: ділення на нуль")
//         return
//     }
//     let result = a / b
//     if (!isFinite(result)) {
//         console.log("Щось пішло не так. Перевір значення")
//     } else {
//         console.log(`Результат ділення: ${result}`)
//     }
// }
// divide(8, 4);
// divide('4', '2');
// divide(10, 0);
// divide(15, 3);


// 5.

// let myArr = ['One', true, { name: 'John Doe', age: 32 }, 10, 2 * "A"]

// myArr.forEach((item, index) => {
//     if (item === 10) {
//         console.log(item)
//     }
// })


document.addEventListener('click', (e) => {
    if (e.target.closest('.header__menu-button')) {
        document.documentElement.classList.toggle('active');
    }
});