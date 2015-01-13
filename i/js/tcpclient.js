TcpClient = function(host) {
    var self = this;
    this.queryId=0;
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
        //Hide the socket connect window
    },
    onMessageCallback : function(msg) {
        $('div.notification').html(msg.data);
        $('div.notification').toggleClass('notification--visible');
    },
    onCloseCallback : function() {
        //Show the socket connect window
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