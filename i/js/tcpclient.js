TcpClient = function() {
    this.notificationId = 0;
    this.queryId=0;
    this._setConfig();
}

TcpClient.prototype = {
    connect: function() {
        var that = this;
        this.socket = new WebSocket(this.uri);
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
    _setConfig: function() {
        var that = this;
        chrome.storage.local.get("uri",function(item){
            if(item.uri) {
                that.uri = item.uri;
            }
            that.connect();
        });
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
<<<<<<< HEAD
        //$(".splashscreen").show();
=======
        var that = this;
        $(".splashscreen").show();
>>>>>>> b310fe11f052ce6bfc5139f6bf57e636fb909236
        this.timeout = setTimeout(function(){
            tcpClient = that.connect();
        },3000);
    },
    _onErrorCallback : function(event) {
        
    },
<<<<<<< HEAD
    incrementQueryId: function() {
        this.queryId++;
    },
    notify: function(type, value) {
        this.socket.send("<notify type='"+type+"' value='"+value+"'/>");
    },
    request: function(type) {
        this.incrementQueryId();
        this.socket.send("<request type='"+type+"' id='"+this.queryId+"'/>");
=======
    _incrementQueryId: function() {
        this.queryId++;  
>>>>>>> b310fe11f052ce6bfc5139f6bf57e636fb909236
    }

}