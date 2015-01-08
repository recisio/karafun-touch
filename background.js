var socketId;

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('window.html', {
        'bounds': {
            'width': 600,
            'height': 800
        }
    });
    
    
    try{
        socket = new WebSocket("ws://dev.adrien.office:8079");
        console.log('WebSocket - status '+socket.readyState);
        socket.onopen    = function(msg){
            console.log("Welcome - status "+this.readyState);
        };
        socket.onmessage = function(msg){
            console.log("Received: "+msg.data);
        };
        socket.onclose   = function(msg){
            console.log("Disconnected - status "+this.readyState);
        };
    }
    catch(ex){
        console.log(ex);
    }
});
        
function str2ab(str) {
    var encoder = new TextEncoder('utf-8');
    return encoder.encode(str).buffer;
}

function ab2str(ab) {
    var dataView = new DataView(ab);
    var decoder = new TextDecoder('utf-8');
    return decoder.decode(dataView);
}

chrome.sockets.tcp.onReceive.addListener(function(info) {
    console.log(ab2str(info.data));
});

chrome.sockets.tcp.onReceiveError.addListener(function(info) {
    console.log(info.resultCode);
});