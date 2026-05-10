# Context Bridge

> Switch between AI assistants without losing your train of thought.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Platform](https://img.shields.io/badge/platform-Firefox-orange)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active--development-yellow)

---

## Project Status

- ✅ Snapshot engine working on ChatGPT — captures every message automatically
- ✅ Per-tab storage — multiple ChatGPT tabs stay independent
- ✅ SPA navigation handled — new chat detected and snapshot resets
- 🔨 Popup UI — in progress
- 🔨 Handoff prompt generator — in progress

---

## The Problem

Working on a long project with an AI assistant? Here is what keeps happening:

- 🧠 **Context limit hit** — the AI starts forgetting your earlier code, decisions, and errors
- 🔁 **New chat, same pain** — you open a fresh chat and spend 10 messages just catching it up to where you were
- 🔀 **Switching AI tools** — you want a second opinion from Claude or Gemini but have to re-explain everything from scratch
- ⏱️ **Lost momentum** — half your session is spent on context recovery, not actual work

This happens to students and developers every single day.

**Context Bridge fixes this.** One click captures where you are and packages it into a clean handoff prompt — paste it anywhere, continue instantly.

---

## What It Does

Context Bridge runs silently in the background while you chat. Every time a new message is sent it captures a snapshot — what you're working on, the last exchange, the current state — and saves it. When you need to switch tools or start a fresh chat, one click generates a clean handoff prompt you paste directly into any AI.

```
I was working on this in ChatGPT. Pick up where we left off:

Last exchange:
Me: so can you write me a hello world code in python?
AI: Sure! Here's the classic Python "Hello, World!" program...

Continue from here.
```

One click. No re-explaining. Full context transferred.

---

## Supported Platforms

| Platform | Status |
|----------|--------|
| ChatGPT (chatgpt.com) | ✅ Supported |
| Claude (claude.ai) | 🔜 Coming soon |
| Gemini (gemini.google.com) | 🔜 Coming soon |
| Perplexity (perplexity.ai) | 🔜 Planned |

---

## Installation

### Firefox (Current)

1. Clone the repo
   ```bash
   git clone https://github.com/jagadeesh-2006/context-bridge.git
   cd context-bridge
   ```

2. Open Firefox and go to `about:debugging`

3. Click **This Firefox** → **Load Temporary Add-on**

4. Navigate to the `context-bridge` folder and select `manifest.json`

5. Open ChatGPT and start chatting — the extension is now running silently

> A permanent Firefox Add-ons store release is coming once the extension is stable.

### Chrome (Coming Soon)

Chrome support is planned after the Firefox version is complete.

---

## Snapshot Structure

Every snapshot is a structured JSON object saved per tab:

```json
{
  "version": "1",
  "source": "chatgpt",
  "url": "https://chatgpt.com/c/abc123",
  "timestamp": "2026-05-10T18:47:27.822Z",
  "message_count": 7,
  "last_user_message": "so can you write me a hello world code in python?",
  "last_ai_message": "Sure! Here's the classic Python Hello World program...",
  "recent_messages": [...]
}
```

Snapshots capture the last 10 messages. This handles topic shifts naturally — if the user switches to a different subject mid-conversation, the snapshot reflects only the recent context.

---

## How It Works

```
ChatGPT / Claude / Gemini
        ↓
  MutationObserver
  (watches for new messages)
        ↓
  DOM Extractor
  (pulls message text by role)
        ↓
  Snapshot JSON
  (saved per tab in browser storage)
        ↓
  Popup UI
  (click extension icon → copy handoff prompt)
```

---

## Roadmap

- [x] ChatGPT DOM extraction — user and assistant messages
- [x] MutationObserver with debounce — detects new messages without polling
- [x] Per-tab snapshot storage via background script
- [x] SPA navigation detection — resets snapshot on new chat
- [ ] Fix duplicate save on streaming responses
- [ ] Capture code blocks correctly in AI responses
- [ ] Popup UI — show snapshot when clicking extension icon
- [ ] Handoff prompt generator — format snapshot into clean copy-paste text
- [ ] One-click copy button
- [ ] Claude support — DOM extraction for claude.ai
- [ ] Selector resilience — fallback selectors when ChatGPT updates its UI
- [ ] Gemini support
- [ ] Perplexity support
- [ ] Firefox Add-ons store release
- [ ] Chrome manifest V3 support
- [ ] AI-powered summarisation for very long conversations

---

## Why I Built This

- Built because I kept hitting context limits mid-project and losing everything
- Different AI tools are better at different things — but switching always meant starting over
- No existing tool solved this cleanly
- Context Bridge is my attempt to fix it — capture the context, package it, move it anywhere

---

## License

MIT — free to use, modify, and distribute.

---

<p align="center">Built by <a href="https://github.com/jagadeesh-2006">jagadeesh-2006</a></p>