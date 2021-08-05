


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

});