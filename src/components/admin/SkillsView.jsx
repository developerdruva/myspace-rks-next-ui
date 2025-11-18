"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Slider,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { showApiStatusNotice } from "@/common/CommonFunction";
import apiServices from "@/utils/service-calls/apiServices";
import SkillsByCategoryView from "../cards/SkillsViewByCategory";

const SkillsView = ({ emailId }) => {
  const dispatch = useDispatch();
  const mySkills = useSelector((state) => state.portfolioState?.mySkills) || [];

  const [skills, setSkills] = useState(mySkills || []);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formValues, setFormValues] = useState({
    skill_name: "",
    skill_value: 60,
    skill_seq: 1,
    skill_style: "blue",
  });

  // Delete Dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await apiServices.getSkillsListDetails(emailId);
      if (res?.data?.skillsList) {
        setSkills(res.data.skillsList);
        dispatch({
          type: "PORTFOLIO_DETAILS",
          payload: { mySkills: res.data.skillsList },
        });
      }
    } catch (err) {
      showApiStatusNotice(err.message || "Failed to fetch skills", "error");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (record = null) => {
    if (record) {
      setFormValues(record);
      setEditingRecord(record);
    } else {
      setFormValues({
        skill_name: "",
        skill_value: 60,
        skill_seq: 1,
        skill_style: "blue",
      });
      setEditingRecord(null);
    }
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    const values = { ...formValues, email_id: emailId };
    try {
      let res;
      if (editingRecord) {
        res = await apiServices.updateSkillsListDetail(editingRecord.sl_no, values);
      } else {
        res = await apiServices.addSkillsListDetail(values);
      }
      if (res?.data?.status === "success") {
        showApiStatusNotice(res?.data?.message, "success");
        setIsModalVisible(false);
        fetchSkills();
      } else {
        showApiStatusNotice(res?.data?.message, "error");
      }
    } catch (err) {
      showApiStatusNotice(err.message, "error");
    }
  };

  // Open Delete Dialog
  const handleDeleteDialogOpen = (record) => {
    setRecordToDelete(record);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setRecordToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!recordToDelete) return;
    try {
      const res = await apiServices.deleteSkillsListDetail(recordToDelete.sl_no);
      if (res?.data?.status === "success") {
        showApiStatusNotice(res.data.message, "success");
        fetchSkills();
      } else {
        showApiStatusNotice(res.data.message || "Delete failed", "error");
      }
    } catch (err) {
      showApiStatusNotice(err.message, "error");
    } finally {
      handleDeleteDialogClose();
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Skill List</Typography>
        <Button
          variant="contained"
          startIcon={<AiOutlinePlus />}
          onClick={() => openModal(null)}
        >
          Add Skill
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Skill Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Style</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.sl_no}>
                <TableCell>{skill.skill_name}</TableCell>
                <TableCell>{skill.skill_value}%</TableCell>
                <TableCell>{skill.skill_seq}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: skill.skill_style,
                      color: "#fff",
                    }}
                  >
                    {skill.skill_style}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => openModal(skill)}>
                    <AiOutlineEdit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteDialogOpen(skill)}
                  >
                    <AiOutlineDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SkillsByCategoryView emailId={emailId} isAdmin={true} />

      {/* Add/Edit Modal */}
      <Modal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onBackdropClick={() => setIsModalVisible(false)}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: 3,
            width: 500,
            margin: "10vh auto",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editingRecord ? "Edit Skill" : "Add Skill"}
          </Typography>

          <TextField
            label="Skill Name"
            fullWidth
            margin="normal"
            value={formValues.skill_name}
            onChange={(e) =>
              setFormValues({ ...formValues, skill_name: e.target.value })
            }
          />

          <Box mt={2}>
            <Typography gutterBottom>Skill Value</Typography>
            <Slider
              min={0}
              max={100}
              value={formValues.skill_value}
              onChange={(e, newValue) =>
                setFormValues({ ...formValues, skill_value: newValue })
              }
              valueLabelDisplay="auto"
            />
          </Box>

          <TextField
            label="Sequence"
            type="number"
            fullWidth
            margin="normal"
            value={formValues.skill_seq}
            onChange={(e) =>
              setFormValues({ ...formValues, skill_seq: Number(e.target.value) })
            }
          />

          <TextField
            label="Style (color)"
            fullWidth
            margin="normal"
            value={formValues.skill_style}
            onChange={(e) =>
              setFormValues({ ...formValues, skill_style: e.target.value })
            }
          />

          <Box mt={3} textAlign="right">
            <Button
              variant="outlined"
              onClick={() => setIsModalVisible(false)}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete{" "}
            <strong>{recordToDelete?.skill_name || ""}</strong>? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SkillsView;
