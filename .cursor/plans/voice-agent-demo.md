# Homepage voice demo

Status: **not started**  
Scope: homepage card only (`components/landing/voice-agent-card.tsx`). Do not change other landing sections or `/portfolio/[slug]` unless asked.

Lightweight rule: load the voice SDK on Talk click (dynamic import), proxy only the signed-URL GET, pulse with CSS (no per-frame React state).

---

## Locked decisions

| Item | Choice |
|---|---|
| Client vendor names | None. No SDK/vendor strings in UI, storage keys, or public API paths |
| `user_identifier_type` | `'custom'` |
| `user_identifier` | `crypto.randomUUID()` per attempt (browser) |
| App version | `1` (committed) |
| `agent_variables` | omit |
| `interaction_type` | CALL, 16 kHz in / 16 kHz out |
| API key | `SARVAM_API_KEY` in `.env` / Vercel. Never `NEXT_PUBLIC_*`. Dummy key on client |
| Auth | HTTP GET proxy only. Audio: browser ↔ platform WebSocket |
| Session cap env | `VOICE_AGENT_DEMO_LIMIT` (server). Default `2` if unset |
| Cap into the card | `app/page.tsx` reads env → `sessionCap` prop (not `NEXT_PUBLIC_*`) |
| Storage | `localStorage` key `dw:demo:sessions` (integer). Clearing it is accepted |
| Count | Increment only after a **successful** session: connected, then hangup (user / agent / auto) |
| At cap | Talk is a no-op (no dock, no scroll, no prompt) |
| User hangup | Talk again while a call is live → `stop()`. No End button |
| Call length | Agent setting in Indus (~1–3 min). No client timer |
| Org / workspace / app | `01a009b0-7836-771b-8c1c-dd0d7e0e54b4` / `01a009b0-783d-72c5-b2ac-97eda2ede40e` / `deWork-Labs-6710e651-9e94` |

### Confirm before Phase 1

- [ ] Committed version **1** exists for this app
- [ ] Talk-again-to-hangup is OK

---

## Phase 0 — Baseline (already done)

- [x] Card: Talk button, orb video, dock animation, card-bottom scroll, mic permission message
- [x] Parent `Link` to `/portfolio/ai-voice-agents`; Talk already `preventDefault` / `stopPropagation`
- [x] Live demo code removed from the shipped app

---

## Phase 1 — Server session proxy

**Goal:** Browser can fetch a signed socket URL without a real API key in client code.

**Files**

- `app/api/demo-session/[...path]/route.ts` — GET forward to `https://apps.sarvam.ai/api/app-runtime/<path>?<query>`, inject `X-API-Key`
- `lib/demo-session.ts` — **server only**: org / workspace / app ids, version `1`, upstream base URL
- `.env.local` (gitignored): `SARVAM_API_KEY`, `VOICE_AGENT_DEMO_LIMIT=2`
- `npm install sarvam-conv-ai-sdk`

**Done when:** A GET to `/api/demo-session/orgs/.../apps/.../url?interaction_type=call&version=1` returns `{ url, reference_id }` locally. Public path and our identifiers stay generic.

---

## Phase 2 — Start / stop on the card

**Goal:** Talk starts a real call; hangup restores the idle card.

**Files:** `components/landing/voice-agent-card.tsx` (and a thin client helper if needed, generic names only).

**Behavior**

1. Talk: dock orb, scroll card bottom (existing), then mic check (existing)
2. Mic denied / missing → message, do **not** start, do **not** count
3. Dynamic `import('sarvam-conv-ai-sdk/browser')`, `ConversationAgent` + `BrowserAudioInterface`, `baseUrl: '/api/demo-session/'`
4. `start()` + `waitForConnect(10)`; fail → undock, short status, no count
5. Talk while live → `stop()` (user hangup)
6. Any hangup (`endCallback` / disconnect): `stop()` in `finally`, orb back to center + full size, scroll so **Talk** is in view
7. Unmount: `stop()`

**Done when:** One call works end-to-end (mic → voice → auto or Talk hangup → idle card). No bubbles, no pulse, no cap yet.

---

## Phase 3 — Chat bubbles

**Goal:** Last 3 turns in the macOS window, no scroll container.

- Overlay above the orb, `pointer-events-none`, agent left / user right
- On connect: agent bubble **“Call starting…”**
- First **bot** transcript **replaces** that bubble’s text (same bubble)
- Keep at most 3 items; oldest drops off
- Top of the stack: CSS `mask-image` fade (not overflow scroll)
- Prefer `transcriptCallback` (`role` + `content`) over streaming text chunks

**Done when:** Greeting replaces “Call starting…”; later turns show as 3 bubbles with a top fade.

---

## Phase 4 — Orb pulse

**Goal:** Orb pulsates while the agent **or** the user is speaking.

- CSS scale animation on a **wrapper** around the video (do not fight dock `translateY` / scale)
- Drive a boolean from `stateCallback` (`speaking`) and user speech start/end — **not** RMS `setState`
- Idle: no extra motion

**Done when:** Pulse is visible on both sides of the conversation and stops when silent.

---

## Phase 5 — Session cap

**Goal:** Soft client limit; successful hangups only.

- `app/page.tsx` reads `VOICE_AGENT_DEMO_LIMIT` (default `2`) → `CaseStudies` → `VoiceAgentCard` as `sessionCap`
- Read/write `dw:demo:sessions`
- Increment only if `waitForConnect` succeeded, then hangup
- Mic fail / connect fail / at-cap click: no increment
- At cap: Talk no-op (no dock)

**Done when:** Two successful calls, then Talk does nothing until `localStorage` is cleared. Changing the env changes the cap after a rebuild/restart.

---

## Phase 6 — Hygiene

- [ ] Client source: no vendor product names in identifiers, comments, or UI copy
- [ ] `stop()` on unmount and every error path
- [ ] Update `.cursor/rules/voice-agent-card.mdc` to match live demo behavior
- [ ] Quick pass: mobile dock scale, Talk vs parent `Link`, no extra landing diffs

**Done when:** Homepage still feels light; demo works on a phone-width viewport.

---

## Progress

| Phase | Status |
|---|---|
| 0 Baseline | done |
| 1 Proxy | not started |
| 2 Start / stop | not started |
| 3 Bubbles | not started |
| 4 Pulse | not started |
| 5 Cap | not started |
| 6 Hygiene | not started |

Ship order is 1 → 2 → 3 → 4 → 5 → 6. Do not start a phase until the previous “Done when” is true.

---

## Out of scope

- Other landing sections, portfolio page
- Server-side quota / auth
- Relaying audio through Next.js
- Wrapping SDK `console.log`
- `agent_variables`
- End button (Talk-while-live is hangup)
