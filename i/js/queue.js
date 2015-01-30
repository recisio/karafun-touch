Queue = function() {
    this.container = $(".song_queue");
    this._initHandlers();
}

Queue.prototype = {
    update: function(xml) {
        queue = xml.find("queue");
        items = queue.children();
        content = "";
        items.each(function(){
            song = new Song($(this));
            content += song.render();
            if(song.isPlaying()) {
                RemoteEvent.create("play", {
                    song:song
                });
            }
        });
        this.container.html(content);
    },
    clear: function() {
        RemoteEvent.create("notify", {
            type: "clearQueue"
        });
    },
    _changePosition: function(oldPosition,newPosition) {
        args = new Array();
        args["id"] = oldPosition;
        RemoteEvent.create("notify", {
            type:"changeQueuePosition",
            value:newPosition,
            args:args
        });
    },
    _initHandlers: function() {
        var that = this;
        this.container.on("dragover", function(ev) {
            ev.preventDefault();
        });
    
        document.addEventListener('status', function(ev) {
            that.update(ev.detail);
        });
    
        this.container.off("dragstart",".song_card").on("dragstart",".song_card",function(event) {
            event.originalEvent.dataTransfer.effectAllowed = "move";
            event.originalEvent.dataTransfer.setData("text", $(this).attr("song_id"));
        });
        
        this.container.off("drop",".song_card").on("drop",".song_card",function(event) {
            event.preventDefault();
            var oldPosition = event.originalEvent.dataTransfer.getData("text");
            var newPosition = $(this).attr("song_id");
            if(oldPosition != newPosition) {
                that._changePosition(oldPosition, newPosition);
            }
        });
    }
}

Queue.add = function(song_id, position) {
    args = new Array();
    args["song"] = song_id;
    RemoteEvent.create("notify", {
        type:"addToQueue",
        value:position,
        args:args
    });
}