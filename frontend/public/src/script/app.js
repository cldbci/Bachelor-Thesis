/* Navbar when scrolling */
window.onscroll = function(){
    const nav = document.querySelector('.header-wrapper');
    var top = window.scrollY;

    if(top >= 1){
        nav.classList.add('active');
    } else {
        nav.classList.remove('active');
    }
}

/* Add events to mobile navbar */
const navBtn = document.querySelector('.mobile-nav-toggle');
navBtn.addEventListener('click', () => {
    const nav = document.querySelector('nav');

    if (navBtn.classList.contains('fa-bars')) {

        nav.classList.add('nav-mobile');
        navBtn.classList.remove("fa-bars");
        navBtn.classList.add("fa-window-close");

    } else {

        nav.classList.remove('nav-mobile');
        navBtn.classList.remove("fa-window-close");
        navBtn.classList.add("fa-bars");

    }
})

/* Navbar animation when scrolling */
const sections = document.querySelectorAll("section");
const options = {
    threshold: 0.85
}

const navAnimate = (entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const activeAnchor = document.querySelector(`[data-page=${id}]`);
        if(entry.isIntersecting) {
            activeAnchor.classList.add('active-nav-elem');
        }
        if(!entry.isIntersecting) {
            activeAnchor.classList.remove('active-nav-elem');
        }
    })
}

let observer = new IntersectionObserver(navAnimate, options);

sections.forEach(section => {
    observer.observe(section);
})