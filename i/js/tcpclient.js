TcpClient = function(settings) {
    this.notificationId = 0;
    this.queryId=0;
    this.settings = settings;
    var that = this;
    document.addEventListener("notify",function(ev) {
        that.notify(ev.detail.type, ev.detail.value);
    });
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
        this.socket.send("<action type='"+type+"'>"+value+"</action>");
    },
    incrementQueryId: function() {
        this.queryId++;
    },
    _onOpenCallback : function() {
        //Hide the socket connect window
        clearTimeout(this.timeout);
        $(".splashscreen").hide();
        this.notify("getstatus");
    },
    _onMessageCallback : function(msg) {
        xml = $.parseXML(msg.data);
        var event = new CustomEvent("message", {
            "detail": $(xml)
        }
        );
        document.dispatchEvent(event);
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
    }
    
}