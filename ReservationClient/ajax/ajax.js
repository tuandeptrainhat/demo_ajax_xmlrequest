$(document).ready(function () {
    ShowAllReservation();
});

function ShowAllReservation() {
    $("table tbody").html(""); // clear old

    $.ajax({
        url: "http://localhost:5151/api/Reservation",
        type: "GET",
        contentType: "application/json",
        success: function (result) {
            result.forEach(function (value) {
                let row = "<tr>";
                row += "<td>" + value["id"] + "</td>";
                row += "<td>" + value["name"] + "</td>";
                row += "<td>" + value["startLocation"] + "</td>";
                row += "<td>" + value["endLocation"] + "</td>";
                row += "<td><a href='UpdateReservation.html?id=" + value["id"] + "'><img src='icon/edit.png'/></a></td>";
                row += "<td><img class='delete' src='icon/close.png' data-id='" + value["id"] + "'/></td>";
                row += "</tr>";
                $("table tbody").append(row);
            });

            // Gắn sự kiện xoá
            $(".delete").click(function () {
                const reservationId = $(this).data("id");

                $.ajax({
                    url: "http://localhost:5151/api/Reservation/" + reservationId,
                    type: "DELETE",
                    success: function () {
                        ShowAllReservation(); // refresh
                    },
                    error: function (xhr) {
                        console.log(xhr);
                    }
                });
            });
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
