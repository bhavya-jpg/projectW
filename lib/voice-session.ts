import {
  DEMO_APP_ID,
  DEMO_APP_VERSION,
  DEMO_ORG_ID,
  DEMO_WORKSPACE_ID,
} from './demo-session-ids'
import { getVisitorId } from './visitor-id'

export type VoiceSession = {
  connect: () => Promise<boolean>
  stop: () => Promise<void>
}

export type SessionLine = {
  from: 'agent' | 'user'
  text: string
}

function ignoreRuntimeSocketNoise() {
  const orig = console.error.bind(console)
  console.error = (...args: unknown[]) => {
    const [first, second] = args
    if (first === 'WebSocket error:' && second instanceof Event) {
      return
    }
    orig(...args)
  }

  const onReject = (event: PromiseRejectionEvent) => {
    const message = event.reason instanceof Error ? event.reason.message : String(event.reason ?? '')
    if (message.includes('WebSocket connection error')) {
      event.preventDefault()
    }
  }
  window.addEventListener('unhandledrejection', onReject)

  return () => {
    console.error = orig
    window.removeEventListener('unhandledrejection', onReject)
  }
}

export async function openVoiceSession(options: {
  onEnded: () => void
  onLine?: (line: SessionLine) => void
  onPulse?: (active: boolean) => void
}): Promise<VoiceSession> {
  const restore = ignoreRuntimeSocketNoise()
  try {
    const { BrowserAudioInterface, ConversationAgent, InteractionType } = await import(
      'sarvam-conv-ai-sdk/browser'
    )

    let userActive = false
    let agentActive = false
    const pushPulse = () => options.onPulse?.(userActive || agentActive)

    const agent = new ConversationAgent({
      apiKey: '_',
      platform: 'browser',
      baseUrl: '/api/demo-session/',
      audioInterface: new BrowserAudioInterface(),
      config: {
        user_identifier_type: 'custom',
        user_identifier: `dework-labs-website:${getVisitorId()}`,
        org_id: DEMO_ORG_ID,
        workspace_id: DEMO_WORKSPACE_ID,
        app_id: DEMO_APP_ID,
        version: DEMO_APP_VERSION,
        interaction_type: InteractionType.CALL,
        input_sample_rate: 16000,
        output_sample_rate: 16000,
      },
      endCallback: async () => {
        userActive = false
        agentActive = false
        pushPulse()
        options.onEnded()
      },
      stateCallback: (next) => {
        agentActive = next === 'speaking'
        pushPulse()
      },
      eventCallback: async (event) => {
        if (event.type === 'server.event.user_speech_start') {
          userActive = true
          pushPulse()
        } else if (
          event.type === 'server.event.user_speech_end' ||
          event.type === 'server.event.user_interrupt'
        ) {
          userActive = false
          pushPulse()
        }
      },
      transcriptCallback: async (msg) => {
        const text = typeof msg.content === 'string' ? msg.content.trim() : ''
        if (!text) return
        options.onLine?.({
          from: msg.role === 'user' ? 'user' : 'agent',
          text,
        })
      },
    })

    const stop = async () => {
      try {
        await agent.stop()
      } finally {
        restore()
      }
    }

    return {
      connect: async () => {
        try {
          await agent.start()
          const connected = await agent.waitForConnect(10)
          if (!connected) await agent.stop().catch(() => {})
          return connected
        } catch {
          await agent.stop().catch(() => {})
          return false
        }
      },
      stop,
    }
  } catch (error) {
    restore()
    throw error
  }
}
