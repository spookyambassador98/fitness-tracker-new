document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/profile')
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                document.getElementById('user-info').innerHTML = `
                    <p><strong>Email:</strong> ${data.user.email}</p>
                `;
            }
            if (data.data) {
                document.getElementById('gathered-info').innerHTML = `
                    <p><strong>Current Weight:</strong> ${data.data.Current_weight}</p>
                    <p><strong>Desired Weight:</strong> ${data.data.Desired_weight}</p>
                    <p><strong>Height:</strong> ${data.data.Height}</p>
                    <p><strong>BMI:</strong> ${data.data.BMI}</p>
                    <p><strong>Body Fat Percentage:</strong> ${data.data.Body_Fat_Percentage}</p>
                    <p><strong>BMR:</strong> ${data.data.BMR}</p>
                    <p><strong>RHR:</strong> ${data.data.RHR}</p>
                    <p><strong>MHR:</strong> ${data.data.MHR}</p>
                    <p><strong>LBM:</strong> ${data.data.LBM}</p>
                    <p><strong>WHR:</strong> ${data.data.WHR}</p>
                    <p><strong>VO2 Max:</strong> ${data.data.VO2_Max}</p>
                    <p><strong>Blood Pressure:</strong> ${data.data.Blood_Pressure}</p>
                    <p><strong>Hydration Level:</strong> ${data.data.Hydration_Level}</p>
                `;
            }
        })
        .catch(error => console.error('Error fetching profile data:', error));
});
