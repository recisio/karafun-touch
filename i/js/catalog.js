Catalog = function(xml) {
    this._caption = "";
    this._id = 0;
    this._parse(xml);
    this._initHandler();
}

Catalog.prototype = {
    render: function() {
        html = this._getHtml();
        return html;
    },
    _initHandler: function() {
        var that = this;
        $("body").on("click","#catalog_"+this._id,function() {
            var args = new Array();
            args["id"] = that._id;
            args["offset"] = 0;
            args["limit"] = 10;
            var ev = new CustomEvent("notify", {
                detail:{
                    type:"getList",
                    args:args
                }
            });
            document.dispatchEvent(ev);
        });
    },
    _parse: function(catalog) {
        this._caption = catalog.text();
        this._id = catalog.attr("id");
    },
    _getHtml: function() {
        return '<div class="column half">\n\
<a class="link--card" href="#">\n\
<div class="styles_card" id="catalog_'+this._id+'">\n\
<div class="styles_card__icon"><img src="i/img/genre_2.png"></div>\n\
<div class="styles_card__left"><span class="styles_card__title">'+this._caption+'</span></div>\n\
<div class="clearfix"></div>\n\
</div>\n\
</a>\n\
</div>';
    }
    
  
}