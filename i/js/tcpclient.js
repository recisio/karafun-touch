TcpClient = function(settings) {
    this.notificationId = 0;
    this.queryId=0;
    this.settings = settings;
}

TcpClient.prototype = {
    connect: function() {
        var that = this;
        this.socket = new WebSocket(this.settings.getUri());
        this.socket.onopen = function() {
            that._onOpenCallback();
        };
        this.socket.onmessage = function(msg) {
            that._onMessageCallback(msg);
        };
        this.socket.onclose = function() {
            that._onCloseCallback();
        };
        this.socket.onerror = function(event) {
            that._onErrorCallback(event);
        };
    },
    notify: function(type, value) {
        this.socket.send("<notify type='"+type+"' value='"+value+"'/>");
    },
    request: function(type) {
        this._incrementQueryId();
        this.socket.send("<request type='"+type+"' id='"+this.queryId+"'/>");
    },
    _onOpenCallback : function() {
        //Hide the socket connect window
        clearTimeout(this.timeout);
        $(".splashscreen").hide();
    },
    _onMessageCallback : function(msg) {
        notification = new Notification(msg.data+" "+this.notificationId++);
        notification.message();
    },
    _onCloseCallback : function() {
        //Show the socket connect window
        $(".splashscreen").show();
        var that = this;
        this.timeout = setTimeout(function(){
            tcpClient = that.connect();
        },3000);
    },
    _onErrorCallback : function(event) {
        
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
    },
    _incrementQueryId: function() {
        this.queryId++;  
    }
}