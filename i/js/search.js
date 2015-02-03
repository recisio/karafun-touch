Search = function() {
    this._timeout = null;
    this.container = $(".content__inner .top");
    this._initHandlers();
}

Search.prototype = {
    _initHandlers: function() {
        
        $('a.topbar__right').on("click",function () {
            $('.topbar__search').focus();
            return false;
        });

        $('.empty_search').on("click",function () {
            $('.topbar__search').val('');
            RemoteEvent.create("showstyles");
        });
        var that = this;
        $(".topbar__search").on("keydown", function() {
            clearTimeout(that._timeout);
            that.container.empty();
            var t = $(this);
            that._timeout = setTimeout(function() {
                var args = new Array();
                args["offset"] = 0;
                args["limit"] = 20;
                RemoteEvent.create("notify", {
                    type: "search",
                    args: args,
                    value : t.val()
                });
            },500);
        });
    }

}