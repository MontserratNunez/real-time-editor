import { supabase } from '../config/supabase.js'

/**
 * Socket.io middleware: validates the Supabase JWT passed in socket.handshake.auth.token.
 * Attaches the decoded user to socket.user on success.
 */
export async function authMiddleware(socket, next) {
  const token = socket.handshake.auth?.token

  if (!token) {
    return next(new Error('AUTH_MISSING: No token provided'))
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return next(new Error('AUTH_INVALID: Token validation failed'))
  }

  socket.user = data.user
  next()
}
