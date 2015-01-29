Queue = function() {
    var that = this;
    this.container = $(".song_queue");
    this.container.on("dragover", function(ev) {
        ev.preventDefault();
    });
    
    this.container.on("drop", function(event) {
        event.preventDefault();
        var data = $(event.originalEvent.dataTransfer.getData("text"));
        Queue.add(data.attr("song_id"), 99999);
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
                        title : song.getString()
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