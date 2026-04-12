import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div style={{ flex: 1 }}>
        <Header setMobileOpen={setMobileOpen} />

        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;