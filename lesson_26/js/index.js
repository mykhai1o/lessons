'use strict'

// Listener 
window.addEventListener('load', windowLoad)
const html = document.documentElement

function windowLoad() {
    document.addEventListener('click', documentActions)
    document.addEventListener('keydown', documentActions)
    // Move sidebar block 
    window.addEventListener('resize', moveSidebar)

    html.classList.add('loaded')

    // Swiper 
    sliderInit()
    // Header with scroll 
    scrollActions()
    //FAQ
    faqBuild()
    //Plans price change
    plansAction()
    //Raiting stars
    initRating()
    //Move sidebar
    moveSidebar()

}

function documentActions(e) {
    const type = e.type
    const targetElement = e.target

    if (type === 'click') {
        // Burger-menu 
        if (targetElement.closest('.icon-menu')) {
            html.classList.toggle('menu-open')
        }
        if (targetElement.closest('.menu__link') && html.classList.contains('menu-open')) {
            html.classList.remove('menu-open')
        }

        // Popup
        // close 
        if (document.querySelector('.popup--open') && (!targetElement.closest('.body-popup') || targetElement.closest('.body-popup__close'))) {
            popupClose()
        }
        // open 
        if (targetElement.closest('[data-popup]')) {
            const currentElement = targetElement.closest('[data-popup]')
            popupOpen(currentElement)
        }
        // Spoiler
        if (targetElement.closest('summary')) {
            e.preventDefault()
            console.log('test')
            // console.log(targetElement)
            const spollerTitle = targetElement.closest('summary')
            const spoller = spollerTitle.closest('details')
            const spollerBody = spollerTitle.nextElementSibling
            // const isActive = spoller.classList.contains('--active')

            if (!spollerBody.classList.contains('_slide')) {
                !spollerBody.hidden ?
                    spoller.classList.contains('--active') ? setTimeout(() => { spollerBody.hidden = true }, 500) : spollerBody.hidden = true
                    : null

                !spoller.open ? spoller.open = true : setTimeout(() => { spoller.open = false }, 500)

                _slideToggle(spollerBody)

                spoller.classList.toggle('--active')
            }
        }
        // Plan prices m\y
        if (targetElement.closest(".switcher__item")) {
            const button = targetElement.closest(".switcher__item")
            if (!button.classList.contains("switcher__item--active")) {
                document.querySelector('.switcher__item--active').classList.remove('switcher__item--active')
                button.classList.add("switcher__item--active")
                plansAction()
            }
        }

        //Forms
        if (targetElement.closest(".select__value")) {
            const selectValue = targetElement.closest(".select__value")
            const select = selectValue.closest(".select")
            select.classList.toggle("--select-open")
        }
        if (targetElement.closest(".select__item")) {
            const selectItem = targetElement.closest(".select__item")
            const selectItemValue = +selectItem.dataset.value
            const selectItemContent = selectItem.innerHTML
            const select = selectItem.closest(".select")
            const selectValue = select.querySelector(".select__value")
            const inputValue = select.nextElementSibling

            inputValue.value = selectItemValue
            selectValue.innerHTML = selectItemContent

            select.classList.toggle('--select-open')
        }
        if (!targetElement.closest(".select") && targetElement.querySelector(".select.--select-open")) {
            targetElement.querySelector(".select.--select-open").classList.remove("--select-open")
        }


    } else if (type === 'keydown') {
        const key = e.key
        if (key === 'Escape') {
            document.querySelector('.popup--open') ? popupClose() : null
        }
    }
}

function popupClose() {
    const currentPopup = document.querySelector('.popup--open')
    html.classList.remove('popup-open')
    currentPopup.classList.remove('popup--open')
    setTimeout(() => {
        bodyLock(false)
    }, 300)
}
function popupOpen(currentElement) {
    const currentPopup = document.querySelector(currentElement.dataset.popup)
    // console.log(currentElement.dataset.popup)
    if (currentPopup) {
        bodyLock(true)
        currentPopup.classList.add('popup--open')
    } else {
        console.log('Popup-id error')
    }
}

// !!!!!! ???
// Fixing the scroll bar jump

