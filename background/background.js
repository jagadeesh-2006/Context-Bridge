const br = typeof browser !== 'undefined' ? browser : chrome;

br.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SAVE_SNAPSHOT') {
        const tabId = sender.tab.id.toString();
        br.storage.local.set({ [tabId]: message.snapshot }, () => {
            sendResponse({ success: true });
        });
        return true; // keeps the message channel open for async response
    }

    if (message.type === 'GET_SNAPSHOT') {
        br.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id.toString();
            br.storage.local.get(tabId, (result) => {
                sendResponse({ snapshot: result[tabId] || null });
            });
        });
        return true;
    }

    if (message.type === 'CLEAR_SNAPSHOT') {
        const tabId = sender.tab.id.toString();
        br.storage.local.remove(tabId, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});