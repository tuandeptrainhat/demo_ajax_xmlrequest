$(document).ready(function () {
    $("#AddButton").click(function (e) {
        $.ajax({
            url: "http://localhost:5151/api/Reservation",
            headers: {
                Key: "Secret@123"  // nếu API yêu cầu header xác thực
            },
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                Id: 0,
                Name: $("#Name").val(),
                StartLocation: $("#StartLocation").val(),
                EndLocation: $("#EndLocation").val()
            }),
            success: function (result) {
                var str = "<tr><td>" + result["id"] + "</td>" +
                          "<td>" + result["name"] + "</td>" +
                          "<td>" + result["startLocation"] + "</td>" +
                          "<td>" + result["endLocation"] + "</td></tr>";
                $("table tbody").html(str);
                $("#resultDiv").show();
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    });
});
