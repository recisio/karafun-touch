Song = function(songXml) {
    this._title = "";
    this._artist = "";
    this._year = "";
    this._duration = 0;
    this._status = "";
    this._parse(songXml);
}

Song.prototype = {
    render: function() {
        html = this._getHtml();
        html = html.replace("{SONG_NAME}", this._title);
        html = html.replace("{ARTIST_NAME}", this._artist);
        return html;
    },
    _parse: function(song) {
        this._status = song.attr("status");
        this._title = song.find("title").text();
        this._artist = song.find("artist").text();
        this._year = song.find("year").text();
        this._duration = song.find("duration").text();
    },
    _getHtml: function() {
        return "<div class='song_card'>\n\
<div class='song_card__icon'><img src='i/img/icon_song.png'></div>\n\
<div class='song_card__left'><span class='song_card__title'>{SONG_NAME}</span><span class='song_card__artist'>{ARTIST_NAME}</span></div>\n\
<div class='clearfix'></div>\n\
</div>";
    }
    
  
}