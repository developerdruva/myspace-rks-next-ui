"use client";
import { Box, CircularProgress, Backdrop, Typography } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Loading backdrop component
 * Props:
 * - open: boolean (show/hide backdrop)
 * - message: optional text shown under spinner
 * - blur: boolean adds backdrop blur when true
 * - size: 'small' | 'medium' | 'large' (spinner size)
 */
const Loading = ({
  open = true,
  message = "",
  blur = false,
  size = "medium",
}) => {
  const spinnerSize = size === "large" ? 60 : size === "small" ? 24 : 40;

  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1000,
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: blur ? "blur(4px)" : "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          px: 2,
        }}
      >
        <CircularProgress size={spinnerSize} thickness={4} />
        {message ? (
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "rgba(255,255,255,0.95)", textAlign: "center" }}
          >
            {message}
          </Typography>
        ) : null}
      </Box>
    </Backdrop>
  );
};

Loading.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  blur: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Loading;
