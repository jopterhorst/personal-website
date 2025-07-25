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
function updateMobileThemeColor(theme) {
    // Update iOS Safari status bar and address bar color
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
        const lightColor = '#c3cfe2'; // Light theme gradient end color
        const darkColor = '#2d2d30';  // Dark theme gradient end color
        themeColorMeta.setAttribute('content', theme === 'dark' ? darkColor : lightColor);
    }
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check if user has manually set a theme preference
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    
    // Use stored theme if exists, otherwise use system preference
    const currentTheme = storedTheme || systemTheme;
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateMobileThemeColor(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme with animation
        document.documentElement.style.transition = 'all 0.3s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateMobileThemeColor(newTheme);
        
        // Store preference
        localStorage.setItem('theme', newTheme);
        
        // Remove transition after animation completes
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
    
    // Listen for system theme changes - always respect system changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        
        // Clear stored preference to respect system theme
        localStorage.removeItem('theme');
        
        // Apply system theme
        document.documentElement.setAttribute('data-theme', newTheme);
        updateMobileThemeColor(newTheme);
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
    const skillFills = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetWidth = fill.dataset.width;
                
                // Start with 0 width
                fill.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));
}

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
            const rotateX = (y - centerY) / 200; // Much more subtle (was 100)
            const rotateY = (centerX - x) / 200; // Much more subtle (was 100)
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(1px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initProfileImage();
    initThemeToggle();
    initScrollAnimations();
    animateSkillBars();

    // Trigger first animation
    setTimeout(() => {
        document.querySelector('.header').classList.add('visible');
    }, 100);
});
