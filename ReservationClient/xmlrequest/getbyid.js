function GetReservation() {
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

    xhttp.open("GET", "http://localhost:5151/api/Reservation/" + document.getElementById("Id").value, true);
    xhttp.send();
}
