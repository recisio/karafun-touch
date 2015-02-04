chrome.app.runtime.onLaunched.addListener(function() {
    chrome.storage.local.get("uri", function(item) {
        if(!item.uri) {
            chrome.storage.local.set({
                "uri":"ws://localhost:57570"
            });
        }
        chrome.app.window.create('index.html', {
            id : "main"
        }, function(createdWindow) {
            createdWindow.fullscreen();
        });
    });
});