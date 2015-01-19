Player = function(tcpClient) {
    this.tcpClient = tcpClient;
    this._initHandlers();
}

Player.prototype = {
    setPitch: function() {
        
    },
    setTempo: function() {
        
    },
    _setGeneralVolume: function(volume) {
        this.tcpClient.notify("generalvolume",volume);
        
    },
    _setBackingVocalsVolume: function(volume) {
        this.tcpClient.notify("backingvocalsvolume",volume);
    },
    _setLeadVocals: function(volume) {
        this.tcpClient.notify("leadvocalsvolume",volume);
    },
    next: function() {
        
    },
    _play: function() {
    //show pause button
    }, 
    _pause: function() {
    //show play button
    },
    _initHandlers: function() {
        var that = this;
        document.querySelector("#slider-general").oninput = function() {
            that._setGeneralVolume(this.value);
        };
        document.querySelector("#slider-backing").oninput = function() {
            that._setBackingVocalsVolume(this.value);
        };
        document.querySelector("#slider-lead_1").oninput = function() {
            that._setLeadVocals(this.value);
        };
        document.querySelector(".pause").onclick = function() {
            that._play();
        };
        document.querySelector(".play").onclick = function() {
            that._pause();
        };
    }
}