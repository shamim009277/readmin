import React, { useMemo, useState } from "react";
import Users from 'lucide-react/dist/esm/icons/users.mjs'
import Plus from 'lucide-react/dist/esm/icons/plus.mjs'
import Search from 'lucide-react/dist/esm/icons/search.mjs'
import Pencil from 'lucide-react/dist/esm/icons/pencil.mjs'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2.mjs'
import Eye from 'lucide-react/dist/esm/icons/eye.mjs'
import Download from 'lucide-react/dist/esm/icons/download.mjs'
import Filter from 'lucide-react/dist/esm/icons/filter.mjs'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.mjs'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left.mjs'
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up.mjs'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down.mjs'
import MoreVertical from 'lucide-react/dist/esm/icons/ellipsis-vertical.mjs'
import Settings from 'lucide-react/dist/esm/icons/settings.mjs'

const usersData = [
   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Active" },
  { id: 3, name: "Michael Johnson", email: "michael@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "User", status: "Active" },
  { id: 5, name: "David Brown", email: "david@example.com", role: "User", status: "Active" },
  { id: 6, name: "Emily Davis", email: "emily@example.com", role: "Manager", status: "Active" },
  { id: 7, name: "Robert Miller", email: "robert@example.com", role: "User", status: "Inactive" },
  { id: 8, name: "Jessica Moore", email: "jessica@example.com", role: "Editor", status: "Active" },
  { id: 9, name: "Daniel Taylor", email: "daniel@example.com", role: "User", status: "Active" },
  { id: 10, name: "Sophia Anderson", email: "sophia@example.com", role: "Admin", status: "Active" },
  { id: 11, name: "William Thomas", email: "william@example.com", role: "User", status: "Inactive" },
  { id: 12, name: "Olivia Jackson", email: "olivia@example.com", role: "Manager", status: "Active" },
  { id: 13, name: "James White", email: "james@example.com", role: "Editor", status: "Active" },
  { id: 14, name: "Ava Harris", email: "ava@example.com", role: "User", status: "Inactive" },
  { id: 15, name: "Benjamin Martin", email: "benjamin@example.com", role: "User", status: "Active" },
  { id: 16, name: "Mia Thompson", email: "mia@example.com", role: "Admin", status: "Active" },
  { id: 17, name: "Lucas Garcia", email: "lucas@example.com", role: "Manager", status: "Active" },
  { id: 18, name: "Charlotte Martinez", email: "charlotte@example.com", role: "User", status: "Inactive" },
  { id: 19, name: "Henry Robinson", email: "henry@example.com", role: "Editor", status: "Active" },
  { id: 20, name: "Amelia Clark", email: "amelia@example.com", role: "User", status: "Active" },
  { id: 21, name: "Alexander Rodriguez", email: "alex@example.com", role: "Admin", status: "Active" },
  { id: 22, name: "Evelyn Lewis", email: "evelyn@example.com", role: "Manager", status: "Inactive" },
  { id: 23, name: "Michael Lee", email: "mikelee@example.com", role: "User", status: "Active" },
  { id: 24, name: "Harper Walker", email: "harper@example.com", role: "Editor", status: "Active" },
  { id: 25, name: "Ethan Hall", email: "ethan@example.com", role: "User", status: "Inactive" },
  { id: 26, name: "Abigail Allen", email: "abigail@example.com", role: "Admin", status: "Active" },
  { id: 27, name: "Jacob Young", email: "jacob@example.com", role: "Manager", status: "Active" },
  { id: 28, name: "Ella Hernandez", email: "ella@example.com", role: "User", status: "Active" },
  { id: 29, name: "Logan King", email: "logan@example.com", role: "Editor", status: "Inactive" },
  { id: 30, name: "Grace Wright", email: "grace@example.com", role: "User", status: "Active" },
  { id: 31, name: "Sebastian Lopez", email: "sebastian@example.com", role: "Admin", status: "Active" },
  { id: 32, name: "Chloe Hill", email: "chloe@example.com", role: "Manager", status: "Inactive" },
  { id: 33, name: "Jack Scott", email: "jack@example.com", role: "User", status: "Active" },
  { id: 34, name: "Victoria Green", email: "victoria@example.com", role: "Editor", status: "Active" },
  { id: 35, name: "Owen Adams", email: "owen@example.com", role: "User", status: "Inactive" },
  { id: 36, name: "Lily Baker", email: "lily@example.com", role: "Admin", status: "Active" },
  { id: 37, name: "Samuel Nelson", email: "samuel@example.com", role: "Manager", status: "Active" },
  { id: 38, name: "Zoey Carter", email: "zoey@example.com", role: "User", status: "Active" },
  { id: 39, name: "Matthew Mitchell", email: "matthew@example.com", role: "Editor", status: "Inactive" },
  { id: 40, name: "Nora Perez", email: "nora@example.com", role: "User", status: "Active" },
  { id: 41, name: "Joseph Roberts", email: "joseph@example.com", role: "Admin", status: "Active" },
  { id: 42, name: "Hannah Turner", email: "hannah@example.com", role: "Manager", status: "Inactive" },
  { id: 43, name: "Andrew Phillips", email: "andrew@example.com", role: "User", status: "Active" },
  { id: 44, name: "Aria Campbell", email: "aria@example.com", role: "Editor", status: "Active" },
  { id: 45, name: "Christopher Parker", email: "chris@example.com", role: "User", status: "Inactive" },
  { id: 46, name: "Scarlett Evans", email: "scarlett@example.com", role: "Admin", status: "Active" },
  { id: 47, name: "Joshua Edwards", email: "joshua@example.com", role: "Manager", status: "Active" },
  { id: 48, name: "Layla Collins", email: "layla@example.com", role: "User", status: "Active" },
  { id: 49, name: "Ryan Stewart", email: "ryan@example.com", role: "Editor", status: "Inactive" },
  { id: 50, name: "Penelope Sanchez", email: "penelope@example.com", role: "User", status: "Active" },
];

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredUsers = useMemo(() => {
    let data = [...usersData];

    data = data.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()) ||
        user.status.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal < bVal) {
        return sortDirection === "asc" ? -1 : 1;
      }

      if (aVal > bVal) {
        return sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });

    return data;
  }, [search, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;

    return sortDirection === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
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

      {/* Card */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {/* Top */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Users
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Users size={18} />
                Users List
              </h2>

              <p className="text-xs text-slate-500">
                Manage all registered users
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search..."
                className="h-9 rounded-md border border-slate-300 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-9 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value={10}>10 Rows</option>
              <option value={25}>25 Rows</option>
              <option value={50}>50 Rows</option>
              <option value={100}>100 Rows</option>
            </select>

            <button className="inline-flex h-9 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">
              <Plus size={16} />
              Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "id",
                  "name",
                  "email",
                  "role",
                  "status",
                ].map((field) => (
                  <th
                    key={field}
                    onClick={() =>
                      handleSort(field)
                    }
                    className="cursor-pointer border-b border-slate-200 px-3 py-2 text-left font-semibold capitalize text-slate-600"
                  >
                    <div className="flex items-center gap-1">
                      {field}
                      <SortIcon field={field} />
                    </div>
                  </th>
                ))}

                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-3 py-2">
                    #{user.id}
                  </td>

                  <td className="px-3 py-2 font-medium">
                    {user.name}
                  </td>

                  <td className="px-3 py-2">
                    {user.email}
                  </td>

                  <td className="px-3 py-2">
                    {user.role}
                  </td>

                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <div className="flex justify-center gap-1">
                      <button className="flex h-7 w-7 items-center justify-center rounded border border-slate-300">
                        <Pencil size={14} />
                      </button>

                      <button className="flex h-7 w-7 items-center justify-center rounded border border-red-200 text-red-600">
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
            Showing {(currentPage - 1) * pageSize + 1}
            -
            {Math.min(
              currentPage * pageSize,
              filteredUsers.length
            )}{" "}
            of {filteredUsers.length} entries
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => p - 1)
              }
              className="rounded border border-slate-300 px-3 py-1 text-xs disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-xs">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((p) => p + 1)
              }
              className="rounded border border-slate-300 px-3 py-1 text-xs disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}