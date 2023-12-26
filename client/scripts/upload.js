document.addEventListener('DOMContentLoaded', function () {
  var dropArea = document.getElementById('dropArea');
  var fileInput = document.getElementById('image');

  // Prevent the default behavior of drag-and-drop
  dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropArea.style.border = '2px dashed #aaa';
  });

  dropArea.addEventListener('dragleave', function () {
    dropArea.style.border = '2px dashed #ccc';
  });

  // Handle the dropped files
  dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    dropArea.style.border = '2px dashed #ccc';

    var files = e.dataTransfer.files;
    fileInput.files = files;
  });
});

function submitForm() {
  var form = document.getElementById('uploadForm');
  var formData = new FormData(form);

  // Use fetch to send the form data to the server
  fetch('https://rental-server-m0k6.onrender.com', {   //something should be here
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    handleResponse(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function handleResponse(data) {
  // Display success or error message to the user
  var messageElement = document.getElementById('message');
  if (data.success) {
    messageElement.textContent = 'Form submitted successfully!';
    // Optionally, clear the form or perform other actions
  } else {
    messageElement.textContent = 'Error submitting form. Please try again.';
  }
}
