import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Editor from '../components/Editor.jsx'

export default function ProjectRoom() {
  const [activeFile, setActiveFile] = useState(null)
  const [code, setCode] = useState('// Start coding...\n')

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <Navbar projectName="untitled project" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          files={[]}
          activeFileId={activeFile?.id}
          onFileSelect={setActiveFile}
        />
        <main className="flex-1 overflow-hidden">
          <Editor
            language={activeFile?.language || 'javascript'}
            value={code}
            onChange={(val) => setCode(val ?? '')}
          />
        </main>
      </div>
    </div>
  )
}
