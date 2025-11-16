"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Modal,
  TextField,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import apiServices from "@/utils/service-calls/apiServices";
import { colorToRGBA, showApiStatusNotice } from "@/common/CommonFunction";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";

const categoryColors = {
  1: "#1890ff",
  2: "#722ed1",
  3: "#13c2c2",
  4: "#fa8c16",
  5: "#52c41a",
  6: "#eb2f96",
};

const SkillsByCategoryView = ({ emailId, isAdmin }) => {
  const skillsByCategory1 =
    useSelector((state) => state.portfolioState?.skillsByCategory) || [];
  const skillTypes1 =
    useSelector((state) => state.portfolioState?.skillTypes) || [];

  const [skillsByCategory, setSkillsByCategory] = useState(skillsByCategory1);
  const [skillTypes, setSkillTypes] = useState(skillTypes1);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    skill_name: "",
    skill_type_id: "",
  });

  // Delete Dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  const dispatch = useDispatch();

  const fetchSkills = async () => {
    try {
      const res = await apiServices.getMySkills(emailId);
      if (res?.data) {
        setSkillsByCategory(res.data.skillsByCategory || []);
        dispatch({
          type: "PORTFOLIO_DETAILS",
          payload: {
            skillsByCategory: res.data.skillsByCategory || [],
          },
        });
      }
    } catch (err) {
      showApiStatusNotice("Failed to fetch skills", "error");
    }
  };

  const typeMap = skillTypes.reduce((acc, type) => {
    acc[type.id] = type.label_name;
    return acc;
  }, {});

  const openModalHandler = (skillTypeId = null, skill = null, sl_no = null) => {
    setEditing({ sl_no, skill, skillTypeId });
    setFormValues({
      skill_name: skill || "",
      skill_type_id: skillTypeId || "",
    });
    setModalOpen(true);
  };

  const handleFinish = async () => {
    if (isAdmin) {
      try {
        let res;
        if (editing?.skill) {
          res = await apiServices.updateMySkill(editing.sl_no, formValues);
        } else {
          res = await apiServices.addMySkill({ ...formValues, email_id: emailId });
        }

        if (res?.data?.status === "success") {
          showApiStatusNotice(res.data.message, "success");
          fetchSkills();
          setModalOpen(false);
          setFormValues({ skill_name: "", skill_type_id: "" });
        } else {
          showApiStatusNotice(res?.data?.message, "error");
        }
      } catch (err) {
        showApiStatusNotice(err.message || "Operation failed", "error");
      }
    }
  };

  // Delete handlers
  const handleDeleteDialogOpen = (skill) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setSkillToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!skillToDelete) return;
    try {
      const res = await apiServices.deleteMySkill(skillToDelete.sl_no);
      if (res?.data?.status === "success") {
        showApiStatusNotice(res.data.message, "success");
        fetchSkills();
      } else {
        showApiStatusNotice(res.data.message, "error");
      }
    } catch (err) {
      showApiStatusNotice(err.message || "Delete failed", "error");
    } finally {
      handleDeleteDialogClose();
    }
  };

  return (
    <Box sx={{ p: 2, mt: 3 }}>
      <Typography variant={isAdmin ? "h6" : "body1"} gutterBottom>
        Skills by Category
      </Typography>

      {isAdmin && (
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" size="small" onClick={() => openModalHandler()}>
            Add Skill
          </Button>
        </Box>
      )}

      <Grid container spacing={2}>
        {skillsByCategory.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.skill_type_id}>
            <Card
              sx={{
                borderRadius: 2,
                backgroundColor: colorToRGBA(
                  categoryColors[category.skill_type_id] || "#f0f0f0",
                  0.2
                ),
              }}
            >
              <CardHeader
                title={typeMap[category.skill_type_id] || "Unknown"}
                sx={{
                  backgroundColor: colorToRGBA(
                    categoryColors[category.skill_type_id] || "#e0e0e0",
                    0.2
                  ),
                  fontWeight: 600,
                }}
              />
              <CardContent>
                {category.skills.map((skill, i) => (
                  <Chip
                    key={i}
                    label={
                      <Box display="flex" alignItems="center">
                        {skill.skill_name}
                        {isAdmin && (
                          <>
                            <RiEditLine
                              style={{ marginLeft: 6, cursor: "pointer" }}
                              onClick={() =>
                                openModalHandler(
                                  category.skill_type_id,
                                  skill.skill_name,
                                  skill.sl_no
                                )
                              }
                            />
                            <MdDeleteOutline
                              style={{ marginLeft: 4, cursor: "pointer" }}
                              onClick={() => handleDeleteDialogOpen(skill)}
                            />
                          </>
                        )}
                      </Box>
                    }
                    sx={{
                      backgroundColor:
                        categoryColors[category.skill_type_id] || "lightgrey",
                      color: "#fff",
                      mr: 1,
                      mb: 1,
                    }}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editing?.skill ? "Edit Skill" : "Add Skill"}
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
          <TextField
            label="Skill Category"
            select
            fullWidth
            margin="normal"
            value={formValues.skill_type_id}
            onChange={(e) =>
              setFormValues({ ...formValues, skill_type_id: e.target.value })
            }
          >
            {skillTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.label_name}
              </MenuItem>
            ))}
          </TextField>
          <Box textAlign="right" mt={2}>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleFinish}>
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
            <strong>{skillToDelete?.skill_name || ""}</strong>? This action cannot
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

export default SkillsByCategoryView;
