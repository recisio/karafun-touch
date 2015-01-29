Song = function(songXml) {
    this._title = "";
    this._artist = "";
    this._year = "";
    this._duration = 0;
    this._id = 0;
    this._status = "";
    this._parse(songXml);
    this._initHandler();
}

Song.prototype = {
    render: function() {
        html = this._getHtml();
        return html;
    },
    _initHandler: function() {
        var that = this;
        $("body").on("click","#song_"+this._id,function() {
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
        
        $("body").on("dragstart","#song_"+this._id,function(event) {
            event.originalEvent.dataTransfer.setData("text", event.target.outerHTML);
        });
        
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
        return "<div class='song_card' id='song_"+this._id+"' song_id='"+this._id+"' draggable='true'>\n\
<div class='song_card__icon'><img src='i/img/icon_song.png'></div>\n\
<div class='song_card__left'><span class='song_card__title'>"+this._title+"</span><span class='song_card__artist'>"+this._artist+"</span></div>\n\
<div class='clearfix'></div>\n\
</div>";
    }
    
  
}