document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const config = {
            serverUrl: 'https://rental-server-m0k6.onrender.com', // Replace with your actual deployed server URL
            submitEndpoint: '/',
        };

        const formData = new FormData(form);
        submitPropertyData(config, formData);
    });

    // Function to submit property data to the server
    function submitPropertyData(config, formData) {
        const submitUrl = `${config.serverUrl}${config.submitEndpoint}`;

        fetch(submitUrl, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Form submitted successfully!');
                    // Redirect or perform other actions as needed
                } else {
                    alert('Error submitting form. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    }
});


