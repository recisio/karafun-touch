Song = function(songXml) {
    this._title = "";
    this._artist = "";
    this._year = "";
    this._duration = 0;
    this._id = 0;
    this._status = "";
    this._isInQueue = false;
    this._parse(songXml);
}

Song.prototype = {
    render: function() {
        html = this._getHtml();
        return html;
    },
    isPlaying: function() {
        return this._status == "playing";
    },
    getDuration: function() {
        return this._duration;
    },
    getString: function() {
        return this._title+" - "+this._artist;
    },
    getId: function() {
        return this._id;
    },
    isInQueue: function() {
        this._isInQueue=true;
    },
    getFormattedDuration: function() {
        var e = this._duration.split(",");
        var minutes = Math.floor(e[0] / 60);
        var seconds = e[0] - minutes * 60;
        return this._pad(minutes,2)+":"+this._pad(seconds,2);
    },
    isEqualTo: function(song) {
        return (this._title == song._title && this._artist == song._artist && this._duration == song._duration);
    },
    _pad : function(str, max) {
        str = str.toString();
        return str.length < max ? this._pad("0" + str, max) : str;
    },
    _parse: function(song) {
        this._id = song.attr("id");
        this._status = song.attr("status");
        this._title = song.find("title").text();
        this._artist = song.find("artist").text();
        this._year = song.find("year").text();
        this._duration = song.find("duration").text();
    },
    _getHtml: function() {
        html = "<div class='song_card' id='song_"+this._id+"' data-id='"+this._id+"' draggable='true'>";
        if(this._isInQueue) {
            html+="<img class='delete' src='/i/img/icon_delete.png'>";
        }
        html += "<div class='song_card__left'><span class='song_card__title'>"+this._title+"</span><span class='song_card__artist'>"+this._artist+"</span></div>\n\
<div class='song_card__right'>"+this.getFormattedDuration()+"</div>\n\
<div class='clearfix'></div>";
        if(!this._isInQueue) {
            html+="<div class='card__popup'>\n\
<a href='#' class='click_feedback' data-action='play'>"+chrome.i18n.getMessage("play_now")+"</a>\n\
<a href='#' class='click_feedback' data-action='queue'>"+chrome.i18n.getMessage("add_to_queue")+"</a>\n\
<a href='#' class='click_feedback' data-action='cancel'>"+chrome.i18n.getMessage("cancel")+"</a>\n\
</div>";
        }
        html+="</div>";
        return html;
    }
}