$(document).ready(function () {
    $("#GetButton").click(function () {
        $("table tbody").html("");
        $.ajax({
            url: "http://localhost:5151/api/Reservation/" + $("#Id").val(),
            type: "GET",
            contentType: "application/json",
            success: function (result) {
                $("#resultDiv").show();
                if (typeof result !== "undefined" && result !== null) {
                    var str = "<tr><td>" + result["id"] + "</td>" +
                              "<td>" + result["name"] + "</td>" +
                              "<td>" + result["startLocation"] + "</td>" +
                              "<td>" + result["endLocation"] + "</td></tr>";
                    $("table tbody").append(str);
                } else {
                    $("table tbody").append("<td colspan='4'>No Reservation</td>");
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                $("#resultDiv").show();
                $("table tbody").html("<tr><td colspan='4'>Not found</td></tr>");
            }
        });
    });
});
