import React, { useState } from 'react'
// Inline SVG icons to avoid lucide-react dependency issues
const Zap = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
)
import { Link } from 'react-router-dom'

const LayoutDashboard = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13h8V3H3v10zM21 21V11h-8v10h8zM3 21h8v-6H3v6z"/></svg>
)
const Users = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)
const Settings = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z"/></svg>
)
const ChevronDown = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6"/></svg>
)
const ChevronRight = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
)
const Folder = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v12a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H12l-2-2H5a2 2 0 00-2 2z"/></svg>
)
const FileText = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8"/></svg>
)

export const Sidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`transition duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10 ${collapsed ? 'w-20' : 'w-60'} h-screen`}>
      {/*--- logo ---*/}
      <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>

          {/*--- conditional rendering ---*/}
          <div className={`${collapsed ? 'hidden' : ''}`}>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Nexus</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/*--- Navigation ---*/}
      {/* <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            <ul className="space-y-2">
                <li>
                    <a href="#" className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200">
                        <span className="w-5 h-5 bg-blue-600 rounded-full"></span>
                        <span>Dashboard</span>
                    </a>
                </li>
            </ul>
        </nav> */}

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

        <ul className="space-y-2">

          {/* DASHBOARD */}
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 
      hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className={`${collapsed ? 'hidden' : ''}`}>Dashboard</span>
            </Link>
          </li>

          {/* USERS */}
          <li>
            <button
              onClick={() => toggleMenu("users")}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg 
      text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span className={`${collapsed ? 'hidden' : ''}`}>Users</span>
              </div>

              {!collapsed && (
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${openMenu === "users" ? "rotate-90" : ""
                    }`}
                />
              )}
            </button>

            {openMenu === "users" && (
              <ul className={`ml-6 mt-2 pl-3 border-l border-slate-200 dark:border-slate-700 space-y-1 ${collapsed ? 'hidden' : ''}`}>

                <li>
                  <Link
                    to="/users/all"
                    className="group flex items-center justify-between px-2 py-1.5 rounded-md 
            text-sm text-slate-600 dark:text-slate-400 
            hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span className={`${collapsed ? 'hidden' : ''}`}>All Users</span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/users/add"
                    className="group flex items-center justify-between px-2 py-1.5 rounded-md 
            text-sm text-slate-600 dark:text-slate-400 
            hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span className={`${collapsed ? 'hidden' : ''}`}>Add User</span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>

              </ul>
            )}
          </li>

          {/* SETTINGS */}
          <li>
            <button
              onClick={() => toggleMenu("settings")}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg 
      text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span className={`${collapsed ? 'hidden' : ''}`}>Settings</span>
              </div>

              {!collapsed && (
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${openMenu === "settings" ? "rotate-90" : ""
                    }`}
                />
              )}
            </button>

            {openMenu === "settings" && (
              <ul className={`ml-6 mt-2 pl-3 border-l border-slate-200 dark:border-slate-700 space-y-1 ${collapsed ? 'hidden' : ''}`}>

                <li>
                  <Link
                    to="/settings/general"
                    className="group flex items-center justify-between px-2 py-1.5 rounded-md 
            text-sm text-slate-600 dark:text-slate-400 
            hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      <span className={`${collapsed ? 'hidden' : ''}`}>General</span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/settings/security"
                    className="group flex items-center justify-between px-2 py-1.5 rounded-md 
            text-sm text-slate-600 dark:text-slate-400 
            hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      <span className={`${collapsed ? 'hidden' : ''}`}>Security</span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>

              </ul>
            )}
          </li>

        </ul>
      </nav>

      {/*--- User Profile ---*/}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 cursor-pointer">
          <img src="https://i.pravatar.cc/300" alt="User Avatar" className="w-10 h-10 rounded-full ring-2 ring-blue-500" />

          <div className="flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar