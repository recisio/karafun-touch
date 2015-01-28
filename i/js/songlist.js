Songlist = function(xml) {
    var that = this;
    this.container = $(".content__inner .top");
    document.addEventListener("list", function(ev) {
        that._updateList(ev.detail);
    });
}

Songlist.prototype = {
    _updateList:function(xml) {
        list = xml.find("list");
        items = list.children();
        content = "";
        items.each(function(){
            song = new Song($(this));
            content += "<div class='half column'>"+song.render()+"</div>";
        });
        this.container.html(content);
    }
    
}