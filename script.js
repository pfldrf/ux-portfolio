// ========= NAVIGATION SYSTEM =========

class NavigationController {
  constructor() {
    this.nav = document.querySelector('.site-nav');
    this.navToggle = document.querySelector('.nav-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    this.mobileMenuClose = document.querySelector('.mobile-menu-close');
    this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    this.isMenuOpen = false;
    this.lastScrollY = window.scrollY;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.handleScrollEffect();
    this.handleFocusTrap();
    this.setActiveNavLink();
  }
  
  bindEvents() {
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }
    
    // Mobile menu close
    if (this.mobileMenuClose) {
      this.mobileMenuClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMobileMenu();
      });
    }
    
    // Overlay click to close
    if (this.mobileMenuOverlay) {
      this.mobileMenuOverlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
    
    // Scroll effects
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScrollEffect();
    }, 16)); // ~60fps
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
    
    // Handle resize
    window.addEventListener('resize', this.debounce(() => {
      if (window.innerWidth >= 768 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }, 250));
    
    // Link clicks
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isMenuOpen) {
          this.closeMobileMenu();
        }
      });
    });
  }
  
  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    this.isMenuOpen = true;
    
    // Update UI
    this.navToggle.classList.add('active');
    this.navToggle.setAttribute('aria-expanded', 'true');
    this.mobileMenu.classList.add('active');
    this.mobileMenuOverlay.classList.add('active');
    this.mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
    this.trapFocus(this.mobileMenu);
    
    // Focus first link after animation
    setTimeout(() => {
      const firstLink = this.mobileMenu.querySelector('.mobile-nav-link');
      if (firstLink) firstLink.focus();
    }, 300);
  }
  
  closeMobileMenu() {
    this.isMenuOpen = false;
    
    // Update UI
    this.navToggle.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.mobileMenu.classList.remove('active');
    this.mobileMenuOverlay.classList.remove('active');
    this.mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    this.navToggle.focus();
  }
  
  handleScrollEffect() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for backdrop blur effect
    if (currentScrollY > 10) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }
    
    this.lastScrollY = currentScrollY;
  }
  
  handleKeyboardNavigation(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && this.isMenuOpen) {
      this.closeMobileMenu();
    }
    
    // Tab navigation within mobile menu
    if (e.key === 'Tab' && this.isMenuOpen) {
      this.handleTabNavigation(e);
    }
  }
  
  handleTabNavigation(e) {
    const focusableElements = this.mobileMenu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      // Shift+Tab: backward navigation
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: forward navigation
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Ensure first element can be focused
    firstElement.focus();
  }
  
  setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    this.navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('nav-link-active', 'mobile-nav-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
  
  // Utility functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  debounce(func, wait) {
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
}

// Navigation Enhancements
class NavigationEnhancements {
  constructor() {
    this.init();
  }
  
  init() {
    this.addSmoothScrolling();
    this.handlePreloadLinks();
    this.addProgressiveEnhancement();
    this.setupResumeLink();
  }
  
  addSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.site-nav').offsetHeight;
          const targetPosition = target.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  handlePreloadLinks() {
    // Preload links on hover for faster navigation
    const links = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !link.dataset.preloaded) {
          const linkElement = document.createElement('link');
          linkElement.rel = 'prefetch';
          linkElement.href = href;
          document.head.appendChild(linkElement);
          link.dataset.preloaded = 'true';
        }
      });
    });
  }
  
  setupResumeLink() {
    // Setup resume download functionality
    const resumeLinks = document.querySelectorAll('.nav-cta, .mobile-nav-cta');
    
    resumeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Analytics tracking (if available)
        if (typeof gtag === 'function') {
          gtag('event', 'resume_download', {
            event_category: 'engagement',
            event_label: 'navigation_cta'
          });
        }
        
        // Simulate resume download (replace with actual resume URL)
        const resumeUrl = 'Scott Smith - Resume 2025 - Healthcare and Fintech.pdf';
        const tempLink = document.createElement('a');
        tempLink.href = resumeUrl;
        tempLink.download = 'Scott Smith - Resume 2025 - Healthcare and Fintech.pdf';
        tempLink.target = '_blank';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      });
    });
  }
  
  addProgressiveEnhancement() {
    // Add enhanced interactions for modern browsers
    if ('IntersectionObserver' in window) {
      this.addScrollAnimations();
    }
    
    // Add reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition-nav', 'none');
      document.documentElement.style.setProperty('--transition-fast', 'none');
    }
    
    // Add performance optimizations
    this.addPerformanceOptimizations();
  }
  
  addScrollAnimations() {
    // Subtle entrance animations for navigation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    // Observe navigation links for subtle entrance effects
    document.querySelectorAll('.nav-link').forEach(link => {
      link.style.opacity = '0.8';
      link.style.transform = 'translateY(-2px)';
      link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      observer.observe(link);
    });
  }
  
  addPerformanceOptimizations() {
    // Passive event listeners for better performance
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    
    // DNS prefetch for external resources
    if (!document.querySelector('link[rel="dns-prefetch"][href="//fonts.googleapis.com"]')) {
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = '//fonts.googleapis.com';
      document.head.appendChild(dnsPrefetch);
    }
    
    // Resource hints for better performance
    this.addResourceHints();
  }
  
  addResourceHints() {
    // Add preconnect for critical resources
    const criticalResources = [
      '//fonts.googleapis.com',
      '//cdn.jsdelivr.net'
    ];
    
    criticalResources.forEach(resource => {
      if (!document.querySelector(`link[rel="preconnect"][href="${resource}"]`)) {
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = resource;
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
      }
    });
  }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const navigation = new NavigationController();
  const enhancements = new NavigationEnhancements();
  
  // Add global navigation reference for external access
  window.navigationController = navigation;
  
  // Performance monitoring (optional)
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Navigation timing:', entry.loadEventEnd - entry.fetchStart, 'ms');
        }
      }
    });
    observer.observe({ entryTypes: ['navigation'] });
  }
});

// ========= END NAVIGATION SYSTEM =========

// Project card animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        });
    });

    // Contact form enhancement
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }

    // Enhanced scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .expertise-item, .metric');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add dynamic hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .contact-link');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // Enhanced geometric shapes animation
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Add random movement on mouse hover
        shape.addEventListener('mouseenter', () => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            shape.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.1)`;
        });
        
        shape.addEventListener('mouseleave', () => {
            shape.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Project card hover effects for visuals
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const visual = card.querySelector('.project-visual');
            if (visual) {
                visual.style.transform = 'scale(1.05)';
                visual.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const visual = card.querySelector('.project-visual');
            if (visual) {
                visual.style.transform = 'scale(1)';
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual && scrolled <= window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Accessibility improvements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

});

// Add dynamic CSS for better focus visibility when using keyboard
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #667eea !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);