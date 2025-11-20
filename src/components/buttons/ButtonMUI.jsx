"use client";

import { Tooltip, IconButton, Button, Link as MuiLink } from "@mui/material";

const commonStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0px",
  borderRadius: "10px",
  textTransform: "none",
  transition: "all 0.25s ease",
  letterSpacing: "0.1rem",
  padding: "0.2rem 0.2rem",
  "&:hover": {
    // transform: "scale(1.05)",
    backgroundColor: "rgba(154, 188, 228, 0.12)",
  },
};

const ButtonMUI = ({
  tooltip = "",
  icon = null,
  label = "",
  variant = "icon",
  href = "",
  onClick = () => {},
  color = "inherit",
  size = "medium",
}) => {
  let data = {
    tooltip,
    icon,
    label,
    variant,
    href,
    onClick,
    color,
    size,
  };
  const component = getButton(data);
  return <Tooltip title={tooltip}>{component}</Tooltip>;
};

export default ButtonMUI;

const getButton = ({
  tooltip = "",
  icon = null,
  label = "",
  variant = "icon",
  href = "",
  onClick = () => {},
  color = "inherit",
  size = "medium",
}) => {
  let component;

  switch (variant) {
    case "button":
      component = (
        <Button
          onClick={onClick}
          startIcon={icon}
          color={color}
          size={size}
          sx={commonStyles}
        >
          {label}
        </Button>
      );
      break;

    case "link":
      component = (
        <MuiLink
          href={href}
          underline="none"
          color={color}
          sx={{
            ...commonStyles,
            padding: "6px 8px",
            cursor: "pointer",
          }}
        >
          {icon && <span>{icon}</span>}
          {label}
        </MuiLink>
      );
      break;

    default:
      component = (
        <IconButton
          onClick={onClick}
          color={color}
          size={size}
          sx={commonStyles}
        >
          {icon}
        </IconButton>
      );
  }
  return component;
};
