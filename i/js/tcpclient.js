TcpClient = function(host) {
    var self = this;
    this.socket = new WebSocket(host);
    this.socket.onopen = function() {
        self.onOpenCallback();
    };
    this.socket.onmessage = function(msg) {
        self.onMessageCallback(msg);
    };
    this.socket.onclose = function() {
        self.onCloseCallback();
    };
    this.socket.onerror = function(event) {
        self.onErrorCallback(event);
    };
}

TcpClient.prototype = {
    onOpenCallback : function() {
    },
    onMessageCallback : function(msg) {
        $("#receive").append(msg.data);
    },
    onCloseCallback : function() {
    },
    onErrorCallback : function(event) {
    },
    send: function(msg) {
        this.socket.send(msg);
        $("#send").append(msg);
    }
    
}