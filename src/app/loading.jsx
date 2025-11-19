"use client";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    setTimeout(() => {
      alert("hi");
    }, 1000);
  });
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      hi
    </Box>
  );
};

export default Loading;
