# DeWork Labs — Sarvam Voice Agent

Next.js landing page that connects to the **DeWork Labs Receptionist** voice agent (Riya) via the Sarvam Agents SDK.

The browser uses `sarvam-conv-ai-sdk/browser`. Your API key stays on the server: `/api/sarvam/*` proxies the signed WebSocket URL request to Sarvam and injects `X-API-Key`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure the API key in `.env.local` (already seeded for local use from `HTML-Embed.html`):

```bash
SARVAM_API_KEY=your_key_here
```

See `.env.example` for the variable name. Never put the key in `NEXT_PUBLIC_*` or client code.

3. Start the dev server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000), click **Talk to Riya**, and allow microphone access.

## Notes

- Microphone access works on `localhost` and HTTPS. Other origins need HTTPS.
- Agent config (`org_id`, `workspace_id`, `app_id`, version `1`, variables) lives in `lib/sarvam.ts`.
- Always end the call (or leave the page) so the SDK can clean up the session.
