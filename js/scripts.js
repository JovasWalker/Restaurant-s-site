document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevents default page reload

    const form = event.target;
    const status = document.getElementById("statusMessage");
    const submitButton = form.querySelector('button[type="submit"]');
    const data = new FormData(form);

    // Provide immediate visual feedback and disable duplicate submissions
    status.innerHTML = "Sending message...";
    status.style.color = "#0d6efd"; 
    submitButton.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerHTML = "Thanks! Your message has been sent successfully.";
            status.style.color = "green";
            form.reset(); // Clears the input fields
        } else {
            const responseData = await response.json();
            if (responseData.hasOwnProperty('errors')) {
                status.innerHTML = responseData.errors.map(error => error.message).join(", ");
            } else {
                status.innerHTML = "Oops! There was a problem submitting your form.";
            }
            status.style.color = "red";
        }
    } catch (error) {
        status.innerHTML = "Oops! There was a connectivity problem submitting your form.";
        status.style.color = "red";
    } finally {
        // Re-enable the submit button regardless of outcome
        submitButton.disabled = false;
    }
});