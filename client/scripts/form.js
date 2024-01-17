const uri = 'https://rental-server-m0k6.onrender.com'
// const uri = 'http://localhost:3000'
const details = document.querySelectorAll('input, select, textarea');  // Change '.form' to the actual class or ID of your form


const msg = document.querySelector('.message');
const btn = document.querySelector('.submit')

// btn.addEventListener('click', async (e) => {
//     e.preventDefault();
//     msg.innerText = '';

//     const details = {
//         username: form.querySelector('[name="username"]').value,
//         address: form.querySelector('[name="address"]').value,
//         unitNumber: form.querySelector('[name="unitNumber"]').value,
//         selectedCity: form.querySelector('[name="selectedCity"]').value,
//         selectedstate: form.querySelector('[name="selectedstate"]').value,
//         selectedRoom: form.querySelector('[name="selectedRoom"]').value,
//         price: form.querySelector('[name="price"]').value,
//         description: form.querySelector('[name="description"]').value,
//     };

//     if (!details.username || !details.address || !details.unitNumber || !details.selectedCity || !details.selectedstate || !details.selectedRoom || !details.price || !details.description) {
//         msg.innerText = 'All fields must be filled';
//     } else {
//         try {
//             const response = await fetch(`${uri}/properties`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(details),
//             });

//             const result = await response.json();
//             if (result.error) msg.innerText = result.error;

//             if (response.status === 200) {
//                 msg.innerText = 'Property added successfully!';
//                 // You may want to redirect the user or perform other actions here
//             }

//             console.log(result);
//         } catch (error) {
//             msg.innerText = 'Error occurred during the request';
//             console.error(error);
//         }
//     }
// });

btn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("Button clicked")
    msg.innerText = ''

    if (!details[0].value || !details[1].value || !details[2].value || !details[3].value || !details[4].value || !details[5].value || !details[6].value || !details[7].value) {
        msg.innerText = 'All fields must be filled'
    }
    else {
        let property = {
            username: details[0].value,
            address: details[1].value,
            unitNumber: details[2].value,
            selectedCity: details[3].value,
            selectedstate: details[4].value,
            selectedRoom: details[5].value,
            price: details[6].value,
            description: details[7].value 
        }
        createProperty(property)
    }
})
async function createProperty(data) {
    try {
        console.log("sending data:", data);
        const response = await fetch(`${uri}/properties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.error) msg.innerText = result.error

        if (response.status === 200) window.location.href = 'index.html'

        console.log(result);
    } catch (error) {
        msg.innerText = error.error
        console.error(error);
    }
}