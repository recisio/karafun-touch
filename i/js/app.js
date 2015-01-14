var tcpClient;
var settings;
$(document).ready(function () {
    tcpClient = new TcpClient();
    settings =  new Settings();
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
        });
    });

    $('a.topbar__right').click(function () {
        $('.topbar__search').focus();
        return false;
    });

    $('.empty_search').click(function () {
        $('.topbar__search').val('');
    });
    $('.pause').click(function() {
        tcpClient.request("status");
    });
    $('.next').click(function() {
        tcpClient.notify("log", "Je log");
    });
});