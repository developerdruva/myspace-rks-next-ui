"use client";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";

const Theme = () => {
  const theme = useTheme();
  const mode = useSelector((state) => state.themeModeState.themeMode);
  const dispatch = useDispatch();
  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME_MODE" });
  };
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        textAlign: "center",
        width: 350,
        mx: "auto",
      }}
    >
      <Button variant="contained" onClick={toggleTheme} sx={{ mb: 2 }}>
        Toggle to {mode === "light" ? "Dark" : "Light"} Mode
      </Button>
      <Typography variant="h6">I follow the active theme!</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Background: {theme.palette.background.default}
      </Typography>
      <Typography variant="body2">
        Text: {theme.palette.text.primary}
      </Typography>
    </Box>
  );
};

export default Theme;
