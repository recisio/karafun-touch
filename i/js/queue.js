Queue = function() {
    this.container = $(".song_queue");
    this._initHandlers();
    this._currentQueue = new Array();
}

Queue.prototype = {
    update: function(xml) {
        queue = xml.find("queue");
        items = queue.children();
        content = "";
        newQueue = new Array();
        items.each(function(){
            song = new Song($(this));
            song.isInQueue();
            newQueue[song.getId()] = song;
            if(song.isPlaying()) {
                RemoteEvent.create("play", {
                    song:song
                });
            }
        });
        
        //check added
        var that = this;
        var i = 0;
        $.each(newQueue, function(key,value) {
            html = $(value.render());
            if(that._currentQueue[key] && !that._currentQueue[key].isEqualTo(value)) {
                $("#song_"+key).replaceWith(html);
                that._currentQueue[value.getId()] = value;
            } else if (!that._currentQueue[key]) {
                html.addClass("appear");
                that._currentQueue[value.getId()] = value;
                that.container.append(html);
            }
            i++;
        });
        
        for(var j=i;j<this._currentQueue.length;j++) {
            $("#song_"+j).remove();
            delete this._currentQueue[j];
        }  
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
    _remove: function(id) {
        var args = [];
        args["id"] = id;
        RemoteEvent.create("notify", {
            type:"removeFromQueue",
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
    
        this.container.on("dragstart",".song_card",function(event) {
            event.originalEvent.dataTransfer.effectAllowed = "move";
            event.originalEvent.dataTransfer.setData("text", $(this).data("id"));
        });
        
        this.container.on("drop",".song_card",function(event) {
            event.preventDefault();
            var oldPosition = event.originalEvent.dataTransfer.getData("text");
            var newPosition = $(this).data("id");
            if(oldPosition != newPosition) {
                that._changePosition(oldPosition, newPosition);
            }
        });
        
        this.container.on("click",".delete", function() {
            that._remove($(this).parent().data("id"));
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