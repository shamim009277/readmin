import React, { useState } from "react";
import Users from "lucide-react/dist/esm/icons/users.mjs";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.mjs";
import X from "lucide-react/dist/esm/icons/x.mjs";
import CheckCircle from "lucide-react/dist/esm/icons/check-circle.mjs";
import AlertTriangle from "lucide-react/dist/esm/icons/alert-triangle.mjs";
import Plus from "lucide-react/dist/esm/icons/plus.mjs";

export const ModalPage = () => {
  const [modal, setModal] = useState(null);

  const closeModal = () => setModal(null);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Modal</h1>
        </div>

        <div className="mt-1 flex items-center text-sm text-slate-500">
          <span>Dashboard</span>
          <ChevronRight size={16} className="mx-1" />
          <span>Components</span>
          <ChevronRight size={16} className="mx-1" />
          <span className="font-medium text-slate-700">
            Modal
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm min-h-[400px]">
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
              <Users size={22} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Modal Components
              </h2>

              <p className="text-sm text-slate-500">
                Different modal examples with various styles.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => setModal("basic")}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50"
          >
            Basic Modal
          </button>

          <button
            onClick={() => setModal("large")}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50"
          >
            Large Modal
          </button>

          <button
            onClick={() => setModal("confirm")}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50"
          >
            Confirmation Modal
          </button>

          <button
            onClick={() => setModal("success")}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50"
          >
            Success Modal
          </button>

          <button
            onClick={() => setModal("form")}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50"
          >
            Form Modal
          </button>

          <button
            onClick={() => setModal("scroll")}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50"
          >
            Scrollable Modal
          </button>
        </div>
      </div>

      {/* Basic Modal */}
      {modal === "basic" && (
        <Modal title="Basic Modal" close={closeModal}>
          <p className="text-sm text-slate-600">
            This is a simple modal example.
          </p>
        </Modal>
      )}

      {/* Large Modal */}
      {modal === "large" && (
        <Modal title="Large Modal" size="max-w-4xl" close={closeModal}>
          <p className="text-sm text-slate-600">
            Large modal for displaying more content.
          </p>
        </Modal>
      )}

      {/* Confirmation Modal */}
      {modal === "confirm" && (
        <Modal title="Delete Record" close={closeModal}>
          <div className="text-center">
            <AlertTriangle
              size={50}
              className="mx-auto mb-3 text-red-500"
            />

            <p className="text-sm text-slate-600">
              Are you sure you want to delete this item?
            </p>

            <div className="mt-5 flex justify-center gap-2">
              <button
                onClick={closeModal}
                className="rounded-md border px-4 py-2"
              >
                Cancel
              </button>

              <button
                className="rounded-md bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Success Modal */}
      {modal === "success" && (
        <Modal title="Success" close={closeModal}>
          <div className="text-center">
            <CheckCircle
              size={60}
              className="mx-auto mb-3 text-green-500"
            />

            <p className="text-sm text-slate-600">
              Your operation completed successfully.
            </p>
          </div>
        </Modal>
      )}

      {/* Form Modal */}
      {modal === "form" && (
        <Modal title="Create User" close={closeModal}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-md border px-3 py-2"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border px-3 py-2"
            />

            <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white">
              <Plus size={16} />
              Save User
            </button>
          </div>
        </Modal>
      )}

      {/* Scrollable Modal */}
      {modal === "scroll" && (
        <Modal title="Scrollable Modal" close={closeModal}>
          <div className="max-h-80 overflow-y-auto">
            {[...Array(30)].map((_, i) => (
              <p key={i} className="mb-2 text-sm text-slate-600">
                Line {i + 1} - Example scrollable content.
              </p>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({
  title,
  children,
  close,
  size = "max-w-lg",
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-300"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${size} rounded-lg bg-white shadow-xl
          animate-[modalShow_0.3s_ease-out]`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h3 className="text-lg font-semibold text-slate-800">
            {title}
          </h3>

          <button
            onClick={close}
            className="rounded p-1 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalPage;
