function buildSnapshot(platform, messages) {

    const last10 = messages.slice(-10);

    const lastUser = [...last10].reverse().find(m => m.role === 'user');
    const lastAI   = [...last10].reverse().find(m => m.role === 'assistant');

    return {
        version:           "1",
        source:            platform.getSource(),
        url:               window.location.href,
        timestamp:         new Date().toISOString(),
        message_count:     messages.length,
        last_user_message: lastUser ? lastUser.text.slice(0, 300) : '',
        last_ai_message:   lastAI   ? lastAI.text.slice(0, 300)   : '',
        recent_messages:   last10
    };

}

function saveSnapshot(snapshot) {
    browser.runtime.sendMessage({
        type: 'SAVE_SNAPSHOT',
        snapshot: snapshot
    }).then(() => {
        console.log('Context Bridge: snapshot saved', snapshot);
    }).catch(err => {
        console.error('Context Bridge: save failed', err);
    });
}