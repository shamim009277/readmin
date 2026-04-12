import { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  IconButton,
} from "@mui/material";

import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  ChevronDown,
  Circle,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const MENU = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "User List", path: "/users/list" },
      { title: "Create User", path: "/users/create" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState({});

  const isActive = (path) => location.pathname === path;

  // auto open parent
  useEffect(() => {
    const state = {};

    MENU.forEach((item) => {
      if (item.children) {
        const match = item.children.some((c) =>
          location.pathname.startsWith(c.path)
        );
        state[item.title] = match;
      }
    });

    setOpenMenu((prev) => ({ ...prev, ...state }));
  }, [location.pathname]);

  const toggleParent = (title) => {
    setOpenMenu((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Drawer
        variant="permanent"
        sx={{
            width: collapsed ? 80 : 260,
            flexShrink: 0,

            "& .MuiDrawer-paper": {
            width: collapsed ? 80 : 260,
            transition: "transform 0.35s ease, width 0.35s ease", // 🔥 better control
            overflowX: "hidden",
            whiteSpace: "nowrap",
            background: "linear-gradient(180deg,#1e293b,#0f172a)",
            color: "#fff",
            borderRight: "none",
            boxSizing: "border-box",
            },
        }}
        >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "16px",
        }}
      >
        {!collapsed && (
          <div style={{ fontWeight: 600, fontSize: 18 }}>
            Admin Panel
          </div>
        )}

        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: "#fff" }}
        >
          <Menu size={18} />
        </IconButton>
      </div>

      <List sx={{ px: 1 }}>

        {MENU.map((item) => {
          const Icon = item.icon;

          // ======================
          // 🔥 PARENT MENU
          // ======================
          if (item.children) {
            const isOpen = openMenu[item.title];

            return (
              <div key={item.title}>

                <Tooltip
                  title={item.title}
                  placement="right"
                  disableHoverListener={!collapsed}
                >
                  <ListItemButton
                    onClick={() => !collapsed && toggleParent(item.title)}
                    sx={{
                      height: 48, // 🔥 Parent taller
                      justifyContent: collapsed
                        ? "center"
                        : "space-between",
                      mb: 1,
                      borderRadius: "12px",
                      px: collapsed ? 1 : 2.5,

                      display: "flex",
                      alignItems: "center",

                      gap: 1.5, // 🔥 icon-text gap improved

                      background: isOpen ? "#334155" : "transparent",
                      color: "#cbd5e1",

                      transition: "all 0.25s ease",

                      "&:hover": {
                        background: "#334155",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "#cbd5e1",
                        minWidth: 0,
                        mr: collapsed ? 0 : 1, // 🔥 icon spacing fix
                      }}
                    >
                      <Icon size={20} />
                    </ListItemIcon>

                    {!collapsed && (
                      <>
                        <ListItemText primary={item.title} />

                        <ChevronDown
                          size={18}
                          style={{
                            transition: "0.3s",
                            transform: isOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>

                {/* CHILD MENU */}
                <Collapse in={isOpen && !collapsed} timeout="auto">
                  <List disablePadding>

                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.path}
                        component={Link}
                        to={child.path}
                        sx={{
                          height: 40, // 🔥 Child smaller height
                          pl: 6,
                          mx: 1,
                          mb: 0.6,

                          borderRadius: "10px",

                          color: isActive(child.path)
                            ? "#fff"
                            : "#94a3b8",

                          background: isActive(child.path)
                            ? "#334155"
                            : "transparent",

                          display: "flex",
                          alignItems: "center",

                          gap: 1,

                          transition: "all 0.25s ease",

                          "&:hover": {
                            background: "#334155",
                            transform: "translateX(6px)",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{ color: "#94a3b8", minWidth: 28 }}
                        >
                          <Circle size={10} />
                        </ListItemIcon>

                        <ListItemText
                          primary={child.title}
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "0.85rem",
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}

                  </List>
                </Collapse>

              </div>
            );
          }

          // ======================
          // 🔥 SINGLE MENU
          // ======================
          return (
            <Tooltip
              key={item.path}
              title={item.title}
              placement="right"
              disableHoverListener={!collapsed}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  height: 48,
                  justifyContent: collapsed ? "center" : "flex-start",
                  mb: 1,
                  borderRadius: "12px",
                  px: collapsed ? 1 : 2.5,

                  color: isActive(item.path)
                    ? "#fff"
                    : "#cbd5e1",

                  background: isActive(item.path)
                    ? "#334155"
                    : "transparent",

                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,

                  transition: "all 0.25s ease",

                  "&:hover": {
                    background: "#334155",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#cbd5e1", minWidth: 0 }}>
                  <Icon size={20} />
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText primary={item.title} />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}

      </List>
    </Drawer>
  );
};

export default Sidebar;