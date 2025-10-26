// Diaporama simplifié pour le header
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
        
        // Gérer la visibilité de la page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopSlideshow();
            } else {
                this.startSlideshow();
            }
        });
    }

    showSlide(index) {
        // Cacher toutes les slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Afficher la slide courante
        this.slides[index].classList.add('active');
        this.currentSlide = index;
    }

    nextSlide() {
        let nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    startSlideshow() {
        this.stopSlideshow();
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 10000); // 10 secondes
    }

    stopSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Gestion du défilement par sections
class SectionScroll {
    constructor() {
        this.sections = document.querySelectorAll('.fullpage-section');
        this.currentSection = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        // Activer la première section
        this.activateSection(0);
        
        // Écouter le défilement
        this.setupScrollHandling();
        
        // Écouter la roue de souris
        this.setupWheelHandling();
    }

    setupScrollHandling() {
        const container = document.querySelector('.sections-container');
        
        container.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.handleScroll();
            }
        });
    }

    setupWheelHandling() {
        const container = document.querySelector('.sections-container');
        
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            if (this.isScrolling) return;
            
            if (e.deltaY > 0) {
                this.nextSection();
            } else {
                this.previousSection();
            }
        }, { passive: false });
    }

    handleScroll() {
        const container = document.querySelector('.sections-container');
        const scrollTop = container.scrollTop;
        const sectionHeight = window.innerHeight;
        const newSection = Math.round(scrollTop / sectionHeight);
        
        if (newSection !== this.currentSection) {
            this.activateSection(newSection);
        }
    }

    activateSection(index) {
        if (index < 0 || index >= this.sections.length) return;
        
        this.currentSection = index;
        
        this.sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.scrollToSection(this.currentSection + 1);
        }
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.scrollToSection(this.currentSection - 1);
        }
    }

    scrollToSection(index) {
        if (this.isScrolling || index < 0 || index >= this.sections.length) return;
        
        this.isScrolling = true;
        const container = document.querySelector('.sections-container');
        const targetScroll = index * window.innerHeight;
        
        container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
        
        this.activateSection(index);
        
        // Réactiver le défilement après l'animation
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }
}

// Animation au défilement pour les éléments internes
function checkInternalAnimations() {
    const tiles = document.querySelectorAll('.course-tile');
    const contactLinks = document.querySelectorAll('.contact-link');
    const scrollButton = document.getElementById('scrollToTop');
    const currentSection = document.querySelector('.fullpage-section.active');

    // Animation des tuiles de cours (seulement dans la section active)
    if (currentSection && currentSection.classList.contains('courses-section')) {
        tiles.forEach(tile => {
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
        });
    }

    // Animation des liens de contact (seulement dans la section active)
    if (currentSection && currentSection.classList.contains('contact-section')) {
        contactLinks.forEach(link => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        });
    }

    // Bouton de remontée
    const container = document.querySelector('.sections-container');
    if (container.scrollTop > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Démarrer le diaporama simplifié
    new Slideshow();
    
    // Démarrer le défilement par sections
    new SectionScroll();
    
    // Écouteur pour les animations internes
    const container = document.querySelector('.sections-container');
    container.addEventListener('scroll', checkInternalAnimations);
    
    // Vérifier les animations au chargement
    setTimeout(checkInternalAnimations, 1000);

    // Bouton de remontée
    document.getElementById('scrollToTop').addEventListener('click', function() {
        document.querySelector('.sections-container').scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