function bodyLock(mode) {
    let lockPaddingValue = (window.innerWidth - document.body.offsetWidth) + 'px'
    lockPaddingValue = mode ? lockPaddingValue : 0
    document.body.style.paddingInlineEnd = lockPaddingValue

    const paddingLockElements = document.querySelectorAll('[data-pl]')

    paddingLockElements.forEach(paddingLockElement => {
        paddingLockElement.style.paddingInlineEnd = lockPaddingValue
    })

    html.classList.toggle('lock', mode)
}


// SWIPER
function sliderInit() {
    if (document.querySelector('.item-slider__list')) {
        const sliderListFiveItems = new Swiper('.item-slider__list', {
            // Number of cards (items) in the slider 
            slidesPerView: 1.85,

            // Number of control bullets 
            slidesPerGroup: 1,


            // Optional parameters
            // direction: 'vertical',
            loop: false,
            spaceBetween: 20,

            // If we need pagination
            pagination: {
                el: '.slider-controls__bullets',
                clickable: true,
                bulletClass: 'slider-controls__bullet-item',
                bulletActiveClass: 'slider-controls__bullet-item--active',
            },


            // Navigation arrows
            navigation: {
                prevEl: '.slider-controls__arrow--left',
                nextEl: '.slider-controls__arrow--right',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },

            // Breakpoints
            breakpoints: {
                // when window width is >= 320px
                600: {
                    // slidesPerGroup: 3,
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                // when window width is >= 800px
                850: {
                    // slidesPerGroup: 4,
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                // when window width is >= 1200px
                1200: {
                    // slidesPerGroup: 5,
                    slidesPerView: 5,
                    spaceBetween: 30
                }
            },

            // Scrollbar
            scrollbar: {
                el: '.item-slider__scrollbar',
                draggable: true,
                dragSize: 20,
            },
        })
    }

    if (document.querySelector('.reviews-slider')) {
        const sliderReviews = new Swiper('.reviews-slider', {
            // Number of cards (items) in the slider 
            slidesPerView: 1,

            // Number of control bullets 
            slidesPerGroup: 1,


            // Optional parameters
            // direction: 'vertical',
            loop: false,
            spaceBetween: 16,
            width: null,

            // If we need pagination
            pagination: {
                el: '.controls-reviews-slider__bullets',
                clickable: true,
                bulletClass: 'controls-reviews-slider__bullet-item',
                bulletActiveClass: 'controls-reviews-slider__bullet-item--active',
            },


            // Navigation arrows
            navigation: {
                prevEl: '.controls-reviews-slider__arrow--left',
                nextEl: '.controls-reviews-slider__arrow--right',
            },

            // Breakpoints

            breakpoints: {
                // when window width is >= 320px
                800: {
                    // slidesPerGroup: 3,
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is >= 800px
                1200: {
                    // slidesPerGroup: 4,
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 1200px
                1450: {
                    // slidesPerGroup: 5,
                    slidesPerView: 2,
                    spaceBetween: 20
                }
            },

            /*
            // Scrollbar
            scrollbar: {
                el: '.item-slider__scrollbar',
                draggable: true,
                dragSize: 20,
            },
            */
        })
    }

    if (document.querySelector('.cast-slider')) {
        const sliderCast = new Swiper('.cast-slider', {
            // Number of cards (items) in the slider 
            slidesPerView: 4,

            // Number of control bullets 
            slidesPerGroup: 1,

            // Optional parameters
            // direction: 'vertical',
            loop: false,
            spaceBetween: 10,

            // Navigation arrows
            navigation: {
                prevEl: '.controls-cast-slider__arrow--left',
                nextEl: '.controls-cast-slider__arrow--right',
            },

            // Breakpoints
            breakpoints: {
                560: {
                    // slidesPerGroup: 4,
                    slidesPerView: 6,
                    spaceBetween: 10
                },
                768: {
                    // slidesPerGroup: 4,
                    slidesPerView: 7,
                    spaceBetween: 15
                },
                // when window width is >= 800px
                900: {
                    slidesPerView: 8,
                    spaceBetween: 15
                },
                // when window width is >= 1200px
                1200: {
                    slidesPerView: 7,
                    spaceBetween: 20
                },
                1500: {
                    slidesPerView: 8,
                    spaceBetween: 20
                },
            },
            /*
            // Scrollbar
            scrollbar: {
                el: '.item-slider__scrollbar',
                draggable: true,
                dragSize: 20,
            },*/
        })
    }
}

// Header with scroll 
function scrollActions() {
    window.addEventListener('scroll', scrollPage)

    function scrollPage() {
        // Finding header
        const header = document.querySelector('.header')
        // console.log(scrollY)
        header.classList.toggle('header--scroll', (window.scrollY > 300))
    }

    // IntersectionObserver 

    const options = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        // Persent of the object size, the appearance of wich will trigger the function
        theshold: 0.5,
    }
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            const currentElement = entry.target
            // const intervalDelay = currentElement.dataset.delay || 1000
            // const intervalMaxRage = currentElement.dataset.max || 10
            if (entry.isIntersecting) {
                currentElement.classList.add('--animate')
                // setInterval(() => {
                //     if (+currentElement.innerHTML < intervalMaxRage) {
                //         currentElement.innerHTML = +currentElement.innerHTML + 1
                //     } else {
                //         clearInterval()
                //     }
                // }, intervalDelay)
                // observer.unobserve(target)
            } else {
                // currentElement.classList.remove('--animate')
            }
        });
    }

    const observer = new IntersectionObserver(callback, options)

    const animElements = document.querySelectorAll('[class*="--anim"]')
    animElements.forEach(animElement => {
        observer.observe(animElement)
    })

}

