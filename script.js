// Portfolio data
const portfolioProjects = [
    {
        id: 1,
        title: "E-commerce Mobile App",
        category: "Mobile Design",
        description: "A modern e-commerce mobile application with intuitive navigation and seamless checkout process. This project focused on creating a user-friendly shopping experience with advanced filtering, wishlist functionality, and secure payment integration.",
        image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["React Native", "Figma", "Prototyping", "User Testing"]
    },
    {
        id: 2,
        title: "Financial Dashboard",
        category: "Web Design",
        description: "A comprehensive financial dashboard with data visualization and real-time analytics. The design emphasizes clarity and accessibility, making complex financial data easy to understand and actionable for users.",
        image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Web Design", "Data Visualization", "UX Research", "Dashboard Design"]
    },
    {
        id: 3,
        title: "Healthcare Platform",
        category: "UX Design",
        description: "User-centered design for a healthcare platform focusing on accessibility and ease of use. The platform connects patients with healthcare providers through an intuitive interface that prioritizes user safety and data privacy.",
        image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["User Research", "Accessibility", "Prototyping", "Healthcare UX"]
    },
    {
        id: 4,
        title: "Brand Identity System",
        category: "Branding",
        description: "Complete brand identity design including logo, color palette, and brand guidelines. This comprehensive branding project established a cohesive visual language across all touchpoints and marketing materials.",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Brand Design", "Logo Design", "Style Guide", "Visual Identity"]
    },
    {
        id: 5,
        title: "Travel Booking App",
        category: "Mobile Design",
        description: "Intuitive travel booking application with smooth user flow and beautiful interface. The app simplifies the complex process of travel planning with smart recommendations and seamless booking experiences.",
        image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Mobile UX", "User Journey", "Interactive Design", "Travel Tech"]
    },
    {
        id: 6,
        title: "SaaS Platform Redesign",
        category: "Web Design",
        description: "Complete redesign of a SaaS platform improving user engagement and conversion rates. The new design reduced user onboarding time by 60% and increased feature adoption significantly.",
        image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["SaaS Design", "Conversion Optimization", "A/B Testing", "User Analytics"]
    }
];

// DOM elements
let selectedProject = null;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeContactForm();
    setCurrentYear();
    initializeAnimations();
    initializeHeroMicroInteractions();
});

// mark site as loaded after full load to trigger entrance animations
window.addEventListener('load', function() {
    try { document.body.classList.add('site-loaded'); } catch (e) { /* noop */ }
});

// Small hero micro-interactions: tilt mockup and nav highlight
function initializeHeroMicroInteractions() {
    // tilt for mockup card (subtle 3D on mouse move)
    const mockup = document.querySelector('.mockup-card .device-frame');
    if (mockup) {
        mockup.addEventListener('mousemove', (e) => {
            const rect = mockup.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateX = (y * 6).toFixed(2);
            const rotateY = (x * -10).toFixed(2);
            mockup.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });

        mockup.addEventListener('mouseleave', () => {
            mockup.style.transform = '';
        });
    }

    // reveal floating badges with stagger
    const floats = document.querySelectorAll('.mockup-card .floating-card');
    floats.forEach((f, i) => {
        try {
            f.style.opacity = '0';
            const current = window.getComputedStyle(f).transform;
            f.style.transform = (current === 'none' ? '' : current) + ' translateY(6px)';
            setTimeout(() => {
                f.style.transition = 'all 420ms cubic-bezier(.2,.9,.2,1)';
                f.style.opacity = '1';
                f.style.transform = (f.style.transform || '').replace(' translateY(6px)', '');
            }, 220 + i * 120);
        } catch (err) {
            // ignore if styles can't be applied
        }
    });

    // nav active highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    function onScroll() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                navLinks.forEach(l => l.classList.remove('active'));
                const link = navLinks.find(l => l.getAttribute('onclick') && l.getAttribute('onclick').includes(`'${section.id}'`));
                if (link) link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
}
 
// Portfolio initialization
function initializePortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    portfolioProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-item group cursor-pointer';
        projectElement.onclick = () => openModal(project.id);
        
        projectElement.innerHTML = `
            <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div class="relative overflow-hidden">
                    <img 
                        src="${project.image}" 
                        alt="${project.title}"
                        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                    </div>
                </div>
                <div class="p-6">
                    <div class="text-sm text-teal-600 font-medium mb-2">${project.category}</div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">${project.title}</h3>
                    <p class="text-gray-600 text-sm leading-relaxed mb-4">${project.description.substring(0, 120)}...</p>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.slice(0, 2).map(tech => 
                            `<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(projectElement);
    });
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('show');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    });

    // Close mobile menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Form validation
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
        // Small hero micro-interactions: tilt mockup and nav highlight
        function initializeHeroMicroInteractions() {
            // tilt for mockup card (subtle 3D on mouse move)
            const mockup = document.querySelector('.mockup-card .device-frame');
            if (mockup) {
                mockup.addEventListener('mousemove', (e) => {
                    const rect = mockup.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    const rotateX = (y * 6).toFixed(2);
                    const rotateY = (x * -10).toFixed(2);
                    mockup.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
                });

                mockup.addEventListener('mouseleave', () => {
                    mockup.style.transform = '';
                });
            }

            // reveal floating badges with stagger
            const floats = document.querySelectorAll('.mockup-card .floating-card');
            floats.forEach((f, i) => {
                try {
                    f.style.opacity = '0';
                    const current = window.getComputedStyle(f).transform;
                    f.style.transform = (current === 'none' ? '' : current) + ' translateY(6px)';
                    setTimeout(() => {
                        f.style.transition = 'all 420ms cubic-bezier(.2,.9,.2,1)';
                        f.style.opacity = '1';
                        f.style.transform = (f.style.transform || '').replace(' translateY(6px)', '');
                    }, 220 + i * 120);
                } catch (err) {
                    // ignore if styles can't be applied
                }
            });

            // nav active highlighting on scroll
            const sections = document.querySelectorAll('section[id]');
            const navLinks = Array.from(document.querySelectorAll('.nav-link'));
            function onScroll() {
                const scrollPos = window.scrollY + 120;
                sections.forEach(section => {
                    if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        const link = navLinks.find(l => l.getAttribute('onclick') && l.getAttribute('onclick').includes(`'${section.id}'`));
                        if (link) link.classList.add('active');
                    }
                });
            }
            window.addEventListener('scroll', onScroll);
            onScroll();
        }
    return emailRegex.test(email);
}

// Form submission
async function submitForm() {
    const submitBtn = document.getElementById('submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <div class="spinner"></div>
        Sending...
    `;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    document.getElementById('contact-form').reset();
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalContent;
}

// Navigation functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Modal functions
function openModal(projectId) {
    const project = portfolioProjects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTechnologies = document.getElementById('modal-technologies');
    
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;
    
    modalTechnologies.innerHTML = project.technologies.map(tech => 
        `<span class="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm">${tech}</span>`
    ).join('');
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('project-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// CV download function
function downloadCV() {
    // In a real implementation, this would download the actual CV file
    alert('CV download would start here. Please add your actual CV file to the project.');
}

// Set current year in footer
function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Initialize animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(target) {
        const startPosition = window.pageYOffset;
        const targetPosition = target.offsetTop - 80;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override scrollToSection for older browsers
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            smoothScrollPolyfill(element);
        }
    };
}