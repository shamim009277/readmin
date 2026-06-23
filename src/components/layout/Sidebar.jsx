import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Import specific icon modules directly to avoid bundling the entire lucide-react entrypoint
import Zap from 'lucide-react/dist/esm/icons/zap.mjs'
import LayoutDashboard from 'lucide-react/dist/esm/icons/layout-dashboard.mjs'
import Users from 'lucide-react/dist/esm/icons/users.mjs'
import Settings from 'lucide-react/dist/esm/icons/settings.mjs'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.mjs'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down.mjs'
import Award from 'lucide-react/dist/esm/icons/award.mjs'
import Globe from 'lucide-react/dist/esm/icons/globe.mjs'
import Folder from 'lucide-react/dist/esm/icons/folder.mjs'
import FileText from 'lucide-react/dist/esm/icons/file-text.mjs'

// Default menu data (can be overridden via `menuData` prop)
const MENU = [
  { key: 'dashboard', label: 'Dashboard', to: '/', icon: LayoutDashboard },
  {
    key: 'users',
    label: 'Users',
    icon: Users,
    children: [
      { key: 'users-all', label: 'All Users', to: '/users/all' },
      { key: 'users-add', label: 'Add User', to: '/users/add' },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      { key: 'settings-general', label: 'General', to: '/settings/general' },
      { key: 'settings-security', label: 'Security', to: '/settings/security' },
    ],
  },
  {
    key: 'authetication',
    label: 'Authentication',
    icon: Award,
    children: [
      { key: 'login', label: 'Login', to: '#' },
      { key: 'register', label: 'Register', to: '#' },
    ],
  },
  {
    key: 'ui',
    label: 'UI Components',
    icon: Globe,
    children: [
      { key: 'table', label: 'Table', to: '/ui/table' },
      { key: 'advance-table', label: 'Advance Table', to: '/ui/table-advance' },
      { key: 'accordion', label: 'Accordion', to: '/ui/accordion' },
      { key: 'modal', label: 'Modal', to: '/ui/modal' },
    ],
  },
]

export const Sidebar = ({ collapsed, menuData, mobileOpen, setMobileOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  // Open parent menu according to current route (auto-expand matching parent)
  useEffect(() => {
    const path = location.pathname || '/';
    const itemsList = menuData || MENU;

    // find first parent whose child `to` matches the current path prefix
    const matchedParent = itemsList.find((it) => {
      if (!it.children || !it.children.length) return false;
      return it.children.some((c) => typeof c.to === 'string' && c.to !== '#' && path.startsWith(c.to));
    });

    if (matchedParent) {
      setOpenMenu(matchedParent.key);
    } else {
      setOpenMenu(null);
    }
  }, [location.pathname, menuData]);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (mobileOpen && setMobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && mobileOpen && setMobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, setMobileOpen]);

  const isActive = (matchPath) => {
    const path = location.pathname || '/';
    return path === matchPath;
  };

  const isParentActive = (prefix) => {
    const path = location.pathname || '/';
    return path.startsWith(prefix);
  };

  const items = menuData || MENU;

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      <div className={`transition-transform transform duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col z-50 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${collapsed ? 'md:w-20' : 'md:w-60'} w-60 h-screen fixed md:relative left-0 top-0`}>
      {/*--- logo ---*/}
      <div className="px-4 py-2 border-b border-slate-200/50 dark:border-slate-700/50">
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
          {items.map((item) => {
            const Icon = item.icon;
            if (item.children && item.children.length) {
              // derive a safe parent prefix from children `to` values that start with '/'
              const parentPrefix = (() => {
                const childWithPath = item.children.find((c) => c.to && typeof c.to === 'string' && c.to.startsWith('/'));
                if (!childWithPath) return null;
                const parts = childWithPath.to.split('/').filter(Boolean);
                return parts.length ? `/${parts[0]}` : null;
              })();
              return (
                <li key={item.key}>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${parentPrefix && isParentActive(parentPrefix) ? 'bg-slate-100 dark:bg-slate-800 text-blue-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className="w-5 h-5" />}
                      <span className={`${collapsed ? 'hidden' : ''}`}>{item.label}</span>
                    </div>

                    {!collapsed && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${openMenu === item.key ? 'rotate-90' : ''}`}
                      />
                    )}
                  </button>

                  {openMenu === item.key && (
                    <ul className={`ml-6 mt-2 pl-3 border-l border-slate-200 dark:border-slate-700 space-y-1 ${collapsed ? 'hidden' : ''}`}>
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <Link
                            to={child.to}
                            className={`group flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition ${isActive(child.to) ? 'bg-slate-100 dark:bg-slate-800 text-blue-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600'}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              <span className={`${collapsed ? 'hidden' : ''}`}>{child.label}</span>
                            </div>

                            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            }

            // simple link
            return (
              <li key={item.key}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive(item.to) ? 'bg-slate-100 dark:bg-slate-800 text-blue-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600'}`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className={`${collapsed ? 'hidden' : ''}`}>{item.label}</span>
                </Link>
              </li>
            )
          })}
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
    </>
  )
}

export default Sidebar