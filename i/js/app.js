var tcpClient;
//tcpClient.send("Envoi de la premiere requete");


$(document).ready(function(){
    tcpClient = new TcpClient("ws://dev.adrien.office:8079");
    $("#send-message").click(function() {
        tcpClient.send("lolo");
    })
});