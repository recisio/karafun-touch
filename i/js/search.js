Search = function() {
    this._timeout = null;
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
        $(".topbar__search").on("keyup", function() {
            clearTimeout(that._timeout);
            var t = $(this);
            that._timeout = setTimeout(function() {
                RemoteEvent.create("search", t.val());
            },500);
        });
    }

}