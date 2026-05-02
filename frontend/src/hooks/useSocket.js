import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

export function useSocket(roomId, token) {
  const socketRef = useRef(null)

  useEffect(() => {
    if (!roomId || !token) return

    socketRef.current = io(BACKEND_URL, {
      auth: { token },
      query: { roomId },
    })

    socketRef.current.on('connect', () => {
      console.log('[Socket] Connected:', socketRef.current.id)
    })

    socketRef.current.on('connect_error', (err) => {
      console.error('[Socket] Connection error:', err.message)
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [roomId, token])

  return socketRef
}
