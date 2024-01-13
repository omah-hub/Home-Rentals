const uri = 'https://rental-server-m0k6.onrender.com'
const form = document.querySelector('.form');  // Change '.form' to the actual class or ID of your form
const msg = document.querySelector('.message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.innerText = '';

    const details = {
        username: form.querySelector('[name="username"]').value,
        address: form.querySelector('[name="address"]').value,
        unitNumber: form.querySelector('[name="unitNumber"]').value,
        selectedCity: form.querySelector('[name="selectedCity"]').value,
        selectedstate: form.querySelector('[name="selectedstate"]').value,
        selectedRoom: form.querySelector('[name="selectedRoom"]').value,
        price: form.querySelector('[name="price"]').value,
        description: form.querySelector('[name="description"]').value,
    };

    if (!details.username || !details.address || !details.unitNumber || !details.selectedCity || !details.selectedstate || !details.selectedRoom || !details.price || !details.description) {
        msg.innerText = 'All fields must be filled';
    } else {
        try {
            const response = await fetch(`${uri}/add-property`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });

            const result = await response.json();
            if (result.error) msg.innerText = result.error;

            if (response.status === 200) {
                msg.innerText = 'Property added successfully!';
                // You may want to redirect the user or perform other actions here
            }

            console.log(result);
        } catch (error) {
            msg.innerText = 'Error occurred during the request';
            console.error(error);
        }
    }
});
