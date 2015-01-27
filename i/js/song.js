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
        this._status = song.getAttribute("status");
        this._title = song.getElementsByTagName("title")[0].firstChild.nodeValue;
        this._artist = song.getElementsByTagName("artist")[0].firstChild.nodeValue;
        this._year = song.getElementsByTagName("year")[0].firstChild.nodeValue;
        this._duration = song.getElementsByTagName("duration")[0].firstChild.nodeValue;
    },
    _getHtml: function() {
        return "<div class='song_card'>\n\
<div class='song_card__icon'><img src='i/img/icon_song.png'></div>\n\
<div class='song_card__left'><span class='song_card__title'>{SONG_NAME}</span><span class='song_card__artist'>{ARTIST_NAME}</span></div>\n\
<div class='clearfix'></div>\n\
</div>";
    }
    
  
}