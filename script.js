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
        const lightColor = '#e5e5ea'; // Light theme gradient end color
        const darkColor = '#2c2c2e';  // Updated softer dark theme color
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
                
                // Skip animation for learning skills (they have their own CSS animation)
                if (targetWidth === 'learning') {
                    return;
                }
                
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

// Apple-style haptic feedback simulation
function addAppleInteractions() {
    const interactiveElements = document.querySelectorAll('.social-link, .project-link, .theme-toggle');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease-out';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Helper function for hex to RGB conversion
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Enhanced Apple-style status system
function updateTimeAndStatus() {
    const now = new Date();
    
    // More Apple-like time formatting
    const cetTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Amsterdam',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const cetHour = parseInt(now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Amsterdam',
        hour12: false,
        hour: '2-digit'
    }));
    
    const cetDay = new Date(now.toLocaleString('en-US', {timeZone: 'Europe/Amsterdam'})).getDay();
    
    // Apple-style status messages
    let status, statusColor;
    if (cetDay >= 1 && cetDay <= 5 && cetHour >= 9 && cetHour < 18) {
        status = "At Mendix";
        statusColor = "#30D158"; // iOS green
    } else if (cetHour >= 22 || cetHour < 6) {
        status = "Do Not Disturb";
        statusColor = "#8E8E93"; // iOS gray
    } else if (cetDay === 6 || cetDay === 0) {
        status = "Weekend Mode";
        statusColor = "#BF5AF2"; // iOS purple
    } else {
        status = "Available";
        statusColor = "#007AFF"; // iOS blue
    }
    
    // Update with smoother animations
    const statusElement = document.getElementById('status-text');
    const dotElement = document.getElementById('status-dot');
    const timeElement = document.getElementById('cet-time');
    
    if (statusElement && statusElement.textContent !== status) {
        statusElement.style.opacity = '0.5';
        setTimeout(() => {
            statusElement.textContent = status;
            statusElement.style.opacity = '1';
        }, 150);
    }
    
    if (dotElement) {
        dotElement.style.backgroundColor = statusColor;
        const rgb = hexToRgb(statusColor);
        if (rgb) {
            dotElement.style.boxShadow = `0 0 0 2px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
        }
    }
    
    if (timeElement) {
        timeElement.textContent = cetTime;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    createParticles();
    initProfileImage();
    initThemeToggle();
    initScrollAnimations();
    animateSkillBars();
    addAppleInteractions();
    
    // Initialize and update time/status if elements exist
    if (document.getElementById('status-text') || document.getElementById('cet-time')) {
        updateTimeAndStatus();
        setInterval(updateTimeAndStatus, 60000); // Update every minute
    }

    // Trigger first animation
    setTimeout(() => {
        document.querySelector('.header').classList.add('visible');
    }, 100);
});
