Queue = function() {
    var that = this;
    this.container = $(".song_queue");
    this.container.on("dragover", function(ev) {
        ev.preventDefault();
    });
    
    document.addEventListener('status', function(ev) {
        that.updateQueue(ev.detail);
    });
}

Queue.prototype = {
    updateQueue: function(xml) {
        queue = xml.find("queue");
        items = queue.children();
        content = "";
        items.each(function(){
            song = new Song($(this));
            content += song.render();
            if(song.isPlaying()) {
                var ev = new CustomEvent("play", {
                    detail:{
                        song : song
                    }
                });
                document.dispatchEvent(ev);
            }
        });
        this.container.html(content);
    }
}

Queue.add = function(song_id, position) {
    args = new Array();
    args["song"] = song_id;
    var ev = new CustomEvent("notify", {
        detail:{
            type:"addToQueue",
            value:position,
            args:args
        }
    });
    document.dispatchEvent(ev);
}

Queue.changePosition = function(oldPosition, newPosition) {
    args = new Array();
    args["id"] = oldPosition;
    var ev = new CustomEvent("notify", {
        detail:{
            type:"changeQueuePosition",
            value:newPosition,
            args:args
        }
    });
    document.dispatchEvent(ev);
}