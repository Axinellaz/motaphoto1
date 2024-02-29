/* M e n u  B u r g e r */
console.log('customs page')
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');

    burgerMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
        const isActive = nav.classList.contains('active');
        burgerMenu.setAttribute('aria-expanded', isActive);
        this.classList.toggle('open');
    });
});

