Player = function(tcpClient) {
    this.tcpClient = tcpClient;
    
    this._sliderGeneral = document.querySelector("#slider-general");
    this._sliderBacking = document.querySelector("#slider-backing");
    this._sliderLead = document.querySelector("#slider-lead_1");
    this._buttonPause = document.querySelector(".pause");
    this._buttonPlay = document.querySelector(".play");
    this._buttonNext = document.querySelector(".next");
    this._pitch = document.querySelector("#pitch");
    this._tempo = document.querySelector("#tempo");
    this._queue = document.querySelector(".song_queue");
    
    this._initHandlers();
}

Player.prototype = {
    setPitch: function(pitch) {
        this._pitch.innerHTML = pitch;
    },
    setTempo: function(tempo) {
        this._tempo.innerHTML = tempo+"%";
    },
    setGeneralVolume: function(volume) {
        this._sliderGeneral.value = volume;
    },
    setBackingVocalsVolume: function(volume) {
        this._sliderBacking.value = volume;
    },
    setLeadVocals: function(volume) {
        this._sliderLead.value = volume;
    },
    play: function() {
        this._buttonPause.style.display = "block";
        this._buttonPlay.style.display = "none";
    }, 
    pause: function() {
        this._buttonPlay.style.display = "block";
        this._buttonPause.style.display = "none";
    },
    seek: function(time) {
        
    },
    updateStatus: function(xml) {
        state = xml.getAttribute("state");
        if(state == "playing") {
            this.play();
        } else {
            this.pause();
        }
        volumes = xml.getElementsByTagName("volumeList")[0].childNodes;
        for(i=0;i<volumes.length;i++) {
            volume = volumes[i].firstChild.nodeValue;
            switch(volumes[i].nodeName) {
                case "general" :
                    this.setGeneralVolume(volume);
                    break;
                case "bv" :
                    this.setBackingVocalsVolume(volume);
                    break;
            }
        }
        
        pitch = xml.getElementsByTagName("pitch")[0].firstChild.nodeValue;
        this.setPitch(pitch);
        tempo = xml.getElementsByTagName("tempo")[0].firstChild.nodeValue;
        this.setTempo(tempo);
        this._setQueue(xml.getElementsByTagName("queue")[0]);
        
    },
    _setQueue: function(xml) {
        items = xml.childNodes;
        content = "";
        if(items.length) {
            for(i=0;i<items.length;i++) {
                song = new Song(items[i]);
                content += song.render();
            }
        }
        this._queue.innerHTML = content;
        
    },
    _initHandlers: function() {
        var that = this;
        this._sliderGeneral.oninput = function() {
            that.tcpClient.notify("volume",this.value);
        };
        this._sliderBacking.oninput = function() {
            that.tcpClient.notify("chorusvolume",this.value);
        };
        this._sliderLead.oninput = function() {
            that.tcpClient.notify("leadvolume",this.value);
        };
        this._buttonPause.onclick = function() {
            that.tcpClient.notify("pause");
        };
        this._buttonPlay.onclick = function() {
            that.tcpClient.notify("play");
        };
        this._buttonNext.onclick = function() {
            that.tcpClient.notify("next");
        };
    }
}