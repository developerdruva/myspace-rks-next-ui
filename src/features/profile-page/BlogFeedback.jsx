"use client";
import { useState } from "react";
import {
  Box,
  Popover,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Fab,
} from "@mui/material";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

export default function BlogFeedback() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [like, setLike] = useState(false);
  const [unlike, setUnlike] = useState(false);
  const [feedbackDesc, setFeedbackDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLike(false);
    setUnlike(false);
    setFeedbackDesc("");
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    localStorage.setItem("like", like);
    localStorage.setItem("unlike", unlike);
    localStorage.setItem("feedbackDesc", feedbackDesc);
    try {
      await axios.post("http://localhost:7979/saveFeedbackDetails", {
        like,
        unlike,
        feedbackDesc,
      });
      setSubmitted(true);
      setTimeout(handleClose, 1500);
    } catch (error) {
      console.error("Feedback submission failed", error);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Give Feedback" placement="left">
        <Fab
          color="primary"
          onClick={handleClick}
          sx={{
            position: "fixed",
            right: 20,
            bottom: 80,
            zIndex: 9999,
            boxShadow: 4,
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          <FaCommentDots />
        </Fab>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        PaperProps={{
          sx: { p: 2, width: 300, borderRadius: 2 },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600}>Blog Feedback</Typography>
          <IconButton size="small" onClick={handleClose}>
            <FaTimes />
          </IconButton>
        </Box>

        {typeof window !== "undefined" && (
          <div>
            {localStorage?.getItem("like") || localStorage.getItem("unlike") ? (
              <div className="text-success">
                you already given feedback. Thank you!
              </div>
            ) : (
              <>
                <Box display="flex" justifyContent="center" mt={2} gap={2}>
                  <IconButton
                    onClick={() => {
                      setLike(true);
                      setUnlike(false);
                    }}
                    sx={{
                      color: like ? "green" : "gray",
                      "&:hover": { color: "green" },
                    }}
                  >
                    <FaThumbsUp />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setLike(false);
                      setUnlike(true);
                    }}
                    sx={{
                      color: unlike ? "red" : "gray",
                      "&:hover": { color: "red" },
                    }}
                  >
                    <FaThumbsDown />
                  </IconButton>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Optional feedback"
                  value={feedbackDesc}
                  onChange={(e) => setFeedbackDesc(e.target.value)}
                  sx={{ mt: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleSubmit}
                  disabled={submitted || (!like && !unlike && !feedbackDesc)}
                >
                  {submitted ? "Thank you!" : "Submit"}
                </Button>
              </>
            )}
          </div>
        )}
      </Popover>
    </>
  );
}
