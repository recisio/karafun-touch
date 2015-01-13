Notification = function(text) {
    this.element = $("<div></div>");
    this.parent = $(".notifications")
    this.text = text;
}

Notification.prototype = {
    error : function() {
        this._create("error");
    },
    message: function() {
        this._create("message");
    },
    _create: function(type) {
        this.parent.addClass("notifications--visible");
        this.element.addClass("notification notification--"+type);
        this.element.html(this.text);
        this.element.appendTo($(".notifications"));
        this.element.fadeIn(500);
        var that = this;
        setTimeout(function() {
            that.element.fadeOut(500, function() {
                that.element.remove();
                children = that.parent.children("div");
                if(!children.length) {
                    that.parent.removeClass("notifications--visible");
                }
            });
        },5000);
    }
}