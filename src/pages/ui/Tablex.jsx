import React, { useMemo, useState, useEffect } from "react";
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

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const usersData = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`,
    role: ["Admin", "Manager", "User", "Editor"][i % 4],
    status: i % 3 === 0 ? "Inactive" : "Active",
}));

const columnsDefault = [
    { key: "id", label: "ID", visible: true },
    { key: "name", label: "Name", visible: true },
    { key: "email", label: "Email", visible: true },
    { key: "role", label: "Role", visible: true },
    { key: "status", label: "Status", visible: true },
];

export default function UsersTable() {
    const [search, setSearch] = useState("");
    const [debounced, setDebounced] = useState("");

    const [columns, setColumns] = useState(columnsDefault);

    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [selected, setSelected] = useState([]);

    // ================= debounce =================
    useEffect(() => {
        const t = setTimeout(() => setDebounced(search), 300);
        return () => clearTimeout(t);
    }, [search]);

    // ================= filter + sort =================
    const filtered = useMemo(() => {
        let data = [...usersData];

        data = data.filter((u) =>
            Object.values(u)
                .join(" ")
                .toLowerCase()
                .includes(debounced.toLowerCase())
        );

        data.sort((a, b) => {
            if (a[sortField] < b[sortField])
                return sortDirection === "asc" ? -1 : 1;
            if (a[sortField] > b[sortField])
                return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

        return data;
    }, [debounced, sortField, sortDirection]);

    const totalPages = Math.ceil(filtered.length / perPage);

    const paginated = useMemo(() => {
        const start = (page - 1) * perPage;
        return filtered.slice(start, start + perPage);
    }, [filtered, page, perPage]);

    // ================= selection =================
    const toggleRow = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selected.length === paginated.length) setSelected([]);
        else setSelected(paginated.map((u) => u.id));
    };

    // ================= column toggle =================
    const toggleColumn = (key) => {
        setColumns((prev) =>
            prev.map((c) =>
                c.key === key ? { ...c, visible: !c.visible } : c
            )
        );
    };

    // ================= export =================
    const exportCSV = () => {
        const header = "ID,Name,Email,Role,Status\n";
        const rows = filtered
            .map((u) => `${u.id},${u.name},${u.email},${u.role},${u.status}`)
            .join("\n");

        const blob = new Blob([header + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users.csv";
        a.click();
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [["ID", "Name", "Email", "Role", "Status"]],
            body: filtered.map((u) => [
                u.id,
                u.name,
                u.email,
                u.role,
                u.status,
            ]),
        });
        doc.save("users.pdf");
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection((p) => (p === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const SortIcon = ({ field }) =>
        sortField === field ? (
            sortDirection === "asc" ? (
                <ChevronUp size={14} />
            ) : (
                <ChevronDown size={14} />
            )
        ) : (
            <span className="opacity-30">↕</span>
        );

    return (
        <div className="p-6 min-h-screen bg-white rounded-lg shadow-sm">

            {/* HEADER */}
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h1 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
                        <Users size={18} /> User Management
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage all system users in one place
                    </p>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-sm">
                    <Plus size={16} /> Add User
                </button>
            </div>

            {/* TOOLBAR */}
            {/* TOOLBAR WRAPPER */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT: SEARCH */}
                <div className="flex items-center gap-2 w-full lg:w-1/3">
                    <div className="flex items-center gap-2 w-full bg-white border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-blue-500 transition">
                        <Search size={16} className="text-slate-400" />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search users, email, role..."
                            className="w-full text-sm outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* RIGHT: CONTROLS */}
                <div className="flex flex-wrap items-center gap-2">

                    {/* PER PAGE */}
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-1.5">
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                            Show
                        </span>

                        <select
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                            className="text-sm bg-transparent outline-none cursor-pointer"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>

                        <span className="text-xs text-slate-500">
                            entries
                        </span>
                    </div>

                    {/* DIVIDER */}
                    <div className="hidden lg:block w-px h-6 bg-slate-200"></div>

                    {/* EXPORT BUTTONS */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={exportCSV}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50 transition"
                        >
                            <Download size={14} />
                            CSV
                        </button>

                        <button
                            onClick={exportPDF}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50 transition"
                        >
                            <Download size={14} />
                            PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* TABLE CARD */}
            <div className="mt-4 bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">

                {/* TABLE */}
                <div className="overflow-auto">
                    <table className="w-full text-sm">

                        {/* HEADER */}
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="p-2 w-10">
                                    <input
                                        type="checkbox"
                                        onChange={toggleAll}
                                        checked={
                                            selected.length === paginated.length &&
                                            paginated.length > 0
                                        }
                                    />
                                </th>

                                {columns.map(
                                    (c) =>
                                        c.visible && (
                                            <th
                                                key={c.key}
                                                onClick={() => handleSort(c.key)}
                                                className="p-2 text-left cursor-pointer select-none"
                                            >
                                                <div className="flex items-center gap-1">
                                                    {c.label}
                                                    <SortIcon field={c.key} />
                                                </div>
                                            </th>
                                        )
                                )}

                                <th className="p-2 text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {paginated.map((u) => (
                                <tr
                                    key={u.id}
                                    className="border-t border-slate-300 hover:bg-slate-50 transition"
                                >
                                    <td className="p-2">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(u.id)}
                                            onChange={() => toggleRow(u.id)}
                                        />
                                    </td>

                                    {columns.map(
                                        (c) =>
                                            c.visible && (
                                                <td key={c.key} className="p-2 text-slate-700">
                                                    {u[c.key]}
                                                </td>
                                            )
                                    )}

                                    <td className="p-2 text-right">
                                        <div className="flex justify-end">
                                            <button className="p-2 rounded-lg hover:bg-slate-100">
                                                <Pencil size={14} />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col lg:flex-row justify-between items-center p-4 border-t border-slate-300 gap-3">

                    <p className="text-xs text-slate-500">
                        Showing {(page - 1) * perPage + 1} to{" "}
                        {Math.min(page * perPage, filtered.length)} of{" "}
                        {filtered.length}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
                        >
                            Prev
                        </button>

                        <span className="text-sm">
                            {page} / {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}