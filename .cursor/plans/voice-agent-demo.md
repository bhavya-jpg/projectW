# Homepage voice demo

Status: **Phase 7 complete**  
Scope: homepage card only (`components/landing/voice-agent-card.tsx`). Do not change other landing sections or `/portfolio/[slug]` unless asked.

Lightweight rule: load the voice SDK on Talk click (dynamic import), proxy only the signed-URL GET, pulse with CSS (no per-frame React state).

---

## Locked decisions

| Item | Choice |
|---|---|
| Client vendor names | None. No SDK/vendor strings in UI, storage keys, or public API paths |
| `user_identifier_type` | `'custom'` (runtime enum). Site tag lives in `user_identifier`: `dework-labs-website:<uuid>` |
| `user_identifier` | `dework-labs-website:` + id in `localStorage` key `dw:visitor` (created once on first page visit) |
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
| User hangup | Red phone button under the orb (Phase 3). Hidden until the call is connected |
| Call length | Agent setting in Indus (~1–3 min). No client timer |
| Org / workspace / app | `01a009b0-7836-771b-8c1c-dd0d7e0e54b4` / `01a009b0-783d-72c5-b2ac-97eda2ede40e` / `deWork-Labs-6710e651-9e94` |

### Confirm before Phase 1

- [ ] Committed version **1** exists for this app
- [x] Talk-again-to-hangup is OK (Phase 2); replaced by hangup button in Phase 3

---

## Phase 0 — Baseline (already done)

- [x] Card: Talk button, orb video, dock animation, card-bottom scroll, mic permission message
- [x] Parent `Link` to `/portfolio/ai-voice-agents`; Talk already `preventDefault` / `stopPropagation`
- [x] Live demo code removed from the shipped app

---

## Phase 1 — Server session proxy

**Goal:** Browser can fetch a signed socket URL without a real API key in client code.

**Files**

- [x] `app/api/demo-session/[...path]/route.ts` — GET forward to `https://apps.sarvam.ai/api/app-runtime/<path>?<query>`, inject `X-API-Key`
- [x] `lib/demo-session.ts` — **server only**: org / workspace / app ids, version `1`, upstream base URL
- [x] `.env.local` (gitignored): `SARVAM_API_KEY`, `VOICE_AGENT_DEMO_LIMIT=2`
- [x] `npm install sarvam-conv-ai-sdk`

**Done when:** A GET to `/api/demo-session/orgs/.../apps/.../url?interaction_type=call&version=1` returns `{ url, reference_id }` locally. Public path and our identifiers stay generic.

---

## Phase 2 — Start / stop on the card

**Goal:** Talk starts a real call; hangup restores the idle card.

**Files:** `components/landing/voice-agent-card.tsx` (and a thin client helper if needed, generic names only).

**Behavior**

- [x] Talk: dock orb, scroll card bottom (existing), then mic check (existing)
- [x] Mic denied / missing → message, do **not** start, do **not** count
- [x] Dynamic `import('sarvam-conv-ai-sdk/browser')`, `ConversationAgent` + `BrowserAudioInterface`, `baseUrl: '/api/demo-session/'`
- [x] `start()` + `waitForConnect(10)`; fail → undock, short status, no count
- [x] Talk while live → `stop()` (user hangup)
- [x] Any hangup (`endCallback` / disconnect): `stop()` in `finally`, orb back to center + full size, scroll so **Talk** is in view
- [x] Unmount: `stop()`

**Done when:** One call works end-to-end (mic → voice → auto or Talk hangup → idle card). No bubbles, no pulse, no cap yet.

---

## Phase 3 — Hangup button

**Goal:** A dedicated hangup control under the orb, only while a call is connected.

**Files:** `components/landing/voice-agent-card.tsx`

**Behavior**

- [x] Small round **red phone** button directly below the orb video, inside the macOS stage
- [x] Shown only after `waitForConnect` succeeds (not while docking, mic prompt, or connect-in-progress)
- [x] Hidden again on any hangup (button, agent, or auto)
- [x] Click: same restore path as Phase 2 (`stop()`, orb to center, scroll **Talk** into view)
- [x] `stopPropagation` / `preventDefault` so the parent case-study `Link` does not navigate
- [x] After this phase, Talk while a call is live is a **no-op**; hangup is this button only

**Done when:** Button appears once audio is live, hangs up cleanly, and is gone in the idle card. Still no bubbles, pulse, or cap.

---

## Phase 4 — Chat bubbles

**Goal:** Last 3 turns in the macOS window, no scroll container.

- [x] Overlay above the orb, `pointer-events-none`, agent left / user right
- [x] On connect: agent bubble **“Call starting…”**
- [x] First **bot** transcript **replaces** that bubble’s text (same bubble)
- [x] Keep at most 3 items; oldest drops off
- [x] Top of the stack: CSS `mask-image` fade (not overflow scroll)
- [x] Prefer `transcriptCallback` (`role` + `content`) over streaming text chunks

**Done when:** Greeting replaces “Call starting…”; later turns show as 3 bubbles with a top fade.

---

## Phase 5 — Orb pulse

**Goal:** Orb pulsates while the agent **or** the user is speaking.

- [x] CSS scale animation on a **wrapper** around the video (do not fight dock `translateY` / scale)
- [x] Drive a boolean from `stateCallback` (`speaking`) and user speech start/end — **not** RMS `setState`
- [x] Idle: no extra motion

**Done when:** Pulse is visible on both sides of the conversation and stops when silent.

---

## Phase 6 — Session cap

**Goal:** Soft client limit; successful hangups only.

- [x] `app/page.tsx` reads `VOICE_AGENT_DEMO_LIMIT` (default `2`) → `CaseStudies` → `VoiceAgentCard` as `sessionCap`
- [x] Read/write `dw:demo:sessions`
- [x] Increment only if `waitForConnect` succeeded, then hangup
- [x] Mic fail / connect fail / at-cap click: no increment
- [x] At cap: Talk no-op (no dock)

**Done when:** Two successful calls, then Talk does nothing until `localStorage` is cleared. Changing the env changes the cap after a rebuild/restart.

---

## Phase 7 — Hygiene

- [x] Client source: no vendor product names in identifiers, comments, or UI copy
- [x] `stop()` on unmount and every error path
- [x] Update `.cursor/rules/voice-agent-card.mdc` to match live demo behavior
- [x] Quick pass: mobile dock scale, Talk vs parent `Link`, no extra landing diffs

**Done when:** Homepage still feels light; demo works on a phone-width viewport.

---

## Progress

| Phase | Status |
|---|---|
| 0 Baseline | done |
| 1 Proxy | done (add API key to `.env.local` to verify) |
| 2 Start / stop | done |
| 3 Hangup button | done |
| 4 Bubbles | done |
| 5 Pulse | done |
| 6 Cap | done |
| 7 Hygiene | done |

Ship order is 1 → 2 → 3 → 4 → 5 → 6 → 7. Do not start a phase until the previous “Done when” is true.

---

## Out of scope

- Other landing sections, portfolio page
- Server-side quota / auth
- Relaying audio through Next.js
- Wrapping SDK `console.log`
- `agent_variables`
