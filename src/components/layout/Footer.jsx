import React from 'react'

const Footer = () => {
  return (
    <footer className="flex h-14 min-h-[56px] items-center justify-between gap-3 border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur sm:flex-row">
      <p>© 2026 Nexus Admin Panel. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="transition hover:text-blue-600">Privacy</a>
        <a href="#" className="transition hover:text-blue-600">Terms</a>
        <a href="#" className="transition hover:text-blue-600">Support</a>
      </div>
    </footer>
  )
}

export default Footer
