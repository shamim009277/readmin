import React, { useState } from "react";
import Users from "lucide-react/dist/esm/icons/users.mjs";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.mjs";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.mjs";
import Settings from "lucide-react/dist/esm/icons/settings.mjs";
import Shield from "lucide-react/dist/esm/icons/shield.mjs";
import Database from "lucide-react/dist/esm/icons/database.mjs";


export const Accordion = () => {
  const [openItems, setOpenItems] = useState([0]);

  const accordionItems = [
    {
      title: "User Management",
      icon: <Users size={18} />,
      content:
        "Manage users, roles, permissions, account status and profile information from this section.",
    },
    {
      title: "System Settings",
      icon: <Settings size={18} />,
      content:
        "Configure application settings, appearance, timezone, localization and general preferences.",
    },
    {
      title: "Security & Permissions",
      icon: <Shield size={18} />,
      content:
        "Manage authentication, authorization, access control and security policies.",
    },
    {
      title: "Database Management",
      icon: <Database size={18} />,
      content:
        "Backup database, monitor performance and manage data synchronization.",
    },
  ];

  const toggleAccordion = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Accordion Examples</h1>
        </div>

        <div className="mt-1 flex items-center text-sm text-slate-500">
          <span>Dashboard</span>
          <ChevronRight size={16} className="mx-1" />
          <span>Components</span>
          <ChevronRight size={16} className="mx-1" />
          <span className="font-medium text-slate-700">
            Accordion
          </span>
        </div>
      </div>

      {/* Accordion Card */}
      <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
              <Users size={22} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Accordion Components
              </h2>

              <p className="text-sm text-slate-500">
                Multiple expandable accordion examples.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion Body */}
        <div className="p-5">
          <div className="space-y-3">
            {accordionItems.map((item, index) => {
              const isOpen = openItems.includes(index);

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-slate-200"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between bg-white px-5 py-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-slate-600">
                        {item.icon}
                      </div>

                      <span className="font-medium text-slate-700">
                        {item.title}
                      </span>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen
                        ? "max-h-40 border-t border-slate-100"
                        : "max-h-0"
                      }`}
                  >
                    <div className="bg-slate-50 px-5 py-4">
                      <p className="text-sm leading-6 text-slate-600">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Accordion Styles */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Minimal */}
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Minimal Accordion
          </h3>

          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <details
                key={item}
                className="rounded-lg border border-slate-200"
              >
                <summary className="cursor-pointer list-none px-4 py-3 font-medium text-slate-700">
                  Accordion Item {item}
                </summary>

                <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
                  This is a simple accordion using HTML details tag.
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Colored */}
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Colored Accordion
          </h3>

          <div className="space-y-3">
            <details className="overflow-hidden rounded-lg border border-blue-200">
              <summary className="cursor-pointer list-none bg-blue-50 px-4 py-3 font-medium text-blue-700">
                Primary Accordion
              </summary>

              <div className="px-4 py-3 text-sm text-slate-600">
                Primary styled accordion content.
              </div>
            </details>

            <details className="overflow-hidden rounded-lg border border-green-200">
              <summary className="cursor-pointer list-none bg-green-50 px-4 py-3 font-medium text-green-700">
                Success Accordion
              </summary>

              <div className="px-4 py-3 text-sm text-slate-600">
                Success styled accordion content.
              </div>
            </details>

            <details className="overflow-hidden rounded-lg border border-red-200">
              <summary className="cursor-pointer list-none bg-red-50 px-4 py-3 font-medium text-red-700">
                Danger Accordion
              </summary>

              <div className="px-4 py-3 text-sm text-slate-600">
                Danger styled accordion content.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;