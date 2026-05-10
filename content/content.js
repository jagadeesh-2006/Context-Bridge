const br = typeof browser !== 'undefined' ? browser : chrome;

(function() {

    const hostname = window.location.hostname;

    let platform = null;

    if (hostname === 'chatgpt.com') {
        platform = new ChatGPTPlatform();
    } else if (hostname === 'claude.ai') {
        // will add later
        return;
    } else {
        return;
    }

    startObserver(platform);

})();