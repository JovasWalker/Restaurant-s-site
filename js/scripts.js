/*!
* Start Bootstrap - Han's Restaurant v7.0.9 (https://startbootstrap.com/theme/business-casual)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
*/
// Highlights current date on contact page
window.addEventListener('DOMContentLoaded', event => {
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    listHoursArray[new Date().getDay()].classList.add(('today'));
})


// ==========================================
// EmailJS Integration - Contact Form Handler
// ==========================================
// Initialize EmailJS with your Public Key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init('UFyOCZT3WsR5po9ZD');

// EmailJS Configuration
// Replace with your actual EmailJS Service ID and Template ID
const EMAILJS_SERVICE_ID = 'restaurant';
const EMAILJS_TEMPLATE_ID = 'template_o6ij5rw';

// Handle contact form submission
window.addEventListener('DOMContentLoaded', event => {
    // Highlights current date on contact page
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    if (listHoursArray.length > 0) {
        listHoursArray[new Date().getDay()].classList.add('today');
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

// Function to handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();

    const statusMessage = document.getElementById('statusMessage');
    const submitButton = e.target.querySelector('button[type="submit"]');

    // Disable submit button while sending
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    statusMessage.textContent = '';
    statusMessage.className = 'mt-3 text-center';

    // Prepare template parameters for EmailJS
    const templateParams = {
        user_name: document.getElementById('user_name').value,
        user_email: document.getElementById('user_email').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(response => {
            // Success message
            statusMessage.className = 'mt-3 text-center text-success';
            statusMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        })
        .catch(error => {
            // Error message
            statusMessage.className = 'mt-3 text-center text-danger';
            statusMessage.textContent = '✗ Failed to send message. Please try again later.';
            console.error('EmailJS Error:', error);
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
}