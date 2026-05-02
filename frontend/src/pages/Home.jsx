import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '../hooks/useSupabase.js'

export default function Home() {
  const { user, signIn, signUp } = useSupabase()
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  if (user) navigate('/project/new')

  const handleSubmit = async () => {
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      if (mode === 'signup') {
        await signUp(email, password)
        setMessage('Check your email to confirm your account.')
      } else {
        await signIn(email, password)
        navigate('/project/new')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-1 tracking-tight text-indigo-400">⌨ realtime</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Collaborative text editing, without the friction.
        </p>

        <div className="rounded-lg border p-6 space-y-4"
          style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
          <div className="flex gap-2 text-sm">
            {['signin', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded transition-colors ${
                  mode === m
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'text-gray-500 hover:text-gray-300'
                }`}>
                {m === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-3 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
          {message && <p className="text-xs text-green-400">{message}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            className="w-full py-2 rounded text-sm font-medium bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white">
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </div>
      </div>
    </div>
  )
}
