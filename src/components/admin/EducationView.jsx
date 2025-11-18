"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { showApiStatusNotice } from "@/common/CommonFunction";
import apiServices from "@/utils/service-calls/apiServices";

const EducationView = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.portfolioState?.myStudies || []);
  const [formData, setFormData] = useState({
    study: "",
    study_intitute: "",
    study_seq: "",
    pass_percent: "",
    study_desc: "",
    university: "",
    study_location: "",
    stream: "",
  });
  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // New state for Delete Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const fetchEducationDetails = async (emailId) => {
    try {
      const res = await apiServices.getEducationDetails(emailId);
      if (res?.data?.status === "success") {
        dispatch({
          type: "PORTFOLIO_DETAILS",
          payload: { myStudies: res?.data?.education || [] },
        });
        setTableData(res?.data?.education || []);
      }
    } catch (error) {
      showApiStatusNotice(error?.message, "error");
    }
  };

  const handleDialogOpen = (record = null) => {
    setEditingRecord(record);
    setFormData(
      record || {
        study: "",
        study_intitute: "",
        study_seq: "",
        pass_percent: "",
        study_desc: "",
        university: "",
        study_location: "",
        stream: "",
      }
    );
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingRecord(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let apiRes;
      if (editingRecord) {
        apiRes = await apiServices.updateEducationDetail(
          editingRecord.sl_no,
          formData
        );
      } else {
        apiRes = await apiServices.addEducationDetail(formData);
      }
      if (apiRes?.data?.status === "success") {
        showApiStatusNotice(apiRes?.data?.message, "success");
        handleDialogClose();
        await fetchEducationDetails(formData.email_id);
      } else {
        showApiStatusNotice(apiRes?.data?.message || "API Error", "error");
      }
    } catch (error) {
      showApiStatusNotice(error?.message, "error");
    }
  };

  // Open Delete Dialog instead of window.confirm
  const handleDeleteDialogOpen = (record) => {
    setRecordToDelete(record);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!recordToDelete) return;
      const apiRes = await apiServices.deleteEducationDetail(recordToDelete.sl_no);
      if (apiRes?.data?.status === "success") {
        showApiStatusNotice(apiRes?.data?.message, "success");
        await fetchEducationDetails(recordToDelete.email_id);
      } else {
        showApiStatusNotice(apiRes?.data?.message || "API Error", "error");
      }
    } catch (error) {
      showApiStatusNotice(error?.message, "error");
    } finally {
      handleDeleteDialogClose();
    }
  };

  const filteredData = tableData.filter(
    (item) =>
      item.study.toLowerCase().includes(searchText.toLowerCase()) ||
      item.study_intitute.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search by study or institute"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          onClick={() => handleDialogOpen()}
        >
          Add Education
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Study</TableCell>
              <TableCell>Institute</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Pass % / CGPA</TableCell>
              <TableCell>University</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Stream</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((record) => (
              <Tooltip
                title={
                  <div
                    dangerouslySetInnerHTML={{ __html: record.study_desc }}
                    style={{ maxWidth: 400 }}
                  />
                }
                arrow
                key={record.sl_no}
              >
                <TableRow>
                  <TableCell>
                    <div dangerouslySetInnerHTML={{ __html: record.study }} />
                  </TableCell>
                  <TableCell>{record.study_intitute}</TableCell>
                  <TableCell>{record.study_seq}</TableCell>
                  <TableCell>{record.pass_percent}</TableCell>
                  <TableCell>{record.university || "N/A"}</TableCell>
                  <TableCell>{record.study_location || "N/A"}</TableCell>
                  <TableCell>{record.stream || "N/A"}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDialogOpen(record)}
                      color="primary"
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteDialogOpen(record)}
                      color="error"
                    >
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{editingRecord ? "Edit Education" : "Add Education"}</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Study"
              name="study"
              value={formData.study}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Institute"
              name="study_intitute"
              value={formData.study_intitute}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Sequence"
              name="study_seq"
              type="number"
              value={formData.study_seq}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Pass % / CGPA"
              name="pass_percent"
              value={formData.pass_percent}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="University"
              name="university"
              value={formData.university}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Location"
              name="study_location"
              value={formData.study_location}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Stream"
              name="stream"
              value={formData.stream}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Description (HTML Supported)"
              name="study_desc"
              value={formData.study_desc}
              onChange={handleFormChange}
              multiline
              rows={4}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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
            <strong>{recordToDelete?.study || ""}</strong> from your education
            records? This action cannot be undone.
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

export default EducationView;
