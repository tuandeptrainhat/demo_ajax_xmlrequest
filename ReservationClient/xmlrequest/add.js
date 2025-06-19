function AddReservation() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText);
            var tbody = document.getElementById("resultDiv").querySelector("tbody");

            tbody.innerHTML = "<tr><td>" + response.id + "</td>" +
                              "<td>" + response.name + "</td>" +
                              "<td>" + response.startLocation + "</td>" +
                              "<td>" + response.endLocation + "</td></tr>";
            document.getElementById("resultDiv").style.display = "block";
        }
    };

    var obj = {
        Id: 0,
        Name: document.getElementById("Name").value,
        StartLocation: document.getElementById("StartLocation").value,
        EndLocation: document.getElementById("EndLocation").value
    };

    xhttp.open("POST", "http://localhost:5151/api/Reservation", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Key", "Secret@123"); // nếu yêu cầu
    xhttp.send(JSON.stringify(obj));
}
