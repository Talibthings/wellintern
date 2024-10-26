document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Improved FAQ toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        answer.style.display = 'none';

        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('p').style.display = 'none';
                    otherItem.querySelector('h3').classList.remove('active');
                }
            });

            // Toggle the clicked FAQ
            answer.style.display = isOpen ? 'none' : 'block';
            question.classList.toggle('active', !isOpen);
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > headerHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-item h2');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 100;
            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.round(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            };
            updateStat();
        });
    };

    // Trigger animation when stats are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats');
    observer.observe(statsSection);

    // If you have any specific JavaScript referencing RecruitPro, update it
    // For example, if you have any analytics or tracking:
    function trackSignup() {
        analytics.track('Signup', {
            platform: 'WellIntern'
        });
    }
});
