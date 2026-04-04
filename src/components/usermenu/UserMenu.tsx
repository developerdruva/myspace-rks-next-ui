"use client";

import { MouseEvent, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

export interface UserMenuProps {
  name: string;
  email: string;
  image?: string;
  compact?: boolean;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

export default function UserMenu({
  name,
  email,
  image,
  compact = false,
  onProfileClick,
  onLogoutClick,
}: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const initials = useMemo(() => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return "U";
    }

    const parts = trimmedName.split(" ").filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }, [name]);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    onProfileClick?.();
  };

  const handleLogout = () => {
    handleClose();
    onLogoutClick?.();
  };

  const menuId = `user-menu-${name.trim().toLowerCase().replace(/\s+/g, "-") || "account"}`;

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        aria-label="open user menu"
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          borderRadius: 99,
          px: compact ? 0.5 : { xs: 0.5, sm: 1 },
          py: 0.5,
          gap: 1,
          border: "1px solid rgba(148, 163, 184, 0.35)",
          color: "#e2e8f0",
        }}
      >
        <Avatar
          src={image}
          alt={name}
          sx={{ width: 32, height: 32, fontSize: "0.8rem", bgcolor: "#334155" }}
        >
          {initials}
        </Avatar>

        <Box
          sx={{
            display: compact ? "none" : { xs: "none", sm: "block" },
            textAlign: "left",
            minWidth: 0,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#f8fafc", fontWeight: 600, lineHeight: 1.2 }}
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#94a3b8", display: "block", maxWidth: 180 }}
            noWrap
          >
            {email}
          </Typography>
        </Box>

        <Box
          sx={{
            display: compact ? "none" : { xs: "none", sm: "inline-flex" },
            color: "#94a3b8",
          }}
        >
          <FiChevronDown size={16} />
        </Box>
      </IconButton>

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 240,
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {email}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <FiUser size={16} />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <FiLogOut size={16} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
