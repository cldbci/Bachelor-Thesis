const animations = document.querySelectorAll('.anim');
let animObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            entry.target.style.animation = `${entry.target.dataset.animtype} 
                                        1.5s ${entry.target.dataset.animdelay} 
                                        forwards ease-out`
        }
        else {
            entry.target.classList.remove('anim');
        }
    })
})

animations.forEach(animation => {
    animObserver.observe(animation);
})