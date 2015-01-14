Player = function(tcpClient) {
    this.tcpClient = tcpClient;
    this._initHandlers();
}

Player.prototype = {
    setPitch: function() {
        
    },
    setTempo: function() {
        
    },
    setGeneralVolume: function(volume) {
        this.tcpClient.notify("generalvolume",volume);
        
    },
    setBackingVocalsVolume: function(volume) {
        this.tcpClient.notify("backingvocalsvolume",volume);
    },
    setLeadVocals: function(volume) {
        this.tcpClient.notify("leadvocalsvolume",volume);
    },
    next: function() {
        
    },
    play: function() {
    //show pause button
    }, 
    pause: function() {
    //show play button
    },
    _initHandlers: function() {
        var that = this;
        document.querySelector("#slider-general").oninput = function() {
            that.setGeneralVolume(this.value);
        };
        document.querySelector("#slider-backing").oninput = function() {
            that.setBackingVocalsVolume(this.value);
        };
        document.querySelector("#slider-lead_1").oninput = function() {
            that.setLeadVocals(this.value);
        };
    }
}