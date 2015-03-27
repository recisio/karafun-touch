Player = function() {
    this._buttonPause = $(".pause");
    this._buttonPlay = $(".play");
    this._buttonNext = $(".next");
    this._pitch = $("#pitch");
    this._tempo = $("#tempo");
    this._songPlaying = $(".controls__songtitle");
    this._progressBar = $(".controls__progressbar");
    this._progressInterval = null;
    this._position = 0;
    this._initHandlers();
    this._volumes = new Array();
}

Player.prototype = {
    _setPitch: function(pitch) {
        this._pitch.html(pitch);
    },
    _setTempo: function(tempo) {
        this._tempo.html(tempo+"%");
    },
    _play: function() {
        this._buttonPause.show();
        this._buttonPlay.hide();
    },
    _progress: function(song) {
        clearInterval(this._progressInterval);
        var w = parseInt($(".controls").width());
        var duration = song.getDuration();
        var step = w/duration*(Player.intervalProgress/1000);
        var baseWidth = w/duration*this._position;
        this._progressBar.width(baseWidth);
        var that = this;
        this._progressInterval = setInterval(function() {
            baseWidth+= step;
            that._progressBar.width(baseWidth);
            if(baseWidth >= w) {
                that._progressBar.width(0);
                clearInterval(that._progressInterval);
            }
        },Player.intervalProgress);
    },
    _pause: function() {
        this._buttonPlay.show();
        this._buttonPause.hide();
        clearInterval(this._progressInterval);
        if(this._position == 0) {
            this._songPlaying.empty();
            this._removeAddedSliders();
            this._progressBar.width(0);
        }
    },
    _removeAddedSliders: function() {
        $(".slider_box input.optional").parents(".slider_wrapper").remove();
    },
    _switchState: function(state) {
        switch(state) {
            case "playing" :
                this._play();
                break;
            case "infoscreen":
                this._pause();
                break;
            default:
                this._pause();
                break;
        }
    },
    _initVolume : function(name,caption,color,volume) {
        var elem = $("#slider-"+name);
        if(!elem.length) {
            elem = this._createVolumeSlider(name);
        }
        if(caption.length == 0 && name.indexOf("lead")>-1) {
            caption = chrome.i18n.getMessage("lead");
        }
        elem.parent().next().html(caption);
        elem.parent().next().css("color",color);
        elem.val(volume);
    },
    _createVolumeSlider: function(name) {
        var elem = $("#slider-general").parents(".slider_wrapper").clone();
        var slider = elem.find("input");
        slider.attr("id","slider-"+name);
        slider.attr("name",name);
        slider.addClass("optional");
        elem.appendTo(".controls__sliders");
        return slider;
    },
    _updateVolumes: function(volumes) {
        var that=this;
        volumes.each(function() {
            volume = parseInt($(this).text());
            color = $(this).attr("color");
            caption = $(this).attr("caption");
            name = $(this)[0].nodeName;
            that._initVolume(name,caption,color,volume);
        }); 
    },
    _updateStatus: function(xml) {
        state = xml.find("status").attr("state");
        this._switchState(state);
        position = xml.find("position");
        if(position) {
            this._position = parseInt(position.text());
        } else {
            this._position = 0;
        }
        volumes = xml.find("volumeList").children();
        this._updateVolumes(volumes);
        pitch = parseInt(xml.find("pitch").text());
        this._setPitch(pitch);
        tempo = parseInt(xml.find("tempo").text());
        this._setTempo(tempo);
    },
    _fireEvent: function(type,value, args) {
        RemoteEvent.create("notify", {
            type:type,
            value:value,
            args:args
        });
    },
    _initHandlers: function() {
        var that = this;
        
        document.addEventListener('status', function(ev) {
            that._updateStatus(ev.detail);
        });
        
        document.addEventListener('play', function(ev) {
            that._songPlaying.html(ev.detail.song.getString());
            that._progress(ev.detail.song)
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
        $(".controls__sliders").on("click",".slider__caption", function() {
            var input = $(this).prev().find("input");
            var currentVolume = input.val();
            var name = input.attr('name');
            if(currentVolume > 0) {
                that._volumes[name] = currentVolume;
                currentVolume = 0;
            } else {
                currentVolume = that._volumes[name];
            }
            var args = [];
            args["volume_type"] = name;
            that._fireEvent("setVolume",currentVolume, args);
        });
        $(".controls__sliders").on("change",".slider_box input", function() {
            var args = [];
            args["volume_type"] = $(this).attr("name");
            that._fireEvent("setVolume",this.value, args);
        });
        $(".pitch").on("click", function(){
            p = parseInt(that._pitch.html());
            if($(this).data("type") == 'minus') {
                p--;
            } else {
                p++;
            }
            that._fireEvent("pitch",p);
        });
        $(".tempo").on("click", function(){
            p = parseInt(that._tempo.html());
            if($(this).data("type") == 'minus') {
                p-=10;
            } else {
                p+=10;
            }
            that._fireEvent("tempo",p);
        });
    }
}

Player.intervalProgress = 500;