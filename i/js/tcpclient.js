TcpClient = function(host) {
    var self = this;
    this.socket = new WebSocket(host);
    this.socket.onopen = function() {
        self.onOpenCallback();
    };
    this.socket.onmessage = function(msg) {
        console.log("ok");
        self.onMessageCallback(msg);
    };
    this.socket.onclose = function() {
        self.onCloseCallback();
    };
}

TcpClient.prototype = {
    onOpenCallback : function() {
        $("#content").html("You'are connected to KaraFun");
    },
    onMessageCallback : function(msg) {
        console.log(msg);
    },
    onCloseCallback : function() {
        console.log("Disconnected - status "+this.socket.readyState);
    },
    send: function(msg) {
        this.socket.send(msg);
    }
    
}

tcpClient = new TcpClient("ws://dev.adrien.office:8079");