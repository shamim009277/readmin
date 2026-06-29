import React, { useState } from 'react'
// Inline SVG icons to avoid lucide-react dependency issues
const Plus = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
)
const Bell = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/></svg>
)
const Sun = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.414 1.414M17.657 17.657l1.414 1.414M2 12h2M20 12h2M4.93 19.07l1.414-1.414M17.657 6.343l1.414-1.414"/></svg>
)
const Moon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
)
const ChevronDown = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6"/></svg>
)
const User = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)
const Settings = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.27 17.9l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82L4.3 6.27a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H11a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09c.12.6.47 1.14 1 1.51.53.37 1.09.55 1.82.33l.06-.06A2 2 0 0119.73 6.3l-.06.06a1.65 1.65 0 00-.33 1.82V11c.06.6.4 1.15 1 1.51.64.36 1.14.88 1.51 1.51.37.63.55 1.09.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33z"/></svg>
)
const LogOut = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
)
const Menu = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
)
const Search = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
)
const Filter = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 6H2"/><path d="M6 6v12"/><path d="M18 6v12"/></svg>
)

export const Header = ({ setCollapsed, collapsed, onToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationCount = 12;

  return (
    <div className="h-20 min-h-[80px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-4 py-4 flex items-center">
      <div className="flex items-center justify-between w-full">
        {/*--- Left Section ---*/}
        <div className="flex items-center space-x-4">
          <button onClick={() => (onToggle ? onToggle() : setCollapsed && setCollapsed(c => !c))} className="p-2 rounded-md  hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors duration-200" aria-label="Toggle sidebar">
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Dashboard</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, John!</p>
          </div>
        </div>

        {/*--- Center Section ---*/}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-100 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors duration-200">
              <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/*--- Right Section ---*/}
        <div className="flex items-center gap-3">
          {/* Quick Action Button */}
          <button className="hidden bg-gradient-to-r from-blue-600 to-purple-600 md:flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-700 text-white text-sm font-medium transition-all duration-200 shadow-sm">
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>

          {/* Theme Toggle */}
          <button
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            aria-label="Toggle Theme"
          >
            <Sun className="w-5 h-5 dark:hidden" />
            <Moon className="hidden w-5 h-5 dark:block" />
          </button>

          {/* Notifications */}
          <div className="relative" onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}>
            <button className=" relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition" aria-haspopup="true" aria-expanded={showNotifications}>
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className=" absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-semibold leading-none ring-2 ring-white dark:ring-slate-900 ">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className=" absolute right-0 top-full mt-5 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    Notifications
                  </h3>

                  <button className="text-xs text-slate-500 dark:text-slate-400 hover:underline">
                    Mark all read
                  </button>
                </div>

                {/* Notification List */}
                <div className="p-4 space-y-3">
                  {/* Item 1 */}
                  <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition">
                    {/* Icon */}
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          New User Registered
                        </p>

                        {/* Unread dot */}
                        <span className="w-2 h-2 mt-1 bg-blue-500 rounded-full"></span>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        A new user has created an account successfully
                      </p>

                      <span className="text-[11px] text-slate-400 mt-1 block">
                        10 minutes ago
                      </span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <Settings className="w-4 h-4 text-green-600 dark:text-green-300" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          Monthly Report Generated
                        </p>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        System successfully generated monthly analytics report
                      </p>

                      <span className="text-[11px] text-slate-400 mt-1 block">
                        1 hour ago
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                  <button className="w-full text-sm text-slate-500 dark:text-slate-400">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <img
                src="https://i.pravatar.cc/300"
                alt="User"
                className="w-9 h-9 rounded-full ring-2 ring-blue-500 object-cover"
              />

              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  John Doe
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Administrator
                </p>
              </div>

              <ChevronDown className="hidden lg:block w-4 h-4 text-slate-500" />
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-4 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

              <div className="p-2">

                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </a>

                <hr className="my-2 border-slate-200 dark:border-slate-700" />

                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header