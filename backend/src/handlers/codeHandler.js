export function registerCodeHandlers(io, socket) {
  const { roomId } = socket.handshake.query

  if (!roomId) {
    socket.disconnect(true)
    return
  }

  socket.join(roomId)
  console.log(`[Room] ${socket.user.email} joined room: ${roomId}`)

  socket.to(roomId).emit('user:joined', {
    userId: socket.user.id,
    email: socket.user.email,
  })

  socket.on('disconnect', () => {
    socket.to(roomId).emit('user:left', { userId: socket.user.id })
    console.log(`[Room] ${socket.user.email} left room: ${roomId}`)
  })
}
