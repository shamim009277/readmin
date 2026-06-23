import React from "react";
import Users from 'lucide-react/dist/esm/icons/users.mjs'
import Plus from 'lucide-react/dist/esm/icons/plus.mjs'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.mjs'
import Search from 'lucide-react/dist/esm/icons/search.mjs'
import Pencil from 'lucide-react/dist/esm/icons/pencil.mjs'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2.mjs'

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "User",
    status: "Active",
  },
];

export default function UsersTable() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            User Management
          </h1>
        </div>

        <div className="flex items-center text-sm text-slate-500">
          <span>Dashboard</span>

          <ChevronRight size={16} className="mx-1" />

          <span>User Management</span>

          <ChevronRight size={16} className="mx-1" />

          <span className="font-medium text-slate-700">
            Users List
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Users size={20} className="text-blue-600" />
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <Users size={18} />
                Users List
              </h2>

              <p className="text-xs text-slate-500">
                Manage all registered users
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search users..."
                className="h-9 w-full rounded-md border border-slate-300 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-64"
              />
            </div>

            {/* Add Button */}
            <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700">
              <Plus size={16} />
              Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-1.5 text-left font-semibold text-slate-600">
                  ID
                </th>

                <th className="px-3 py-1.5 text-left font-semibold text-slate-600">
                  Name
                </th>

                <th className="px-3 py-1.5 text-left font-semibold text-slate-600">
                  Email
                </th>

                <th className="px-3 py-1.5 text-left font-semibold text-slate-600">
                  Role
                </th>

                <th className="px-3 py-1.5 text-left font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-3 py-1.5 text-center font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-3 py-1.5 text-slate-700">
                    #{user.id}
                  </td>

                  <td className="px-3 py-1.5 font-medium text-slate-700">
                    {user.name}
                  </td>

                  <td className="px-3 py-1.5 text-slate-600">
                    {user.email}
                  </td>

                  <td className="px-3 py-1.5 text-slate-600">
                    {user.role}
                  </td>

                  <td className="px-3 py-1.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-3 py-1.5">
                    <div className="flex items-center justify-center gap-1">
                      <button className="inline-flex h-7 w-7 items-center justify-center rounded border border-slate-300 text-slate-600 transition hover:bg-slate-100">
                        <Pencil size={14} />
                      </button>

                      <button className="inline-flex h-7 w-7 items-center justify-center rounded border border-red-200 text-red-600 transition hover:bg-red-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">
            Showing 1 to {users.length} of {users.length} entries
          </p>

          <div className="flex items-center gap-1">
            <button className="rounded border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50">
              Previous
            </button>

            <button className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white">
              1
            </button>

            <button className="rounded border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}