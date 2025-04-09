document.getElementById('next').addEventListener('click', function() {
    document.getElementById('form-1').style.transform = 'translateX(-100%)';
    document.getElementById('form-2').style.transform = 'translateX(0)';
});

document.getElementById('complete').addEventListener('click', function() {
    const form1Data = new FormData(document.getElementById('form1'));
    const form2Data = new FormData(document.getElementById('form2'));
    
    // Combine form data if needed
    for (let [name, value] of form2Data) {
        form1Data.append(name, value);
    }
    
    // Example of logging all form data to console
    for (let [name, value] of form1Data) {
        console.log(name + ': ' + value);
    }
    
    alert('Form submitted successfully!');
    // Optionally, you can perform an AJAX request to submit the form data to the server
});
