var tcpClient;
var settings;
var eff_timeout;
$(document).ready(function () {
    //settings = new Settings();
    setTimeout(function () {
        if (settings.isReady = 1) {
            tcpClient = new TcpClient(settings);
            tcpClient.connect();
            player = new Player();
            queue = new Queue();
            catalogs = new Catalogs();
            songlist = new Songlist();
            search = new Search();
            clearTimeout();
        }
    }, 1000);

    $('body').on('mouseup', '.click_feedback', function () {
        $(this).addClass('clicked');
        clearTimeout(eff_timeout);
        eff_timeout = setTimeout(function () {
            $('.click_feedback').removeClass('clicked');
        }, 500);
    }).on('mousedown', '.lift', function () {
        var me = $(this);
        eff_timeout = setTimeout(function () {
            me.addClass('lifted');
        }, 500);
    }).on('mouseup', '.lift', function () {
        $(this).removeClass('lifted');
    }).on('mouseup', '.song_card', function () {
        $(this).children('.card__popup').css('display', 'initial').addClass('visible');
    });

});