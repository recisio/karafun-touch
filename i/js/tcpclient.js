TcpClient = function(settings, player) {
    this.notificationId = 0;
    this.queryId=0;
    this.settings = settings;
}

TcpClient.prototype = {
    setPlayer: function(player) {
        this.player = player;
    },
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
    request: function(type) {
        this._incrementQueryId();
        this.socket.send("<request type='"+type+"' id='"+this.queryId+"'/>");
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
        xmlDoc = new DOMParser();
        xml = xmlDoc.parseFromString(msg.data,"text/xml");
        this._dispatchMessage(xml);
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
    _dispatchMessage: function(xml) {
        firstChild = xml.firstChild.nodeName;
        switch(firstChild) {
            case "status" :
                this.player.updateStatus(xml.firstChild);
                break;
        }
    }
    
}