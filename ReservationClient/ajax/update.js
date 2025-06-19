$(document).ready(function () {
    GetReservation();

    $("#UpdateButton").click(function () {
        let id = $("#Id").val();
        let data = new FormData();
        data.append("Id", id);
        data.append("Name", $("#Name").val());
        data.append("StartLocation", $("#StartLocation").val());
        data.append("EndLocation", $("#EndLocation").val());

        $.ajax({
            url: "http://localhost:5141/api/Reservation",
            type: "PUT",
            data: data,
            processData: false,
            contentType: false,
            success: function (result) {
                $("#resultDiv").show();
                let row = "<tr><td>" + result.id + "</td>" +
                          "<td>" + result.name + "</td>" +
                          "<td>" + result.startLocation + "</td>" +
                          "<td>" + result.endLocation + "</td></tr>";
                $("table tbody").html(row);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    });
});

function GetReservation() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");

    $.ajax({
        url: "http://localhost:5151/api/Reservation/" + id,
        type: "GET",
        contentType: "application/json",
        success: function (res) {
            $("#Id").val(res.id);
            $("#Name").val(res.name);
            $("#StartLocation").val(res.startLocation);
            $("#EndLocation").val(res.endLocation);
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
