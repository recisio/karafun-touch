Catalogs = function() {
    var that = this;
    this.container = $(".genres");
    document.addEventListener('catalogList', function(ev) {
        that.updateCatalogs(ev.detail);
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
        this.container.html(content);
    }
}