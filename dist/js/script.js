


document.addEventListener('DOMContentLoaded', ()=> {
   
    
    

    // Otmena vydeleniya
    document.querySelector('.header').addEventListener('mousemove', (event)=>{
        event.stopPropagation();
        event.preventDefault();
        return false;
    });

    document.querySelector('.header').addEventListener('mousedown', (event)=> {
        event.stopPropagation();
        event.preventDefault();
        return false;
    })







    //Dropdown menu header

    const link = document.querySelector('.header__list_dropdown');
    const svg = link.querySelector('svg');
    const dropmenu = document.querySelector('.dropdown__menu');


    function arrowToggler() {
        link.addEventListener('click', (event)=> {
            event.preventDefault()
            svg.classList.toggle('up');
            dropmenu.classList.toggle('hide');

        });
    }

    arrowToggler();






    //Header bg toggler

    const header = document.querySelector('.header');
    
    if(document.documentElement.scrollTop > 40) {
        header.classList.add('transparent');
    }
    function headerBgToggler() {
        if (document.documentElement.scrollTop > 40) {
            header.classList.add('transparent');
        }
        if(document.documentElement.scrollTop <= 40 && header.classList.contains('transparent')) {
            header.classList.remove('transparent');
        }
    }

    window.addEventListener('scroll', headerBgToggler);







    //Slider for Teachers

    const swiper = new Swiper('.teachers__content', {
        slidersPerView: 1,
        spaceBetween: 40,
        slideClass: 'teachers__slide',
        wrapperClass: 'teachers__slider',
        longSwipes: false,
        pagination: {
            el: '.swiper-pagination',
            // type: 'bullets',
            clickable: true
        },
        bulletElement: 'div',
        navigation: {
            nextEl: '.teachers__slide_next',
            prevEl: '.teachers__slide_prev',
        }
    });




    //popup btn

    const openBtn = document.querySelector('.feedback__btn');
    const popup = document.querySelector('.popup');
    const closeBtn = document.querySelector('.popup__close_btn');


    function popupToggler() {
        openBtn.addEventListener('click', ()=> {
            popup.classList.add('show_o')
        });
        closeBtn.addEventListener('click', ()=> {
            popup.classList.remove('show_o');
            popup.classList.add('hide_o');
        })
    }
    popupToggler();





    //AOS init
    AOS.init();







    //Counter
    let show = true;
    let countbox = ".counter__item";

    function counter() {
        $(window).on("scroll load resize", function () {
            if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
            let w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
            let e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
            let w_height = $(window).height(); // Высота окна браузера
            let d_height = $(document).height(); // Высота всего документа
            let e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
            if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
                $('.counter_elem').css('opacity', '1');
                $('.counter_elem').spincrement({
                    thousandSeparator: "",
                    duration: 3000
                });
                 
                show = false;
            }
        });
    }

    counter();







    //burger menu toggler
    const burgerBtn = document.querySelector('.header__nav_burger');
    const burgerMenu = document.querySelector('.header__nav_burger_menu');
    const burgerClose = document.querySelector('.burger_close');

    burgerBtn.addEventListener('click', ()=> {
        burgerMenu.style.transform = 'translateX(0)';
    });
    burgerClose.addEventListener('click', ()=> {
        burgerMenu.style.transform = 'translateX(100%)';
    });
    

});