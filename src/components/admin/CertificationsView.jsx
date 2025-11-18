"use client";
import { useState } from "react";
import {
  Card as MUICard,
  CardContent,
  CardActions,
  CardMedia,
  Button as MUIButton,
  Typography,
  Grid,
  Box,
  Modal as MUIModal,
  TextField,
  Select as MUISelect,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Tooltip as MUITooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Zoom,
  Button
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash, FaEye, FaTable, FaThLarge } from "react-icons/fa";
import apiServices from "@/utils/service-calls/apiServices";
import { showApiStatusNotice } from "@/common/CommonFunction";
import { useSelector } from "react-redux";

const CertificationsView = ({ emailId }) => {
  const certifications1 = useSelector(
    (state) => state.portfolioState?.certifications
  ) || [];
  const [certifications, setCertifications] = useState(certifications1 || []);
  const [viewMode, setViewMode] = useState("card");
  const [formVisible, setFormVisible] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({
    certify_name: "",
    certify_url: "",
    certify_type: "online",
    institute: "",
  });

  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [certToDelete, setCertToDelete] = useState(null);

  const fetchCertifications = async () => {
    try {
      const res = await apiServices.getCertifications(emailId);
      if (res?.data?.certifications) setCertifications(res.data.certifications);
    } catch (err) {
      showApiStatusNotice(err.message || "Failed to fetch certifications", "error");
    }
  };

  const handleAdd = () => {
    setEditingCert(null);
    setForm({
      certify_name: "",
      certify_url: "",
      certify_type: "online",
      institute: "",
    });
    setFormVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCert(record);
    setForm({
      certify_name: record.certify_name,
      certify_url: record.certify_url,
      certify_type: record.certify_type,
      institute: record.institute,
    });
    setFormVisible(true);
  };

  const handleDeleteDialogOpen = (record) => {
    setCertToDelete(record);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setCertToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!certToDelete) return;
    try {
      const res = await apiServices.deleteCertification(certToDelete.sl_no);
      if (res?.data?.status === "success") {
        showApiStatusNotice(res.data.message, "success");
        fetchCertifications();
      } else {
        showApiStatusNotice(res?.data?.message || "Delete failed", "error");
      }
    } catch (err) {
      showApiStatusNotice(err.message || "Delete failed", "error");
    } finally {
      handleDeleteDialogClose();
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    const values = { ...form, email_id: emailId };
    let res;
    if (editingCert) {
      res = await apiServices.updateCertification(editingCert.sl_no, values);
    } else {
      res = await apiServices.addCertification(values);
    }
    if (res?.data?.status === "success") {
      showApiStatusNotice(res.data.message, "success");
      setFormVisible(false);
      fetchCertifications();
    } else {
      showApiStatusNotice(res?.data?.message || "API Error", "error");
    }
  };

  return (
    <Box>
      {/* View mode & add button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <MUIButton
            variant={viewMode === "table" ? "contained" : "outlined"}
            onClick={() => setViewMode("table")}
            sx={{ mr: 1, minWidth: 120 }}
            startIcon={<FaTable />}
          >
            Table View
          </MUIButton>
          <MUIButton
            variant={viewMode === "card" ? "contained" : "outlined"}
            onClick={() => setViewMode("card")}
            sx={{ minWidth: 120 }}
            startIcon={<FaThLarge />}
          >
            Card View
          </MUIButton>
        </Box>
        <MUIButton variant="contained" startIcon={<FaPlus />} onClick={handleAdd}>
          Add Certification
        </MUIButton>
      </Box>

      {/* Table View */}
      {viewMode === "table" && (
        <Box sx={{ background: "#fff", borderRadius: 2, boxShadow: 1, p: 2, mb: 3 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
            <thead>
              <tr style={{ background: "#f5f7fa" }}>
                <th style={{ padding: 10, textAlign: "left" }}>Certificate</th>
                <th style={{ padding: 10, textAlign: "left" }}>Institute</th>
                <th style={{ padding: 10, textAlign: "left" }}>Type</th>
                <th style={{ padding: 10, textAlign: "left" }}>Image</th>
                <th style={{ padding: 10, textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((item) => (
                <tr key={item.sl_no} style={{ borderBottom: "1px solid #eee", verticalAlign: "middle" }}>
                  <td style={{ padding: 10 }}>{item.certify_name}</td>
                  <td style={{ padding: 10 }}>{item.institute}</td>
                  <td style={{ padding: 10 }}>
                    <Chip
                      label={item.certify_type}
                      color={item.certify_type === "online" ? "primary" : "success"}
                      size="small"
                    />
                  </td>
                  <td style={{ padding: 10 }}>
                    <IconButton onClick={() => setPreviewUrl(item.certify_url)}>
                      <FaEye />
                    </IconButton>
                  </td>
                  <td style={{ padding: 10 }}>
                    <IconButton onClick={() => handleEdit(item)}>
                      <FaEdit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteDialogOpen(item)}>
                      <FaTrash color="red" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <Grid container spacing={2}>
          {certifications.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.sl_no}>
              <MUICard sx={{ minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={item.certify_url}
                  alt="Certificate"
                  height="140"
                  sx={{ objectFit: "contain", cursor: "pointer", borderRadius: 2, background: "#f9f9f9", p: 1 }}
                  onClick={() => setPreviewUrl(item.certify_url)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <MUITooltip title={item.certify_name}>
                    <Typography variant="h6" noWrap sx={{ fontWeight: 600, color: "#1a237e" }}>
                      {item.certify_name.length > 35 ? item.certify_name.slice(0, 32) + "..." : item.certify_name}
                    </Typography>
                  </MUITooltip>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Institute:</strong> {item.institute}
                  </Typography>
                  <Chip label={item.certify_type} color={item.certify_type === "online" ? "primary" : "success"} size="small" sx={{ mt: 1 }} />
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteDialogOpen(item)}>
                    <FaTrash color="red" />
                  </IconButton>
                  <IconButton onClick={() => setPreviewUrl(item.certify_url)}>
                    <FaEye />
                  </IconButton>
                </CardActions>
              </MUICard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Modal */}
      <MUIModal open={formVisible} onClose={() => setFormVisible(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>{editingCert ? "Edit Certification" : "Add Certification"}</Typography>
          <form>
            <TextField label="Certification Name" name="certify_name" value={form.certify_name} onChange={(e) => setForm((prev) => ({ ...prev, certify_name: e.target.value }))} fullWidth required margin="normal" />
            <TextField label="Certificate URL" name="certify_url" value={form.certify_url} onChange={(e) => setForm((prev) => ({ ...prev, certify_url: e.target.value }))} fullWidth required margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <MUISelect name="certify_type" value={form.certify_type} onChange={(e) => setForm((prev) => ({ ...prev, certify_type: e.target.value }))} label="Type">
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="institute">Institute</MenuItem>
              </MUISelect>
            </FormControl>
            <TextField label="Institute" name="institute" value={form.institute} onChange={(e) => setForm((prev) => ({ ...prev, institute: e.target.value }))} fullWidth required margin="normal" />
            <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
              <MUIButton onClick={() => setFormVisible(false)} color="inherit">Cancel</MUIButton>
              <MUIButton variant="contained" onClick={handleFormSubmit}>{editingCert ? "Update" : "Add"}</MUIButton>
            </Box>
          </form>
        </Box>
      </MUIModal>

      {/* Preview Dialog */}
      <Dialog open={!!previewUrl} onClose={() => setPreviewUrl(null)} TransitionComponent={Zoom} transitionDuration={600} PaperProps={{ sx: { width: "80vw", maxWidth: "900px", borderRadius: 2 } }}>
        <Box>
          <img src={previewUrl} alt="Certificate" style={{ width: "100%", borderRadius: 8 }} />
        </Box>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{certToDelete?.certify_name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CertificationsView;
