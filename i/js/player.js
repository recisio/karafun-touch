Player = function(tcpClient) {
    this.tcpClient = tcpClient;
    this._initHandlers();
}

Player.prototype = {
    setPitch: function(pitch) {
        
    },
    setTempo: function(tempo) {
        
    },
    setGeneralVolume: function(volume) {
        
    },
    setBackingVocalsVolume: function(volume) {
        
    },
    setLeadVocals: function(volume) {
        
    },
    play: function() {
        
    }, 
    pause: function() {
        
    },
    seek: function(time) {
        
    },
    _initHandlers: function() {
        var that = this;
        document.querySelector("#slider-general").oninput = function() {
            that.tcpClient.notify("volume",this.value);
        };
        document.querySelector("#slider-backing").oninput = function() {
            that.tcpClient.notify("chorusvolume",this.value);
        };
        document.querySelector("#slider-lead_1").oninput = function() {
            that.tcpClient.notify("leadvolume",this.value);
        };
        document.querySelector(".pause").onclick = function() {
            that.tcpClient.notify("pause");
        };
        document.querySelector(".play").onclick = function() {
            that.tcpClient.notify("play");
        };
        document.querySelector(".next").onclick = function() {
            that.tcpClient.notify("next");
        };
    }
}