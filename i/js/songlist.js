Songlist = function(xml) {
    var that = this;
    this.container = $(".content__inner .top");
    document.addEventListener("list", function(ev) {
        that._updateList(ev.detail);
    });
    
    document.addEventListener("showstyles", function(ev) {
        that.container.hide();
    });
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
    }

}