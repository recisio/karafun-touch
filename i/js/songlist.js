Songlist = function(xml) {
    this.container = $(".content__inner .top");
    this._initHandlers();
}

Songlist.prototype = {
    _updateList:function(xml) {
        list = xml.find("list");
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
        });
        this.container.html(content);
        this.container.show();
        $(".genres").hide();
    },
    _initHandlers: function() {
        var that = this;
        document.addEventListener("list", function(ev) {
            that._updateList(ev.detail);
        });
        
        document.addEventListener("showstyles", function(ev) {
            that.container.hide();
        });
        
        $(".content__inner").off("click",".song_card").on("click",".song_card",function() {
            Queue.add($(this).attr("song_id"), 99999);
        });
    }

}