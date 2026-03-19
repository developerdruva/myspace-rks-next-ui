"use client";
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import apiServices from "@/utils/service-calls/apiServices";
import { showApiStatusNotice } from "@/common/CommonFunction";
import { FaEdit } from "react-icons/fa";
import { MdAdd, MdDelete } from "react-icons/md";
import styles from "./pocprojectsview.module.css";

const PocProjectsView = ({ emailId }) => {
  const pocProjects1 =
    useSelector((state) => state.portfolioState?.pocProjects) || [];
  const [pocProjects, setPocProjects] = useState(pocProjects1 || []);
  const [viewMode, setViewMode] = useState("card");
  const [formVisible, setFormVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await apiServices.getPocProjects(emailId);
      if (res?.data?.pocProjects) {
        setPocProjects(res.data.pocProjects || []);
        dispatch({
          type: "PORTFOLIO_DETAILS",
          payload: { pocProjects: res.data.pocProjects || [] },
        });
      }
    } catch (err) {
      showApiStatusNotice(
        err.message || "Failed to fetch PoC projects",
        "error"
      );
    }
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormValues({});
    setFormVisible(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormValues(project);
    setFormVisible(true);
  };

  const handleDeleteDialogOpen = (project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setProjectToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    try {
      const res = await apiServices.deletePocProject(projectToDelete.sl_no);
      if (res?.data?.status === "success") {
        showApiStatusNotice(res.data.message, "success");
        fetchProjects();
      } else {
        showApiStatusNotice(res?.data?.message || "Delete failed", "error");
      }
    } catch (err) {
      showApiStatusNotice(err.message || "Delete failed", "error");
    } finally {
      handleDeleteDialogClose();
    }
  };

  const handleFormSubmit = async () => {
    const values = { ...formValues, email_id: emailId };
    let res;
    try {
      if (editingProject) {
        res = await apiServices.updatePocProject(editingProject.sl_no, values);
      } else {
        res = await apiServices.addPocProject(values);
      }
      if (res?.data?.status === "success") {
        showApiStatusNotice(res.data.message, "success");
        setFormVisible(false);
        fetchProjects();
      } else {
        showApiStatusNotice(res?.data?.message || "API Error", "error");
      }
    } catch (err) {
      showApiStatusNotice(err.message || "Submit failed", "error");
    }
  };

  useEffect(() => {
    // fetchProjects();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div>
          <Button
            variant={viewMode === "table" ? "contained" : "outlined"}
            onClick={() => setViewMode("table")}
            sx={{ mr: 1 }}
          >
            Table View
          </Button>
          <Button
            variant={viewMode === "card" ? "contained" : "outlined"}
            onClick={() => setViewMode("card")}
          >
            Card View
          </Button>
        </div>
        <div>
          <Button variant="contained" startIcon={<MdAdd />} onClick={handleAdd}>
            Add PoC Project
          </Button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Tech Stack</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pocProjects.map((row) => (
                <TableRow key={row.sl_no}>
                  <TableCell>
                    <Tooltip title={row.title}>{row.title}</Tooltip>
                  </TableCell>
                  <TableCell>
                    <Chip color="primary">{row.project_type}</Chip>
                  </TableCell>
                  <TableCell>{row.title_subdesc}</TableCell>
                  <TableCell>
                    <a href={row.project_url} target="_blank" rel="noreferrer">
                      Visit
                    </a>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row)}>
                      <FaEdit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteDialogOpen(row)}>
                      <MdDelete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {pocProjects.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.sl_no}>
              <Card className={styles.pocCard}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.img_url}
                  alt="PoC Preview"
                  sx={{ objectFit: "contain", cursor: "pointer" }}
                  onClick={() => setPreviewUrl(item.img_url)}
                />
                <CardContent>
                  <Typography variant="subtitle1" noWrap>
                    <Tooltip title={item.title}>{item.title}</Tooltip>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Tech:</strong> {item.title_subdesc}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    <strong>Desc:</strong> {item.project_desc}
                  </Typography>
                  <a
                    href={item.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12 }}
                  >
                    Visit Project →
                  </a>
                  <div className={styles.actionsRow}>
                    <IconButton onClick={() => handleEdit(item)}>
                      <FaEdit fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteDialogOpen(item)}>
                      <MdDelete fontSize="small" color="error" />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Modal */}
      <Dialog
        open={formVisible}
        onClose={() => setFormVisible(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingProject ? "Edit Project" : "Add Project"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="normal"
            fullWidth
            label="Project Title"
            value={formValues.title || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            label="Image URL"
            value={formValues.img_url || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, img_url: e.target.value })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            label="Project URL"
            value={formValues.project_url || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, project_url: e.target.value })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            label="Project Type"
            value={formValues.project_type || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, project_type: e.target.value })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            label="Tech Stack"
            value={formValues.title_subdesc || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, title_subdesc: e.target.value })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={formValues.project_desc || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, project_desc: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormVisible(false)}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Modal */}
      <Dialog
        open={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        maxWidth="md"
      >
        <CardMedia
          component="img"
          image={previewUrl}
          alt="Preview"
          sx={{ maxHeight: 600, objectFit: "contain", padding: 2 }}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{projectToDelete?.title}</strong>? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PocProjectsView;
