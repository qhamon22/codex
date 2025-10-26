// Diaporama pour le header
class Slideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.init();
    }

    init() {
        // Afficher la première slide
        this.showSlide(0);
        
        // Démarrer le diaporama
        this.startSlideshow();
        
        // Optionnel: redémarrer le diaporama si la page devient visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopSlideshow();
            } else {
                this.startSlideshow();
            }
        });
    }

    showSlide(index) {
        // Retirer la classe active de toutes les slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Ajouter la classe active à la slide courante
        this.slides[index].classList.add('active');
        
        this.currentSlide = index;
    }

    nextSlide() {
        let nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    startSlideshow() {
        this.stopSlideshow(); // Arrêter l'intervalle existant
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 8000); //  secondes
    }

    stopSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

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
    // Démarrer le diaporama
    new Slideshow();

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
