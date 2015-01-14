Settings = function() {
    this.element = $(".settings");
    this.port = $("#port");
    this.url = $("#url");
    this.fullscreen = $("#fullscreen");
    this._initHandlers();
    this._initValues();
}

Settings.prototype = {
    show: function() {
        this.element.fadeIn();
    },
    hide: function() {
        this.element.fadeOut();
    },
    _save: function() {
        
    },
    _cancel: function() {
        
    },
    _initHandlers: function() {
        var that = this;
        $('#settings_splashscreen').click(function() {
            that.element.fadeIn();
        });
        $("html").keyup(function(event){
            that._onKeyUpHandler(event);
        });
    },
    _initValues: function() {
        var that = this;
        chrome.storage.local.get("uri", function(item) {
            if(item.uri) {
                explode = item.uri.split(":");
                if(explode.length == 3) {
                    that.url.val(explode[1].replace("//", ""));
                    that.port.val(explode[2]);
                }
            }
        });
    },
    _onKeyUpHandler: function(event) {
        if (event.which == 27) {
            this.hide();
        }
    }
}