"use client";
import { useEffect, useState } from "react";
import apiServices from "@/utils/service-calls/apiServices";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { FiGrid, FiList } from "react-icons/fi";
import ParticularsTable from "./ParticularsTable";
import DynamicForm from "@/forms/DynamicForm/DynamicForm";
import DashboardView from "./DashboardView";

const dynamicFormCategories = [
  "BANKING",
  "LOANS",
  "INSURANCE",
  "DOCUMENTS",
  "INVESTMENTS",
  "ASSETS",
  "SUBSCRIPTIONS",
];

export default function ParticularsPage() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const workspace_id = "0d4f53ac-c506-4121-8fe0-cdcddf4690d4";
  const [selectedCategory, setSelectedCategory] = useState("INSURANCE");
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
    setSelectedCategory(item?.category || "INSURANCE");
    setShowForm(true);
  };

  const handleDelete = async (id, user_id) => {
    try {
      setError("");
      await apiServices.deleteDocumentParticular(id, user_id);
      fetchData();
    } catch (e) {
      console.log(e);
      setError("Failed to delete particular");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const fetchData = async () => {
    try {
      setError("");
      setIsLoading(true);
      const res = await apiServices.getDocumentParticulars();
      setData(res?.data?.data || []);
    } catch (e) {
      console.log(e);
      setError("Failed to load particulars");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Stack spacing={2.5}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          gap={1.5}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Particulars
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage recurring and one-time entries from one place.
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            sx={{ display: activeTab === 1 ? "inline-flex" : "none" }}
          >
            + Add Particular
          </Button>
        </Stack>

        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                minHeight: 60,
                fontWeight: 700,
                textTransform: "none",
                gap: 1,
              },
            }}
          >
            <Tab
              icon={<FiGrid size={16} />}
              iconPosition="start"
              label="Dashboard"
            />
            <Tab
              icon={<FiList size={16} />}
              iconPosition="start"
              label="List View"
            />
          </Tabs>
        </Paper>

        {activeTab === 1 && error && <Alert severity="error">{error}</Alert>}

        {activeTab === 0 ? (
          <DashboardView />
        ) : isLoading ? (
          <Box sx={{ py: 8, display: "grid", placeItems: "center" }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <ParticularsTable
            rows={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Stack>

      {showForm && (
        <Modal open onClose={handleCloseForm} closeAfterTransition>
          <Box
            sx={{
              minHeight: "100vh",
              display: "grid",
              placeItems: "center",
              p: 2,
            }}
          >
            <Paper
              sx={{
                width: "100%",
                maxWidth: 960,
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
              }}
            >
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {editingItem ? "Edit Particular" : "New Particular"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose a category to load the relevant form fields.
                  </Typography>
                </Box>

                <FormControl
                  size="small"
                  sx={{
                    width: { xs: "100%", sm: 240 },
                    alignSelf: "flex-start",
                  }}
                  disabled={!!editingItem}
                >
                  <InputLabel id="dynamic-form-category-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="dynamic-form-category-label"
                    value={selectedCategory}
                    label="Category"
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                  >
                    {dynamicFormCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <DynamicForm
                  category={selectedCategory}
                  editData={editingItem}
                  workspaceId={workspace_id}
                  onClose={handleCloseForm}
                  onSuccess={() => {
                    handleCloseForm();
                    fetchData();
                  }}
                />
              </Stack>
            </Paper>
          </Box>
        </Modal>
      )}
    </Container>
  );
}
