document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close nav when a link is clicked (useful for single page navigation)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.9)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.7)';
            header.style.boxShadow = 'none';
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    const faders = document.querySelectorAll('.section-title, .glass-panel');
    const skillBars = document.querySelectorAll('.progress');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add appear class for general fade-in elements
                entry.target.classList.add('appear');
                
                // If it's the skills section, animate progress bars
                if (entry.target.id === 'skills' || entry.target.classList.contains('skills-container')) {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('fade-in');
        appearOnScroll.observe(fader);
    });
    
    // Also observe the skills container specifically to trigger progress bars
    const skillsContainer = document.querySelector('.skills-container');
    if(skillsContainer) {
        appearOnScroll.observe(skillsContainer);
    }

    // --- EMAILJS FORM SEND ---
const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            time: new Date().toLocaleString()
        };

        emailjs.send("service_4494", "template_cao8av3", params)
            .then(() => {
                statusDiv.textContent = "Message sent successfully!";
                statusDiv.style.color = "#10b981";

                form.reset();
            })
            .catch((error) => {
                statusDiv.textContent = "Failed to send message!";
                statusDiv.style.color = "red";
                console.log(error);
            })
            .finally(() => {
                btn.textContent = originalText;
                btn.disabled = false;

                setTimeout(() => {
                    statusDiv.textContent = "";
                }, 5000);
            });
    });
}