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



// BOUTON CONTACT SINGLE POST AVEC LE REMPLISSAGE AUTO D'UNE LIGNE DU FORMULAIRE 

document.addEventListener("DOMContentLoaded", function() {
    
    const contactBtn = document.querySelector('#contact-btn');

    contactBtn.addEventListener('click', function(event) {
            event.preventDefault();

            let reference = contactBtn.getAttribute('data-reference');
            document.getElementById('field-ref').value = reference;

            jQuery("#contact").fadeIn();
            return false;
    });
});

/*  Hover option btn select */


