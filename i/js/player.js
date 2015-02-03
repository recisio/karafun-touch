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
        var w = parseInt($(".controls").width());
        duration = song.getDuration();
        step = w/duration;
        var bw = 0;
    /*this._progressInterval = setInterval(function() {
            bw+= step;
            that._progressBar.width(bw);
            if(bw >= w) {
                that._progressBar.width(0);
                clearInterval(that._progressInterval);
            }
        },1000);*/
    },
    _pause: function() {
        this._buttonPlay.show();
        this._buttonPause.hide();
    //clearInterval(this._progressInterval);
    },
    _seek: function(time) {
        
    },
    _disableVolumes: function() {
        $(".slider_box input.optional").attr("disabled","disabled");
    },
    _removeAddedSliders: function() {
        $(".slider_box input.added").parents(".slider_wrapper").remove();
    },
    _switchState: function(state) {
        switch(state) {
            case "playing" :
                this._play();
                break;
            case "infoscreen":
                this._songPlaying.empty();
                this._progressBar.width(0);
                this._pause();
                this._removeAddedSliders();
                break;
            case "idle" :
                this._disableVolumes();
                this._pause();
                this._removeAddedSliders();
                break;
            default:
                this._disableVolumes();
                this._pause();
                break;
        }
    },
    _initVolume : function(name,caption,color,volume) {
        var elem = $("#slider-"+name);
        if(!elem.length) {
            elem = this._createVolumeSlider(name);
        }
        elem.removeAttr("disabled");
        elem.parent().next().html(caption);
        elem.val(volume);
    },
    _createVolumeSlider: function(name) {
        var elem = $("#slider-lead1").parents(".slider_wrapper").clone();
        var slider = elem.find("input");
        slider.attr("id","slider-"+name);
        slider.attr("name",name);
        slider.addClass("added");
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
        $(".controls__sliders").on("input",".slider_box input", function() {
            console.log("inpunt");
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