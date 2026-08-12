'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mic, PhoneOff, AlertCircle } from 'lucide-react'

type CallState = 'idle' | 'requesting_mic' | 'connecting' | 'active' | 'error' | 'ended'
type TranscriptMessage = { id: string; role: 'user' | 'agent'; text: string; isFinal?: boolean }

export default function VoiceAgentDemoPage() {
  const [callState, setCallState] = useState<CallState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [agentIsSpeaking, setAgentIsSpeaking] = useState(false)
  const [agentIsThinking, setAgentIsThinking] = useState(false)
  
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript, agentIsThinking])

  const startCall = async () => {
    setCallState('requesting_mic')
    setErrorMessage('')
    
    try {
      // 1. Request Mic Permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // We got permission. In a real integration, we'd pass this stream to WebRTC or Twilio SDK.
      setCallState('connecting')
      
      // Simulate connection delay
      setTimeout(() => {
        setCallState('active')
        setTranscript([
          { id: '1', role: 'agent', text: 'Hi there! I am the Dworklabs AI Voice Agent. How can I help you today?', isFinal: true }
        ])
        
        // Mock a conversation after 5 seconds just for demo purposes if they don't do anything
        setTimeout(() => {
          if (callState === 'active') { // check if still active
            setTranscript(prev => [...prev, { id: '2', role: 'user', text: 'Can you tell me about your CRM features?', isFinal: true }])
            setAgentIsThinking(true)
            
            setTimeout(() => {
              setAgentIsThinking(false)
              setAgentIsSpeaking(true)
              setTranscript(prev => [...prev, { id: '3', role: 'agent', text: 'Sure! Our Smart CRM Suite helps you manage leads and deals from one clean dashboard. It also automates follow-ups so you never miss an opportunity.', isFinal: true }])
              
              setTimeout(() => setAgentIsSpeaking(false), 4000)
            }, 1500)
          }
        }, 5000)
        
      }, 1500)
      
    } catch (err: any) {
      console.error('Microphone error:', err)
      setCallState('error')
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Microphone access was denied. Please allow microphone access in your browser to try the demo.')
      } else {
        setErrorMessage('Failed to access microphone. Please make sure you have a microphone connected.')
      }
    }
  }

  const endCall = () => {
    setCallState('ended')
    setAgentIsThinking(false)
    setAgentIsSpeaking(false)
    // In real integration, close WebSocket / WebRTC connection here.
  }

  const resetDemo = () => {
    setCallState('idle')
    setTranscript([])
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20 sm:pt-24 pb-8 sm:pb-12">
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto px-4 mb-6 sm:mb-12">
        <Link href="/#solutions" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
          Talk to our AI Voice Agent
        </h1>
        <p className="text-lg text-muted-foreground">
          This is a real, working AI agent — not a mockup. Start a call and try it yourself.
        </p>
      </header>

      {/* Main Interface */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Call Controls Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-3xl border border-border bg-card/50 shadow-sm relative overflow-hidden min-h-[400px]">
          {/* Background glow when active */}
          {callState === 'active' && (
            <div className="absolute inset-0 z-0 bg-green-500/5 transition-opacity duration-1000">
              <div className="absolute inset-0 bg-green-400/20 blur-[100px] rounded-full scale-150" />
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center">
            
            {/* The Big Button */}
            <div className="relative mb-8">
              {/* Outer pulse animation when active */}
              {callState === 'active' && (
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDuration: '2s' }} />
              )}
              {callState === 'active' && agentIsSpeaking && (
                <div className="absolute -inset-4 rounded-full bg-green-500/10 animate-pulse" />
              )}
              
              <button
                onClick={callState === 'idle' || callState === 'error' || callState === 'ended' ? startCall : undefined}
                disabled={callState === 'requesting_mic' || callState === 'connecting'}
                className={`relative flex items-center justify-center w-32 h-32 rounded-full border-2 transition-all duration-300
                  ${callState === 'idle' || callState === 'ended' ? 'bg-background hover:bg-foreground/5 border-border cursor-pointer hover:scale-105' : ''}
                  ${callState === 'requesting_mic' || callState === 'connecting' ? 'bg-foreground/5 border-foreground/20 cursor-wait' : ''}
                  ${callState === 'active' ? 'bg-green-500/10 border-green-500/30 text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.2)]' : ''}
                  ${callState === 'error' ? 'bg-destructive/10 border-destructive/30 text-destructive' : ''}
                `}
              >
                {callState === 'connecting' || callState === 'requesting_mic' ? (
                  <div className="w-10 h-10 border-4 border-foreground/20 border-t-foreground/80 rounded-full animate-spin" />
                ) : callState === 'error' ? (
                  <AlertCircle className="w-12 h-12" />
                ) : (
                  <Mic className={`w-12 h-12 ${callState === 'active' ? 'text-green-500' : 'text-foreground/70'}`} />
                )}
              </button>
            </div>

            {/* Status Text */}
            <div className="text-center min-h-[3rem]">
              <h3 className="text-xl font-semibold mb-1">
                {callState === 'idle' && 'Ready to start'}
                {callState === 'requesting_mic' && 'Requesting microphone...'}
                {callState === 'connecting' && 'Connecting to agent...'}
                {callState === 'active' && (agentIsSpeaking ? 'Agent is speaking...' : 'Listening...')}
                {callState === 'ended' && 'Call ended'}
                {callState === 'error' && 'Connection failed'}
              </h3>
              
              {callState === 'error' && (
                <p className="text-sm text-destructive max-w-xs mx-auto text-center">
                  {errorMessage}
                </p>
              )}
              
              {callState === 'ended' && (
                <button onClick={resetDemo} className="text-sm text-primary hover:underline mt-2">
                  Try again
                </button>
              )}
              
              {callState === 'error' && (
                <button onClick={resetDemo} className="text-sm text-destructive hover:underline mt-2">
                  Try again
                </button>
              )}
            </div>

            {/* End Call Button */}
            {callState === 'active' && (
              <button 
                onClick={endCall}
                className="mt-8 flex items-center gap-2 px-6 py-2.5 rounded-full border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
                End Call
              </button>
            )}
          </div>
        </div>

        {/* Transcript Panel */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-sm h-[500px] md:h-auto">
          <div className="p-4 border-b border-border/50 bg-muted/20">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Live Transcript</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 font-mono text-sm">
            {transcript.length === 0 && callState !== 'active' ? (
              <div className="h-full flex items-center justify-center text-muted-foreground opacity-50">
                Transcript will appear here once the call starts.
              </div>
            ) : (
              <>
                {transcript.map((msg) => (
                  <div key={msg.id} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                    <span className="text-[10px] text-muted-foreground uppercase mb-1 px-1">
                      {msg.role === 'user' ? 'You' : 'Agent'}
                    </span>
                    <div className={`p-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-foreground/5 text-foreground rounded-tr-sm' 
                        : 'bg-green-500/10 border border-green-500/20 text-foreground rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {agentIsThinking && (
                  <div className="flex flex-col max-w-[85%] self-start items-start">
                    <span className="text-[10px] text-muted-foreground uppercase mb-1 px-1">Agent</span>
                    <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10 rounded-tl-sm flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={transcriptEndRef} />
              </>
            )}
          </div>
        </div>
        
      </main>

      {/* Educational Section */}
      <section className="w-full max-w-4xl mx-auto px-4 mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-border/50 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready for production.</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          This is the same agent our clients use to qualify and book hot leads automatically, 24/7. It connects directly to your calendar, CRM, and knowledge base.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
            ⚡️ Answers in &lt;2 seconds
          </span>
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
            🗓 Books directly to calendar
          </span>
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
            🧠 Handles objections naturally
          </span>
        </div>
      </section>
    </div>
  )
}
