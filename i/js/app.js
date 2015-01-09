var tcpClient;
$(document).ready(function () {
    //tcpClient = new TcpClient("ws://dev.adrien.office:8079");
    $("#send-message").click(function () {
        tcpClient.send("lolo");
    });
    // Volume sliders
    $(function () {
        $('.slider').each(function () {
            var value = parseInt($(this).attr('data-default-volume'));
            $(this).slider({
                orientation: "vertical",
                range: "min",
                min: 0,
                max: 100,
                value: value,
                slide: function (event, ui) {
                    // Do something
                }
            });
        })
    });

    window.onKeyDown = function (e) {
        if (e.keyCode == 27 /* ESC */) {
            e.preventDefault();
        }
    };


});