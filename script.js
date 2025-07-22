// Optimized particle system - fewer particles
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 6; // Reduced from 12

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random sizing for variety
        const size = Math.random() * 30 + 15; // 15-45px (smaller)
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        container.appendChild(particle);
    }
}

// Handle profile image loading
function initProfileImage() {
    const profileImage = document.querySelector('.profile-image');
    const fallbackIcon = document.querySelector('.profile-fallback');
    
    if (profileImage) {
        profileImage.addEventListener('load', function() {
            // Image loaded successfully, hide fallback
            if (fallbackIcon) {
                fallbackIcon.style.display = 'none';
            }
        });
        
        profileImage.addEventListener('error', function() {
            // Image failed to load, show fallback
            profileImage.style.display = 'none';
            if (fallbackIcon) {
                fallbackIcon.style.display = 'block';
            }
        });
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get stored theme or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme with animation
        document.documentElement.style.transition = 'all 0.3s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Store preference
        localStorage.setItem('theme', newTheme);
        
        // Remove transition after animation completes
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

// Scroll animation observer
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollAnimations();
    animateSkillBars();
    initProfileImage();
    initThemeToggle();

    // Trigger first animation
    setTimeout(() => {
        document.querySelector('.header').classList.add('visible');
    }, 100);
});

// Simplified mouse interaction - better performance
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 100; // Much more subtle
            const rotateY = (centerX - x) / 100; // Much more subtle
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(2px)`;
        } else {
            card.style.transform = '';
        }
    });
});
