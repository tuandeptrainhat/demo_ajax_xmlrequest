ShowAllReservation();

function ShowAllReservation() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:5141/api/Reservation", true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const tbody = document.getElementById("apiTable").querySelector("tbody");
            tbody.innerHTML = "";

            JSON.parse(this.responseText).forEach(function (data) {
                tbody.innerHTML += "<tr>" +
                    "<td>" + data.id + "</td>" +
                    "<td>" + data.name + "</td>" +
                    "<td>" + data.startLocation + "</td>" +
                    "<td>" + data.endLocation + "</td>" +
                    "<td><a href='UpdateReservation.html?id=" + data.id + "'><img src='icon/edit.png'/></a></td>" +
                    "<td><img class='delete' src='icon/close.png'/></td>" +
                    "</tr>";
            });

            CreateClickEvent();
        }
    };
}

function CreateClickEvent() {
    const deleteButtons = document.getElementsByClassName("delete");

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function (e) {
            const resId = e.target.closest("tr").childNodes[0].innerHTML;

            const xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "http://localhost:5151/api/Reservation/" + resId, true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    ShowAllReservation();
                }
            };
            xhttp.send();
        });
    }
}
