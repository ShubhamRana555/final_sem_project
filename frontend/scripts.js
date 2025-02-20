document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let formData = new FormData();
    let fileInput = document.getElementById("fileInput");
    formData.append("file", fileInput.files[0]);

    fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerHTML = `<p>Detected Plate: ${data.plate_number}</p>`;
    })
    .catch(error => console.error("Error:", error));
});

// Fetch tracked vehicle data
document.addEventListener("DOMContentLoaded", function() {
    fetch("http://127.0.0.1:5000/tracked-vehicles")
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementById("vehicleTableBody");
        tableBody.innerHTML = "";
        data.forEach(vehicle => {
            tableBody.innerHTML += `
                <tr>
                    <td>${vehicle.vehicle_id}</td>
                    <td>${vehicle.plate_number}</td>
                    <td>${vehicle.timestamp}</td>
                    <td>${vehicle.location}</td>
                </tr>`;
        });
    })
    .catch(error => console.error("Error fetching vehicle data:", error));
});
