Catalogs = function() {
    this.container = $(".genres");
    this._initHandler();
}

Catalogs.prototype = {
    updateCatalogs: function(xml) {
        catalogs = xml.find("catalog");
        content = "";
        catalogs.each(function(){
            catalog = new Catalog($(this));
            content += catalog.render();
        });
        content+="<div class='clearfix'></div>";
        this.container.html(content);
    },
    _initHandler: function() {
        var that = this;
        document.addEventListener('catalogList', function(ev) {
            that.updateCatalogs(ev.detail);
        });
        
        document.addEventListener('showstyles', function(ev) {
            Catalogs.listId = 0;
            that.container.show();
        });
        
        $("#home").click(function() {
            RemoteEvent.create("notify", {
                type : "getCatalogList"
            });
            RemoteEvent.create("showstyles");
        });
        $(".content__inner").on("click",".styles_card",function() {
            var args = new Array();
            Catalogs.listId = args["id"] = $(this).data("id");
            args["offset"] = 0;
            args["limit"] = Catalogs.limit;
            RemoteEvent.create("notify", {
                type:"getList",
                args:args
            });
        });
    }
}

Catalogs.listId = 0;
Catalogs.limit = 20;