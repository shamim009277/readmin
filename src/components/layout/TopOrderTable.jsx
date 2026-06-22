import React, { useMemo, useState } from "react";
// Inline SVG icons to avoid lucide-react dependency
const Search = ({ size = 18, className = '' }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
)
const FileSpreadsheet = ({ size = 16, className = '' }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M9 18h6M9 14h6M9 10h6" /></svg>
)
const FileText = ({ size = 16, className = '' }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h8" /></svg>
)
const Printer = ({ size = 16, className = '' }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 01-2-2v-5h20v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" rx="2" /></svg>
)
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const orders = [
    {
        orderId: "ORD-1001",
        customer: "John Doe",
        totalItems: 5,
        amount: 1250,
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        orderDate: "2026-06-21",
    },
    {
        orderId: "ORD-1002",
        customer: "Sarah Smith",
        totalItems: 3,
        amount: 980,
        paymentStatus: "Pending",
        deliveryStatus: "Processing",
        orderDate: "2026-06-20",
    },
    {
        orderId: "ORD-1003",
        customer: "Michael Brown",
        totalItems: 8,
        amount: 875,
        paymentStatus: "Paid",
        deliveryStatus: "Shipped",
        orderDate: "2026-06-19",
    },
    {
        orderId: "ORD-1004",
        customer: "Emma Wilson",
        totalItems: 2,
        amount: 740,
        paymentStatus: "Failed",
        deliveryStatus: "Pending",
        orderDate: "2026-06-18",
    },
    {
        orderId: "ORD-1005",
        customer: "David Lee",
        totalItems: 6,
        amount: 690,
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        orderDate: "2026-06-17",
    },
    {
        orderId: "ORD-1006",
        customer: "Sophia Taylor",
        totalItems: 4,
        amount: 620,
        paymentStatus: "Paid",
        deliveryStatus: "Processing",
        orderDate: "2026-06-16",
    },
    {
        orderId: "ORD-1007",
        customer: "James Martin",
        totalItems: 7,
        amount: 580,
        paymentStatus: "Pending",
        deliveryStatus: "Shipped",
        orderDate: "2026-06-15",
    },
    {
        orderId: "ORD-1008",
        customer: "Olivia Clark",
        totalItems: 2,
        amount: 520,
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        orderDate: "2026-06-14",
    },
    {
        orderId: "ORD-1009",
        customer: "Daniel White",
        totalItems: 1,
        amount: 480,
        paymentStatus: "Failed",
        deliveryStatus: "Pending",
        orderDate: "2026-06-13",
    },
    {
        orderId: "ORD-1010",
        customer: "Ava Harris",
        totalItems: 9,
        amount: 450,
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        orderDate: "2026-06-12",
    },
];

const TopOrderTable = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const perPage = 5;

    const filteredOrders = useMemo(() => {
        return orders.filter(
            (order) =>
                order.orderId.toLowerCase().includes(search.toLowerCase()) ||
                order.customer.toLowerCase().includes(search.toLowerCase()) ||
                order.paymentStatus.toLowerCase().includes(search.toLowerCase()) ||
                order.deliveryStatus.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const totalPages = Math.ceil(filteredOrders.length / perPage);

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(file, "orders.xlsx");
    };

    const exportPDF = () => {
        const doc = new jsPDF();

        autoTable(doc, {
            head: [
                [
                    "Order ID",
                    "Customer",
                    "Items",
                    "Amount",
                    "Payment",
                    "Delivery",
                    "Date",
                ],
            ],
            body: filteredOrders.map((o) => [
                o.orderId,
                o.customer,
                o.totalItems,
                `$${o.amount}`,
                o.paymentStatus,
                o.deliveryStatus,
                o.orderDate,
            ]),
        });

        doc.save("orders.pdf");
    };

    const printTable = () => {
        window.print();
    };

    const paymentBadge = (status) => {
        switch (status) {
            case "Paid":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Failed":
                return "bg-red-100 text-red-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const deliveryBadge = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-700";
            case "Shipped":
                return "bg-blue-100 text-blue-700";
            case "Processing":
                return "bg-purple-100 text-purple-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-slate-700">
                        Top Orders
                    </h2>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Search */}
                        <div className="relative">
                            <Search
                                size={14}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-8 pl-8 pr-3 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Excel */}
                        <button
                            onClick={exportExcel}
                            className="h-8 px-3 flex items-center gap-1 text-xs font-medium bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            <FileSpreadsheet size={13} />
                            Excel
                        </button>

                        {/* PDF */}
                        <button
                            onClick={exportPDF}
                            className="h-8 px-3 flex items-center gap-1 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            <FileText size={13} />
                            PDF
                        </button>

                        {/* Print */}
                        <button
                            onClick={printTable}
                            className="h-8 px-3 flex items-center gap-1 text-xs font-medium bg-slate-700 text-white rounded-md hover:bg-slate-800"
                        >
                            <Printer size={13} />
                            Print
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px]">
                    <thead className="bg-slate-50">
                        <tr className="border-y border-slate-100">
                            <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                Order ID
                            </th>

                            <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                Customer
                            </th>

                            <th className="px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                Items
                            </th>

                            <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                Amount
                            </th>

                            <th className="px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                Payment
                            </th>

                            <th className="px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                Delivery
                            </th>

                            <th className="px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                Order Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedOrders.map((order) => (
                            <tr
                                key={order.orderId}
                                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                            >
                                <td className="px-3 py-2.5 text-sm font-medium text-slate-700">
                                    {order.orderId}
                                </td>

                                <td className="px-3 py-2.5 text-sm text-slate-600">
                                    {order.customer}
                                </td>

                                <td className="px-3 py-2.5 text-sm text-center text-slate-600">
                                    {order.totalItems}
                                </td>

                                <td className="px-3 py-2.5 text-sm text-right font-semibold text-slate-700">
                                    ${order.amount}
                                </td>

                                <td className="px-3 py-2.5 text-center">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${paymentBadge(
                                            order.paymentStatus
                                        )}`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </td>

                                <td className="px-3 py-2.5 text-center">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${deliveryBadge(
                                            order.deliveryStatus
                                        )}`}
                                    >
                                        {order.deliveryStatus}
                                    </span>
                                </td>

                                <td className="px-3 py-2.5 text-center text-sm text-slate-500">
                                    {order.orderDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                    Showing {paginatedOrders.length} of {filteredOrders.length} orders
                </span>

                <div className="flex gap-1">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-2.5 py-1 text-xs border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-2.5 py-1 text-xs border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopOrderTable;