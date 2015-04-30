Songlist = function() {
    this._total = 0;
    this._offset = 0;
    this._countItems = 0;
    this._searchValue = "";
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
        var that = this;
        items.each(function(){
            song = new Song($(this));
            if(that._countItems!= 0 && that._countItems % 2 == 0) {
                content += "<div class='clearfix'></div>";
            }
            content += "<div class='half column'>"+song.render()+"</div>";
            that._countItems++;
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
        var type = "getList"
        var value = undefined;
        args["offset"] = this._offset;
        args["limit"] = Catalogs.limit;
        if(Catalogs.listId) {
            args["id"] = Catalogs.listId;
        } else {
            type = "search";
            value = this._searchValue;
        }
        RemoteEvent.create("notify", {
            type:type,
            args:args,
            value:value
        });
    },
    _reset : function() {
        this._offset = 0;
        this._total = 0;
        this._countItems = 0;
        this._launchNext = false;
        this.container.empty();
    },
    _initHandlers: function() {
        var that = this;
        document.addEventListener("list", function(ev) {
            that._updateList(ev.detail);
        });
        
        document.addEventListener("showstyles", function() {
            that._reset();
            that.container.hide();
        });
        
        document.addEventListener("search",function(ev) {
            Catalogs.listId = 0;
            that._searchValue  = ev.detail;
            that._reset();
            var args = new Array();
            args["offset"] = that._offset;
            args["limit"] = Catalogs.limit;
            RemoteEvent.create("notify", {
                type: "search",
                args: args,
                value : that._searchValue
            });
        });
        
        this.container.on("mouseup",".song_card",function() {
            $('.card__popup').css('display', 'none');
            $(this).children('.card__popup').css('display', 'initial').addClass('visible');
        });
        
        this.container.on("click",".click_feedback",function() {
            var action = $(this).data("action");
            switch(action) {
                case "play":
                    Queue.add($(this).parents(".song_card").data("id"), 0);
                    break;
                case "queue":
                    Queue.add($(this).parents(".song_card").data("id"), 99999);
                    break;
                case "cancel":
                    break;
            }
            $(this).parents(".card__popup").css("display","none");
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