Songlist = function() {
    this._total = 0;
    this._offset = 0;
    this._countItems = 0;
    this.container = $(".content__inner .top");
    this._launchNext = false;
    this._initHandlers();
}

Songlist.prototype = {
    _updateList:function(xml) {
        list = xml.find("list");
        this._total = list.attr("total");
        items = list.children();
        content = "";
        var i =0;
        items.each(function(){
            song = new Song($(this));
            if(i!= 0 && i % 2 == 0) {
                content += "<div class='clearfix'></div>";
            }
            content += "<div class='half column'>"+song.render()+"</div>";
            i++;
            this._countItems++;
        });
        if(this.container.is(":visible")) {
            this.container.append(content);
        } else {
            this.container.html(content);
            this.container.show();
            $(".genres").hide();
        }
    },
    _loadNext: function() {
        this._offset+=Catalogs.limit;
        var args = new Array();
        args["id"] = Catalogs.listId;
        args["offset"] = this._offset;
        args["limit"] = Catalogs.limit;
        RemoteEvent.create("notify", {
            type:"getList",
            args:args
        });
    },
    _initHandlers: function() {
        var that = this;
        document.addEventListener("list", function(ev) {
            that._updateList(ev.detail);
        });
        
        document.addEventListener("showstyles", function() {
            that._offset = 0;
            that._total = 0;
            this._countItems = 0;
            that._launchNext = false;
            that.container.empty();
            that.container.hide();
        });
        
        this.container.on("click",".song_card",function() {
            Queue.add($(this).data("id"), 99999);
        });
        
        $(".content").on("scroll",function(ev) {
            if(that._launchNext) {
                that._launchNext = false;
                that._loadNext();
                return;
            }
            if(that.container.is(":visible") && that._countItems <= that._total) {
                if($(".song_card:last").offset().top < $(window).height()) {
                    that._launchNext = true;
                }
            }
        });
    }

}