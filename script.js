document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.querySelector('.logo');
    const sections = document.querySelectorAll('.section');
    
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme Toggle Functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Adjust scroll position to account for fixed header
            const navHeight = document.querySelector('nav').offsetHeight;
            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // Logo click scrolls to top
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
        observer.observe(item);
    });
    
    // Add animation classes for observed elements
    document.querySelectorAll('.timeline-item, .project-card, .education-card, .skill-item').forEach(el => {
        el.classList.add('fade-in-element');
    });
    
    // Typing effect for the title
    const titleElement = document.querySelector('.title');
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < titleText.length) {
            titleElement.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-element.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        .profile-image {
            animation: float 6s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Create a mobile navigation menu
    const createMobileNav = () => {
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        nav.appendChild(mobileMenuBtn);
        
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        const mobileNavLinks = document.createElement('ul');
        mobileNavLinks.className = 'mobile-nav-links';
        
        navLinks.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.getAttribute('href');
            a.textContent = link.textContent;
            a.className = 'mobile-nav-link';
            
            a.addEventListener('click', e => {
                e.preventDefault();
                
                const targetId = a.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Adjust scroll position to account for fixed header
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight,
                    behavior: 'smooth'
                });
                
                mobileMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
            
            li.appendChild(a);
            mobileNavLinks.appendChild(li);
        });
        
        mobileMenu.appendChild(mobileNavLinks);
        document.body.appendChild(mobileMenu);
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Add CSS for mobile menu
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            .mobile-menu-btn {
                display: none;
                cursor: pointer;
                font-size: 24px;
                color: var(--text-color);
                transition: var(--transition);
            }
            
            .mobile-menu {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--background-color);
                z-index: 999;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            
            .mobile-menu.active {
                transform: translateX(0);
            }
            
            .mobile-nav-links {
                list-style: none;
                text-align: center;
            }
            
            .mobile-nav-links li {
                margin: 20px 0;
            }
            
            .mobile-nav-link {
                text-decoration: none;
                color: var(--text-color);
                font-size: 24px;
                font-weight: 600;
                transition: var(--transition);
            }
            
            .mobile-nav-link:hover {
                color: var(--primary-color);
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    };
    
    // Initialize mobile navigation
    createMobileNav();
    
    // Add particle background effect to hero section
    const createParticleBackground = () => {
        const hero = document.querySelector('.hero');
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 5 + 1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Set particle styles
            particle.style.cssText = `
                left: ${posX}%;
                top: ${posY}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        hero.appendChild(particleContainer);
        
        // Add CSS for particles
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            .particle-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: -1;
            }
            
            .particle {
                position: absolute;
                background-color: var(--primary-color);
                opacity: 0.3;
                border-radius: 50%;
                animation: float-particle linear infinite;
            }
            
            @keyframes float-particle {
                0% {
                    transform: translateY(0) rotate(0deg);
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                }
            }
            
            .dark-mode .particle {
                background-color: var(--accent-color);
            }
        `;
        document.head.appendChild(particleStyle);
    };
    
    // Initialize particle background
    createParticleBackground();
});
