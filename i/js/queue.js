Queue = function() {
    var that = this;
    this.container = $(".song_queue");
    this.container.on("dragover", function(ev) {
        ev.preventDefault();
    });
    
    this.container.on("drop", function(event) {
        event.preventDefault();
        var data = $(event.originalEvent.dataTransfer.getData("text"));
        args = new Array();
        args["song"] = data.attr("song_id");
        var ev = new CustomEvent("notify", {
            detail:{
                type:"addToQueue",
                value:0,
                args:args
            }
        });
        document.dispatchEvent(ev);
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
        });
        this.container.html(content);
    }
}