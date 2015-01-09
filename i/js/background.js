chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        id : "main"
    }, function(createdWindow) {
        createdWindow.fullscreen();
    });
});