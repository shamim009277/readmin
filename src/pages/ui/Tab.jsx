import React, { useState } from "react";
import Users from "lucide-react/dist/esm/icons/users.mjs";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.mjs";
import Settings from "lucide-react/dist/esm/icons/settings.mjs";
import Shield from "lucide-react/dist/esm/icons/shield.mjs";
import Database from "lucide-react/dist/esm/icons/database.mjs";

const TabsPage = () => {
  const [tab, setTab] = useState("users");
  const [verticalTab, setVerticalTab] = useState("profile");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Tabs & Pills
        </h1>

        <div className="mt-1 flex items-center text-sm text-slate-500">
          <span>Dashboard</span>
          <ChevronRight size={16} className="mx-1" />
          <span>Components</span>
          <ChevronRight size={16} className="mx-1" />
          <span className="font-medium text-slate-700">
            Tabs & Pills
          </span>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Horizontal Tabs
          </h2>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap border-b border-slate-200">
            {[
              { key: "users", label: "Users" },
              { key: "settings", label: "Settings" },
              { key: "security", label: "Security" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`px-5 py-3 text-sm font-medium transition ${
                  tab === item.key
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-5 text-slate-600">
            {tab === "users" && "Users management content."}
            {tab === "settings" && "Application settings content."}
            {tab === "security" && "Security and permissions content."}
          </div>
        </div>
      </div>

      {/* Icon Tabs */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold">
            Icon Tabs
          </h2>
        </div>

        <div className="p-5">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-blue-600">
              <Users size={18} />
              Users
            </button>

            <button className="flex items-center gap-2 rounded-lg px-4 py-3 hover:bg-slate-50">
              <Settings size={18} />
              Settings
            </button>

            <button className="flex items-center gap-2 rounded-lg px-4 py-3 hover:bg-slate-50">
              <Shield size={18} />
              Security
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Tabs */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold">
            Vertical Tabs
          </h2>
        </div>

        <div className="flex">
          <div className="w-60 border-r border-slate-200">
            {[
              "profile",
              "account",
              "notifications",
              "privacy",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setVerticalTab(item)}
                className={`block w-full px-4 py-3 text-left text-sm ${
                  verticalTab === item
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-slate-50"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex-1 p-5">
            <h3 className="font-semibold capitalize">
              {verticalTab}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Content for {verticalTab} tab.
            </p>
          </div>
        </div>
      </div>

      {/* Pills */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold">
            Basic Pills
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 p-5">
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
            Default
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
            Primary
          </span>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
            Success
          </span>

          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-700">
            Warning
          </span>

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">
            Danger
          </span>
        </div>
      </div>

      {/* Colored Pills */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold">
            Solid Pills
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 p-5">
          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white">
            Active
          </span>

          <span className="rounded-full bg-green-600 px-4 py-2 text-sm text-white">
            Completed
          </span>

          <span className="rounded-full bg-red-600 px-4 py-2 text-sm text-white">
            Rejected
          </span>

          <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm text-white">
            Pending
          </span>
        </div>
      </div>

      {/* Icon Pills */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold">
            Icon Pills
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 p-5">
          <span className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
            <Users size={14} />
            Users
          </span>

          <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
            <Database size={14} />
            Database
          </span>

          <span className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-700">
            <Shield size={14} />
            Security
          </span>
        </div>
      </div>
    </div>
  );
};

export default TabsPage;