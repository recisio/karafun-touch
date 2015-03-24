Settings = function() {
    this.isReady = false;
    this.element = $(".settings");
    this.portElt = $("#port");
    this.urlElt = $("#url");
    this.screenElt = $("#screen");
    this.port = "";
    this.url = "";
    this.screen = 0;
    this._initHandlers();
    this._initValues();
}

Settings.prototype = {
    show: function() {
        this.element.addClass("show");
    },
    hide: function() {
        this.element.removeClass("show");
    },
    getUri: function() {
        return "ws://"+this.url+":"+this.port;
    },
    _save: function() {
        uri = "ws://";
        uri+=this.urlElt.val()+":"+this.portElt.val();
        var that = this;
        chrome.storage.local.set({
            "uri":uri,
            "screen" : parseInt(that.screenElt.val())
        }, function(){
            that.port = that.portElt.val()
            that.url = that.urlElt.val()
            that.screen = that.screenElt.val()
            that.hide();
        });
    },
    _initValues: function() {
        var that = this;
        chrome.storage.local.get("uri", function(item) {
            if(item.uri) {
                explode = item.uri.split(":");
                if(explode.length == 3) {
                    that.urlElt.val(that.url = explode[1].replace("//", ""));
                    that.portElt.val(that.port = explode[2]);
                }
                that.isReady = true;
            }
        });
        var screen =0;        
        chrome.storage.local.get("screen", function(item) {
            if(item.screen) {
                screen = item.screen;
            } else {
                screen = 0;
            }
            that.screen = screen;
            that.screenElt.val(screen);
        });
        $(".version").html(chrome.runtime.getManifest().version);
    },
    _initHandlers: function() {
        var that = this;
        $("html").on("click",".settings_splashscreen", function() {
            that.element.addClass("show");
        });
        
        $("html").on("keyup",function(event) {
            that._onKeyUpHandler(event);
        });
        $("html").on("click","#settings__save",function() {
            that._save();
            return false;
        });
        $("html").on("click","#settings__cancel",function() {
            that.hide();
        });
    },
    _onKeyUpHandler: function(event) {
        if (event.which == 27) {
            this.hide();
        }
    }
}