Player = function() {
    this._sliderGeneral = $("#slider-general");
    this._sliderBacking = $("#slider-backing");
    this._sliderLead = $("#slider-lead_1");
    this._buttonPause = $(".pause");
    this._buttonPlay = $(".play");
    this._buttonNext = $(".next");
    this._pitch = $("#pitch");
    this._tempo = $("#tempo");
    this._songPlaying = $(".controls__songtitle");
    this._progressBar = $(".controls__progressbar");
    this._progressInterval = null;
    this._currentSong = null;
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
    _play: function(position) {
        var that = this;
        this._buttonPause.show();
        this._buttonPlay.hide();
        /*var totalDuration = this._currentSong.getDuration();
        var w = parseInt($(".controls").css("width"));
        that._progressBar.css("width",((w/totalDuration)*position)+"px");
        var step = totalDuration/500;
        this._progressInterval = setInterval(function() {
            w = parseInt(that._progressBar.css("width"));
            console.log(w);
            that._progressBar.css("width",(w+step)+"px");
        },500);*/
    }, 
    _pause: function() {
        this._buttonPlay.show();
        this._buttonPause.hide();
        //clearInterval(this._progressInterval);
    },
    _seek: function(time) {
        
    },
    _updateStatus: function(xml) {
        var that = this;
        state = xml.find("status").attr("state");
        positionSecond = 0;
        position = xml.find("position");
        if(position) {
            positionSecond = parseInt(position.text());
        }
        if(state == "playing") {
            this._play(positionSecond);
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
        
        document.addEventListener('play', function(ev) {
            that._currentSong = ev.detail.song;
            that._songPlaying.html(that._currentSong.getString());
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