Catalog = function(xml) {
    this._caption = "";
    this._id = 0;
    this._parse(xml);
}

Catalog.prototype = {
    render: function() {
        html = this._getHtml();
        return html;
    },
    _parse: function(catalog) {
        this._caption = catalog.text();
        this._id = catalog.attr("id");
    },
    _getHtml: function() {
        return '<div class="column half">\n\
<div class="styles_card" id="catalog_'+this._id+'" data-id="'+this._id+'">\n\
<a class="link--card click_feedback" href="#">\n\
<div class="styles_card__left"><span class="styles_card__title">'+this._caption+'</span></div>\n\
<div class="clearfix"></div>\n\
</a>\n\
</div>\n\
</div>';
    }


}