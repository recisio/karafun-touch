Catalogs = function() {
    var that = this;
    this.container = $(".genres");
    document.addEventListener('catalogList', function(ev) {
        that.updateCatalogs(ev.detail);
    });
    $("#home").click(function() {
        that.container.show();
        RemoteEvent.create("showstyles");
    });
}

Catalogs.prototype = {
    updateCatalogs: function(xml) {
        catalogs = xml.find("catalog");
        content = "";
        catalogs.each(function(){
            //console.log($(this));
            catalog = new Catalog($(this));
            content += catalog.render();
        });
        content+="<div class='clearfix'></div>"
        this.container.html(content);
    }
}