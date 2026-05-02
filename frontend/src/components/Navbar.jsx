import { useSupabase } from '../hooks/useSupabase.js'

export default function Navbar({ projectName }) {
  const { user, signOut } = useSupabase()

  return (
    <nav className="h-12 flex items-center justify-between px-4 border-b"
      style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
      <div className="flex items-center gap-3">
        <span className="text-indigo-400 font-bold tracking-tight">⌨ realtime</span>
        {projectName && (
          <>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{projectName}</span>
          </>
        )}
      </div>
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</span>
          <button
            onClick={signOut}
            className="text-xs px-3 py-1 rounded border hover:bg-red-900/30 transition-colors"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
            Sign out
          </button>
        </div>
      )}
    </nav>
  )
}
