import React, { useMemo, useState, useEffect } from "react";
import Users from "lucide-react/dist/esm/icons/users.mjs";
import Plus from "lucide-react/dist/esm/icons/plus.mjs";
import Search from "lucide-react/dist/esm/icons/search.mjs";
import Pencil from "lucide-react/dist/esm/icons/pencil.mjs";
import Trash2 from "lucide-react/dist/esm/icons/trash-2.mjs";
import Download from "lucide-react/dist/esm/icons/download.mjs";
import ChevronUp from "lucide-react/dist/esm/icons/chevron-up.mjs";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.mjs";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const usersData = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  role: ["Admin", "Manager", "User", "Editor"][i % 4],
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

const initialColumns = [
  { key: "id", label: "ID", visible: true },
  { key: "name", label: "Name", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "role", label: "Role", visible: true },
  { key: "status", label: "Status", visible: true },
];

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [columns, setColumns] = useState(initialColumns);

  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedRows, setSelectedRows] = useState([]);

  // debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // filter + sort
  const filteredUsers = useMemo(() => {
    let data = [...usersData];

    data = data.filter((u) =>
      Object.values(u).join(" ").toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    data.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [debouncedSearch, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // selection
  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === paginatedUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedUsers.map((u) => u.id));
    }
  };

  // columns
  const toggleColumn = (key) => {
    setColumns((prev) =>
      prev.map((c) =>
        c.key === key ? { ...c, visible: !c.visible } : c
      )
    );
  };

  // export CSV
  const exportCSV = () => {
    const header = "ID,Name,Email,Role,Status\n";
    const rows = filteredUsers
      .map((u) => `${u.id},${u.name},${u.email},${u.role},${u.status}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };

  // export PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["ID", "Name", "Email", "Role", "Status"]],
      body: filteredUsers.map((u) => [
        u.id,
        u.name,
        u.email,
        u.role,
        u.status,
      ]),
    });

    doc.save("users.pdf");
  };

  // sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((p) => (p === "asc" ? "desc" : "asc"));
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
    <div className="bg-white border rounded-xl shadow-sm p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-blue-600" />
          <h2 className="text-lg font-semibold">Users List</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 text-xs border rounded-lg hover:bg-slate-50"
          >
            CSV
          </button>

          <button
            onClick={exportPDF}
            className="px-3 py-1.5 text-xs border rounded-lg hover:bg-slate-50"
          >
            PDF
          </button>

          <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg flex items-center gap-1">
            <Plus size={14} /> Add User
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 w-full lg:w-1/3 border rounded-lg px-3 py-2 bg-slate-50">
          <Search size={16} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* COLUMN TOGGLE */}
      <div className="flex flex-wrap gap-2 mb-4">
        {columns.map((c) => (
          <label
            key={c.key}
            className="text-xs border px-2 py-1 rounded bg-slate-50 flex items-center gap-1"
          >
            <input
              type="checkbox"
              checked={c.visible}
              onChange={() => toggleColumn(c.key)}
            />
            {c.label}
          </label>
        ))}
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-slate-50">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === paginatedUsers.length &&
                    paginatedUsers.length > 0
                  }
                  onChange={toggleAll}
                />
              </th>

              {columns.map(
                (c) =>
                  c.visible && (
                    <th
                      key={c.key}
                      onClick={() => handleSort(c.key)}
                      className="p-3 text-left cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-1">
                        {c.label}
                        <SortIcon field={c.key} />
                      </div>
                    </th>
                  )
              )}

              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => (
              <tr
                key={u.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(u.id)}
                    onChange={() => toggleRow(u.id)}
                  />
                </td>

                {columns.map(
                  (c) =>
                    c.visible && (
                      <td key={c.key} className="p-3 text-slate-700">
                        {u[c.key]}
                      </td>
                    )
                )}

                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                    <Pencil size={14} />
                  </button>
                  <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
        </select>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}