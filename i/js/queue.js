Queue = function() {
    var that = this;
    this.container = $(".song_queue");
    document.addEventListener('message', function(ev) {
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