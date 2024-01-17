const uri = 'https://rental-server-m0k6.onrender.com'
// const uri = 'http://localhost:3000'
const details = document.querySelectorAll('input, select, textarea');  // Change '.form' to the actual class or ID of your form


const msg = document.querySelector('.message');
const btn = document.querySelector('.submit')

// 

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