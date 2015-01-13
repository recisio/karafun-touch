TcpClient = function() {
    var self = this;
    this.notificationId = 0;
    this.queryId=0;
    this.socket = new WebSocket("ws://dev.adrien.office:57570");
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
        //Hide the socket connect window
        clearTimeout(this.timeout);
        $(".splashscreen").hide();
    },
    onMessageCallback : function(msg) {
        notification = new Notification(msg.data+" "+this.notificationId++);
        notification.message();
    },
    onCloseCallback : function() {
        //Show the socket connect window
        //$(".splashscreen").show();
        this.timeout = setTimeout(function(){
            tcpClient = new TcpClient();
        },3000);
    },
    onErrorCallback : function(event) {
    },
    incrementQueryId: function() {
        this.queryId++;
    },
    notify: function(type, value) {
        this.socket.send("<notify type='"+type+"' value='"+value+"'/>");
    },
    request: function(type) {
        this.incrementQueryId();
        this.socket.send("<request type='"+type+"' id='"+this.queryId+"'/>");
    }

}