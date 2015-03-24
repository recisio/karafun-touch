var tcpClient;
var settings;
$(document).ready(function () {
    settings = new Settings();
    setTimeout(function () {
        if (settings.isReady == 1) {
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
});