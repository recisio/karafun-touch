RemoteEvent = function(){
    
    }

RemoteEvent.create = function(name,detail) {
    if(!detail) {
        var ev = new Event(name);
    } else {
        var ev = new CustomEvent(name, {
            detail:detail
        });
    }
    document.dispatchEvent(ev);
}