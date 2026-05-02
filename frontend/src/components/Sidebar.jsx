export default function Sidebar({ files = [], activeFileId, onFileSelect }) {
  return (
    <aside className="w-52 flex-shrink-0 border-r flex flex-col"
      style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--text-muted)' }}>
        Files
      </div>
      <ul className="flex-1 overflow-y-auto">
        {files.length === 0 && (
          <li className="px-3 py-2 text-xs italic" style={{ color: 'var(--text-muted)' }}>
            No files yet
          </li>
        )}
        {files.map((file) => (
          <li key={file.id}>
            <button
              onClick={() => onFileSelect(file)}
              className={`w-full text-left px-3 py-1.5 text-sm truncate hover:bg-white/5 transition-colors ${
                activeFileId === file.id ? 'bg-indigo-500/20 text-indigo-300' : ''
              }`}
              style={{ color: activeFileId === file.id ? undefined : 'var(--text-primary)' }}>
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
