var tcpClient;
var manifest;
$(document).ready(function () {
    manifest = chrome.runtime.getManifest();
    tcpUrl = manifest.sockets.tcp.connect;
    tcpClient = new TcpClient("ws://"+tcpUrl);
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

    window.onKeyDown = function (e) {
        if (e.keyCode === 27 /* ESC */) {
            e.preventDefault();
        }
    };

    $('a.topbar__right').click(function () {
        $('.topbar__search').focus();
        return false;
    });

    $('.empty_search').click(function () {
        $('.topbar__search').val('');
    });
    $('.play').click(function() {
        tcpClient.request("status");
    });
    $('.next').click(function() {
        tcpClient.notify("log", "Je log");
    });

    function setNotification(message) {
        $('div.notification').html(message);
    }

    function toggleNotification() {
        $('div.notification').toggleClass('notification--visible');
        setTimeout(function () {
            $('div.notification').toggleClass('notification--visible');
        }, 5000);
    }

    /* TEST ONLY */
    $('.toggle-notification').click(function () {
        setNotification('This is a demo notification');
        toggleNotification();
        return false;
    });

});