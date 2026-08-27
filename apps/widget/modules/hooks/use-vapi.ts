import React, { useState, useEffect } from "react"
import Vapi from "@vapi-ai/web"

interface TranscriptMessage {
  role: "user" | "assistant"
  text: string
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])

  useEffect(() => {
    // Only for testing the Vapi API, otherwise customers will provide their own API keys
    const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!)
    setVapi(vapiInstance)

    //Event listeners
    // when call is started
    vapiInstance.on("call-start", () => {
      setIsConnected(true)
      setIsConnecting(false)
      setTranscript([])
    })

    //when call ends
    vapiInstance.on("call-end", () => {
      setIsConnected(false)
      setIsConnecting(false)
      setIsSpeaking(false)
      setTranscript([])
    })

    // Real-time conversation events
    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true)
    })

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false)
    })

    // Error handling
    vapiInstance.on("error", (error) => {
      console.log("Voice widget error:", error)
      setIsConnecting(false)
    })

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ])
      }
    })

    return () => {
      vapiInstance?.stop()
    }
  }, [])

  const startCall = () => {
    setIsConnecting(true)

    if (vapi) {
      // Only for testing the Vapi API, otherwise customers will provide their own Assistant IDs
      vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!)
    }
  }

  const endCall = () => {
    if (vapi) {
      vapi.stop()
    }
  }

  return {
    isSpeaking,
    isConnecting,
    isConnected,
    transcript,
    startCall,
    endCall,
  }
}
