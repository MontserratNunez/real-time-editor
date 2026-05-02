import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import projectsRouter from './routes/projects.js'
import { authMiddleware } from './middleware/auth.js'
import { registerCodeHandlers } from './handlers/codeHandler.js'

const PORT = process.env.PORT || 4000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

const app = express()
const httpServer = createServer(app)

app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(express.json())

app.use('/api/projects', projectsRouter)
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

const io = new Server(httpServer, {
  cors: { origin: FRONTEND_URL, methods: ['GET', 'POST'] },
})

io.use(authMiddleware)

io.on('connection', (socket) => {
  console.log(`[Socket] Connected: ${socket.id} (${socket.user.email})`)
  registerCodeHandlers(io, socket)
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