// Rating stars
function initRating() {
    const ratingItems = document.querySelectorAll('.rating')
    if (ratingItems.length) {
        ratingItems.forEach(ratingItem => {
            const ratingActive = ratingItem.querySelector('.rating__active')
            const ratingValue = parseFloat(ratingItem.querySelector('.rating__value').innerHTML) ? parseFloat(ratingItem.querySelector('.rating__value').innerHTML) : 0
            const ratingPercent = ratingValue / 5 * 100

            ratingActive.style.width = `${ratingPercent}%`
        })
    }
}


// Helping modules for the slow object opening ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty('height') : null;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            !showmore ? target.style.removeProperty('overflow') : null;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Створюємо подію 
            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty('height') : null;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Створюємо подію
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}

// FAQ
function faqBuild() {
    const faqItems = document.querySelectorAll(".item-faq")
    if (faqItems.length) {
        const faqBody = document.querySelector(".faq__body")
        let faqTemplate = `<div class="faq__column">`
        faqItems.forEach((faqItem, index) => {
            faqTemplate += faqItem.outerHTML // Get the string with tags
            ++index === Math.round(faqItems.length / 2) ? faqTemplate += `</div><div class="faq__column">` : null
        })
        faqTemplate += `</div>`

        faqBody.innerHTML = faqTemplate

        // console.log(faqTemplate)
    }
}

// Plans (prices)

async function getPlans(activeType) {
    const response = await fetch('../json/plans.json')
    if (response.ok) {
        const data = await response.json()
        plansShow(data, activeType)
    } else {
        console.log('error')

    }
}
function plansShow(data, activeType) {
    const plansPrices = document.querySelectorAll('.item-plan__price')
    const prices = data.price


    plansPrices.forEach((plansPrice, index) => {
        if (activeType === 'm') {
            plansPrice.innerHTML = `${prices[index][activeType]} <small>/month</small>`
        } else if (activeType === 'y') {
            plansPrice.innerHTML = `${prices[index][activeType]} <small>/year</small>`
        }
    });
}
function plansAction() {
    const activeSwitcher = document.querySelector(".switcher__item--active")
    if (activeSwitcher) {
        const activeType = activeSwitcher.dataset.type

        if (activeType) {
            getPlans(activeType)
        }
    }
}

// Move sidebar

function moveSidebar() {
    const sideBar = document.querySelector('.inner-sidebar');
    const siteBody = document.querySelector('.inner__body')
    // changing on screen.width = 800px 
    if (siteBody.nextElementSibling === sideBar && document.documentElement.clientWidth <= 1177) {
        siteBody.children[1].insertAdjacentElement("afterend", sideBar)
        console.log(1)
    } else if (siteBody.nextElementSibling !== sideBar && document.documentElement.clientWidth > 1177) {
        console.log(2)
        siteBody.insertAdjacentElement("afterend", sideBar)
    }
    // if (siteBody.nextElementSibling === sideBar) {
    //     console.log('+')
    // }
    // console.log(siteBody.nextElementSibling.classList.value)
}



