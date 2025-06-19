GetReservation();

function GetReservation() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            document.getElementById("Id").value = response.id;
            document.getElementById("Name").value = response.name;
            document.getElementById("StartLocation").value = response.startLocation;
            document.getElementById("EndLocation").value = response.endLocation;
        }
    };
    xhttp.open("GET", "http://localhost:5151/api/Reservation/" + id, true);
    xhttp.send();
}

document.getElementById("UpdateButton").onclick = function () {
    let xhttp = new XMLHttpRequest();
    let data = new FormData();

    data.append("Id", document.getElementById("Id").value);
    data.append("Name", document.getElementById("Name").value);
    data.append("StartLocation", document.getElementById("StartLocation").value);
    data.append("EndLocation", document.getElementById("EndLocation").value);

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            let tbody = document.getElementById("resultDiv").querySelector("tbody");
            tbody.innerHTML = "<tr><td>" + response.id + "</td>" +
                              "<td>" + response.name + "</td>" +
                              "<td>" + response.startLocation + "</td>" +
                              "<td>" + response.endLocation + "</td></tr>";
            document.getElementById("resultDiv").style.display = "block";
        }
    };

    xhttp.open("PUT", "http://localhost:5151/api/Reservation", true);
    xhttp.send(data);
};
