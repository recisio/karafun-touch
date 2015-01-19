Database = function() {
    if (Database.caller != Database.getInstance ) {  
        throw new Error("This object cannot be instanciated");  
    }
    
    request = indexedDB.open("remote",1);
    request.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
        if(!thisDB.objectStoreNames.contains("songs")) {
            var songStore = thisDB.createObjectStore("songs", {
                keyPath: "song_id"
            });
            songStore.createIndex("by_title","title")
            songStore.createIndex("by_artist","artist")
        }
        if(!thisDB.objectStoreNames.contains("styles")) {
            thisDB.createObjectStore("styles", {
                keyPath: "style_id"
            });
        }
    }
    
    request.onsuccess = function(e) {
        console.log("Success!");
        this.db = e.target.result;
    }
 
    request.onerror = function(e) {
        console.log("Error");
        console.dir(e);
    }
    
}

Database.prototype = {
    getInstance: function() {
        if (this.instance == null) {  
            this.instance = new Database();  
        }
        return this.instance;
    },
    add: function(type,object) {
        var transaction = this.db.transaction([type],"readwrite");
        var store = transaction.objectStore(type);
        //Perform the add
        var request = store.add(object);
    },
    get: function(type,id) {
        var transaction = this.db.transaction([type], "readonly");
        var objectStore = transaction.objectStore(type);
        var ob = objectStore.get(id);
    }
}