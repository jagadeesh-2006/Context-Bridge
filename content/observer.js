function startObserver(platform) {

    let debounceTimer = null;

    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const messages = platform.getMessages();
            if (messages.length === 0) return;
            const snapshot = buildSnapshot(platform, messages);
            saveSnapshot(snapshot);
        }, 1000);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // handle SPA navigation — new chat opened
    let lastURL = window.location.href;
    setInterval(() => {
        if (window.location.href !== lastURL) {
            lastURL = window.location.href;
            browser.runtime.sendMessage({ type: 'CLEAR_SNAPSHOT' });
        }
    }, 1000);

}