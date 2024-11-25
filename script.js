window.addEventListener('load', function () {
    // Show loader for 5 seconds
    setTimeout(function () {
        // Add fade out animation
        const loader = document.getElementById('loader');
        loader.style.transition = 'opacity 0.5s';
        loader.style.opacity = '0';

        // Remove loader after fade animation
        setTimeout(function () {
            loader.style.display = 'none';
        }, 500);
    }, 3000); // 5000ms = 5 seconds
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animated').forEach((el) => observer.observe(el));

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function (e) {
            if (!e.target.closest('a')) {
                const link = this.querySelector('a');
                if (link) {
                    window.open(link.href, '_blank');
                }
            }
        });
    });

    //Send message form
    document.getElementById('contactForm').addEventListener('ssubmit', function (event) {
        event.preventDefault();

        //Recuperation des données du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const massage = document.getElementById('massage').value;

        //Creatind the object to send
        const data = {
            name: name,
            email: email,
            message: message,
        };

        // Envoi des données via Fetch API
        fetch("https://lionneleecom@gmail.com/contact", { // Remplacez par votre URL de serveur
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    alert("Message sent successfully!");
                    document.getElementById("contactForm").reset(); // Réinitialise le formulaire
                } else {
                    alert("Failed to send message. Please try again later.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while sending the message.");
            });
    });


    /* 
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }); 
    */

    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        // Change menu icon
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Add touch event handling for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                // Swipe left - close menu
                navLinks.classList.remove('active');
            } else {
                // Swipe right - open menu
                navLinks.classList.add('active');
            }
        }
    }
});