import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

import { Bell, Settings, LogOut, ExternalLink } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [userAnchor, setUserAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);

  const [notifications] = useState([
    { id: 1, title: "New user registered", message: "A new user joined", read: false },
    { id: 2, title: "Server Warning", message: "High CPU usage detected", read: false },
    { id: 3, title: "Order Received", message: "Order #1024 placed", read: true },
    { id: 4, title: "Payment Success", message: "Payment completed", read: false },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openUserMenu = (e) => setUserAnchor(e.currentTarget);
  const closeUserMenu = () => setUserAnchor(null);

  const openNotifMenu = (e) => setNotifAnchor(e.currentTarget);
  const closeNotifMenu = () => setNotifAnchor(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* LEFT */}
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
          Admin Dashboard
        </Typography>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

          {/* NOTIFICATION */}
          <IconButton
            onClick={openNotifMenu}
            sx={{
              color: "#cbd5e1",
              "&:hover": { color: "#fff", transform: "scale(1.05)" },
              transition: "0.2s",
            }}
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 10,
                  height: 18,
                  minWidth: 18,
                },
              }}
            >
              <Bell size={20} />
            </Badge>
          </IconButton>

          {/* NOTIFICATION MENU */}
          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={closeNotifMenu}
            PaperProps={{
              sx: {
                width: 360,
                mt: 1.5,
                background: "#1e293b",
                color: "#fff",
                borderRadius: 2,
                overflow: "hidden",
                animation: "fadeIn 0.2s ease-in-out",
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateY(-10px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              },
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Notifications
              </Typography>

              <Typography sx={{ fontSize: 12, color: "#94a3b8" }}>
                {unreadCount} new
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "#334155" }} />

            {/* LIST */}
            <List sx={{ p: 0, maxHeight: 280, overflowY: "auto" }}>
              {notifications.map((notif) => (
                <ListItemButton
                  key={notif.id}
                  sx={{
                    px: 2,
                    py: 1.2,
                    transition: "0.2s",
                    background: notif.read ? "transparent" : "#334155",
                    "&:hover": { background: "#475569" },
                  }}
                >
                  <ListItemText
                    primary={notif.title}
                    secondary={notif.message}
                    primaryTypographyProps={{
                      fontSize: 13,
                      fontWeight: notif.read ? 400 : 600,
                      color: "#fff",
                    }}
                    secondaryTypographyProps={{
                      fontSize: 12,
                      color: "#cbd5e1",
                    }}
                  />
                </ListItemButton>
              ))}
            </List>

            {/* FOOTER */}
            <Divider sx={{ borderColor: "#334155" }} />

            <Box
              sx={{
                p: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                size="small"
                endIcon={<ExternalLink size={14} />}
                sx={{
                  color: "#60a5fa",
                  textTransform: "none",
                  fontSize: 12,
                }}
              >
                View all notifications
              </Button>
            </Box>
          </Menu>

          {/* SETTINGS */}
          <IconButton sx={{ color: "#cbd5e1" }}>
            <Settings size={20} />
          </IconButton>

          {/* USER */}
          <IconButton onClick={openUserMenu}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#3b82f6",
              }}
            >
              A
            </Avatar>
          </IconButton>

          {/* USER MENU */}
          <Menu
            anchorEl={userAnchor}
            open={Boolean(userAnchor)}
            onClose={closeUserMenu}
            PaperProps={{
              sx: {
                mt: 1.5,
                background: "#1e293b",
                color: "#fff",
                borderRadius: 2,
                minWidth: 180,
                animation: "fadeIn 0.2s ease-in-out",
              },
            }}
          >
            <MenuItem onClick={closeUserMenu}>Profile</MenuItem>
            <MenuItem onClick={closeUserMenu}>Settings</MenuItem>
            <Divider sx={{ borderColor: "#334155" }} />
            <MenuItem onClick={closeUserMenu} sx={{ color: "#f87171" }}>
              <LogOut size={16} style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;