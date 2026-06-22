import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./pages/Dashboard";
import AllUsers from "./pages/AllUsers";
import AddUser from "./pages/AddUser";
import GeneralSettings from "./pages/GeneralSettings";
import SecuritySettings from "./pages/SecuritySettings";

export const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden">
          <Sidebar collapsed={collapsed} />

          <div className="flex-1 flex flex-col overflow-hidden">
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className="flex-1 overflow-auto p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<AllUsers />} />
                <Route path="/users/all" element={<AllUsers />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/settings/general" element={<GeneralSettings />} />
                <Route path="/settings/security" element={<SecuritySettings />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;