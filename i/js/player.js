Player = function() {
    this._sliderGeneral = $("#slider-general");
    this._sliderBacking = $("#slider-backing");
    this._sliderLead = $("#slider-lead_1");
    this._buttonPause = $(".pause");
    this._buttonPlay = $(".play");
    this._buttonNext = $(".next");
    this._pitch = $("#pitch");
    this._tempo = $("#tempo");
    this._progressBar = $(".controls__progressbar");
     
    this._initHandlers();
}

Player.prototype = {
    _setPitch: function(pitch) {
        this._pitch.html(pitch);
    },
    _setTempo: function(tempo) {
        this._tempo.html(tempo+"%");
    },
    _setGeneralVolume: function(volume) {
        this._sliderGeneral.val(volume);
    },
    _setBackingVocalsVolume: function(volume) {
        this._sliderBacking.val(volume);
    },
    _setLeadVocals: function(volume) {
        this._sliderLead.val(volume);
    },
    _play: function() {
        this._buttonPause.show();
        this._buttonPlay.hide();
    }, 
    _pause: function() {
        this._buttonPlay.show();
        this._buttonPause.hide();
    },
    _seek: function(time) {
        
    },
    _updateStatus: function(xml) {
        var that = this;
        state = xml.find("status").attr("state");
        if(state == "playing") {
            this._play();
        } else {
            this._pause();
        }
        volumes = xml.find("volumeList").children();
        volumes.each(function() {
            volume = parseInt($(this).text());
            switch($(this)[0].nodeName) {
                case "general" :
                    that._setGeneralVolume(volume);
                    break;
                case "bv" :
                    that._setBackingVocalsVolume(volume);
                    break;
            }
        });
        pitch = parseInt(xml.find("pitch").text());
        this._setPitch(pitch);
        tempo = parseInt(xml.find("tempo").text());
        this._setTempo(tempo);
    },
    _fireEvent: function(type,value, args) {
        var ev = new CustomEvent("notify", {
            detail:{
                type:type,
                value:value,
                args:args
            }
        });
        document.dispatchEvent(ev);
    },
    _initHandlers: function() {
        var that = this;
        
        document.addEventListener('status', function(ev) {
            that._updateStatus(ev.detail);
        });
        
        this._sliderGeneral.on("input",function() {
            var args = [];
            args["volume_type"] = "general";
            that._fireEvent("setVolume",this.value, args);
        });
        this._sliderBacking.on("input",function() {
            var args = [];
            args["volume_type"] = "bv";
            that._fireEvent("setVolume",this.value, args);
        });
        this._sliderLead.on("input",function() {
            var args = [];
            args["volume_type"] = "general";
            that._fireEvent("setVolume",this.value);
        });
        this._buttonPause.on("click",function() {
            that._fireEvent("pause");
        });
        this._buttonPlay.on("click",function() {
            that._fireEvent("play");
        });
        this._buttonNext.on("click",function() {
            that._fireEvent("next");
        }); 
    }
}