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
            content += '<div class="column half">\n\
<a class="link--card" href="#">\n\
<div class="song_card">\n\
<div class="song_card__icon"><img src="i/img/genre_2.png"></div>\n\
<div class="song_card__left"><span class="song_card__title">'+$(this).text()+'</span></div>\n\
<div class="clearfix"></div>\n\
</div>\n\
</a>\n\
</div>';
        });
        this.container.html(content);
    }
}