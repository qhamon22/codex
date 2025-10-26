// Animation au défilement
function checkScroll() {
    const sections = document.querySelectorAll('section');
    const tiles = document.querySelectorAll('.course-tile');
    const contactLinks = document.querySelectorAll('.contact-link');
    const scrollButton = document.getElementById('scrollToTop');

    // Animation des sections
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.classList.add('visible');
        }
    });

    // Animation des tuiles de cours
    tiles.forEach(tile => {
        const tileTop = tile.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (tileTop < windowHeight * 0.85) {
            tile.classList.add('visible');
        }
    });

    // Animation des liens de contact
    contactLinks.forEach(link => {
        const linkTop = link.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (linkTop < windowHeight * 0.85) {
            link.classList.add('visible');
        }
    });

    // Bouton de remontée
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Écouteur de défilement
    window.addEventListener('scroll', checkScroll);
    
    // Vérifier la position au chargement
    checkScroll();

    // Bouton de remontée
    document.getElementById('scrollToTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
