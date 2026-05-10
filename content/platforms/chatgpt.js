class ChatGPTPlatform {

    getMessages() {
        const messageEls = document.querySelectorAll('[data-message-author-role]');
        const messages = [];

        messageEls.forEach(el => {
            const role = el.getAttribute('data-message-author-role');
            let text = '';

            if (role === 'user') {
                text = el.querySelector(
                    '[data-testid="collapsible-user-message-content"] div'
                )?.innerText?.trim();

            } else if (role === 'assistant') {
                const pTags = el.querySelectorAll('.markdown p');
                text = Array.from(pTags)
                            .map(p => p.innerText.trim())
                            .join(' ');
            }

            if (text) {
                messages.push({ role, text });
            }
        });

        return messages;
    }

    getURL() {
        return window.location.href;
    }

    getSource() {
        return 'chatgpt';
    }

}