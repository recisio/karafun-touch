Settings = function() {
    this.isReady = false;
    this.element = document.querySelector(".settings");
    this.portElt = document.querySelector("#port");
    this.urlElt = document.querySelector("#url");
    this.screenElt = document.querySelector("#screen");
    this.port = "";
    this.url = "";
    this.screen = 0;
    this._initHandlers();
    this._initValues();
}

Settings.prototype = {
    show: function() {
        this.element.classList.add("show");
    },
    hide: function() {
        this.element.classList.remove("show");
    },
    getUri: function() {
        return "ws://"+this.url+":"+this.port;
    },
    _save: function() {
        uri = "ws://";
        uri+=this.urlElt.value+":"+this.portElt.value;
        var that = this;
        chrome.storage.local.set({
            "uri":uri,
            "screen" : parseInt(that.screenElt.value)
        }, function(){
            that.port = that.portElt.value
            that.url = that.urlElt.value
            that.screen = that.screenElt.value
            that.hide();
        });
    },
    _initValues: function() {
        var that = this;
        chrome.storage.local.get("uri", function(item) {
            if(item.uri) {
                explode = item.uri.split(":");
                if(explode.length == 3) {
                    that.urlElt.value = that.url = explode[1].replace("//", "");
                    that.portElt.value = that.port = explode[2];
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
            that.screenElt.value = that.screen = screen;
        });
        document.querySelector(".version").innerHTML = chrome.runtime.getManifest().version;
    },
    _initHandlers: function() {
        var that = this;
        document.querySelector('.settings_splashscreen').onclick = function() {
            that.element.classList.add("show");
        };
        document.querySelector("html").onkeyup = function(event) {
            that._onKeyUpHandler(event);
        };
        document.querySelector("#settings__save").onclick = function() {
            that._save();
            return false;
        };
        document.querySelector("#settings__cancel").onclick = function() {
            that.hide();
        };
    },
    _onKeyUpHandler: function(event) {
        if (event.which == 27) {
            this.hide();
        }
    }
}