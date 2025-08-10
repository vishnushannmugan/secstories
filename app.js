// Security Stories JavaScript

// Story data
const stories = [
    {
        title: "The Phishing Expedition",
        theme: "Social Engineering",
        teaser: "A seasoned CFO receives what appears to be a routine email from the CEO. One click changes everything."
    },
    {
        title: "Ransomware Roulette",
        theme: "Ransomware",
        teaser: "The hospital's systems go dark during the night shift. Lives hang in the balance as the IT team races against time."
    },
    {
        title: "The Ghost in the Grid",
        theme: "Espionage",
        teaser: "Power grid anomalies reveal a nation-state actor's careful infiltration spanning three years."
    },
    {
        title: "Identity Crisis",
        theme: "Identity Theft",
        teaser: "Sarah's perfect digital life crumbles when she discovers someone else has been living it better than she was."
    },
    {
        title: "The Zero-Day Prophet",
        theme: "Vulnerability Research",
        teaser: "A security researcher's discovery of a critical flaw puts them in the crosshairs of both criminals and governments."
    }
];

// Theme to CSS class mapping
const themeClasses = {
    'Social Engineering': 'badge--social-engineering',
    'Ransomware': 'badge--ransomware',
    'Espionage': 'badge--espionage',
    'Identity Theft': 'badge--identity-theft',
    'Vulnerability Research': 'badge--vulnerability-research',
    'Advanced Persistent Threat': 'badge--apt'
};

// Create story card HTML
function createStoryCard(story, index) {
    const themeClass = themeClasses[story.theme] || '';
    
    return `
        <div class="story-card" style="animation-delay: ${(index + 1) * 0.1}s">
            <div class="story-card__badge ${themeClass}">
                ${story.theme}
            </div>
            <h3 class="story-card__title">${story.title}</h3>
            <p class="story-card__teaser">${story.teaser}</p>
            <button class="btn btn--primary story-card__button" onclick="handleReadMore('${story.title}')">
                Read More
            </button>
        </div>
    `;
}

// Handle read more button clicks
function handleReadMore(storyTitle) {
    // In a real application, this would navigate to the full story
    // For now, we'll show an alert
    alert(`Opening "${storyTitle}"...\n\nThis would typically navigate to the full story page.`);
    
    // You could also implement a modal or redirect to a story page
    // window.location.href = `/story/${encodeURIComponent(storyTitle.toLowerCase().replace(/\s+/g, '-'))}`;
}

// Matrix background animation
function createMatrixEffect() {
    const matrixBg = document.getElementById('matrix-bg');
    if (!matrixBg) return;

    // Create falling characters effect
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.color = 'rgba(var(--color-teal-300-rgb), 0.1)';
        drop.style.fontSize = '14px';
        drop.style.fontFamily = 'monospace';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
        drop.style.animationName = 'matrix-fall';
        drop.style.animationIterationCount = 'infinite';
        drop.style.animationTimingFunction = 'linear';
        drop.textContent = characters[Math.floor(Math.random() * characters.length)];
        
        matrixBg.appendChild(drop);
    }
}

// Add matrix falling animation
function addMatrixStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrix-fall {
            0% {
                transform: translateY(-100vh);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll for any internal links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add intersection observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('.about, .featured, .stories').forEach(section => {
        observer.observe(section);
    });
}

// Add typing effect to header subtitle
function addTypingEffect() {
    const subtitle = document.querySelector('.header__subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--color-primary)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Add hover effects for story cards
function addHoverEffects() {
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.story-card')) {
            const card = e.target.closest('.story-card');
            card.style.transform = 'translateY(-8px) scale(1.02)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.story-card')) {
            const card = e.target.closest('.story-card');
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
}

// Initialize the application
function init() {
    // Populate stories grid
    const storiesGrid = document.getElementById('stories-grid');
    if (storiesGrid) {
        storiesGrid.innerHTML = stories.map((story, index) => createStoryCard(story, index)).join('');
    }

    // Initialize features
    addMatrixStyles();
    createMatrixEffect();
    initSmoothScroll();
    initScrollAnimations();
    addTypingEffect();
    addHoverEffects();

    // Add loading complete class to body
    document.body.classList.add('loaded');
}

// Handle page load
document.addEventListener('DOMContentLoaded', init);

// Handle window resize for matrix effect
window.addEventListener('resize', () => {
    const matrixBg = document.getElementById('matrix-bg');
    if (matrixBg) {
        // Clear existing matrix elements and recreate
        matrixBg.innerHTML = '';
        setTimeout(createMatrixEffect, 100);
    }
});

// Add some utility functions for future enhancements
const Utils = {
    // Format date for stories
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Create slug from title
    createSlug: (title) => {
        return title.toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    },

    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for potential future use
window.SecurityStories = {
    stories,
    handleReadMore,
    Utils
};

// Add some CSS for animations via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const animationStyles = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        body.loaded .header__title {
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
            from {
                text-shadow: 0 0 20px rgba(var(--color-teal-300-rgb), 0.2);
            }
            to {
                text-shadow: 0 0 30px rgba(var(--color-teal-300-rgb), 0.4);
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
});