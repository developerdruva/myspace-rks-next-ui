"use client";
import { useEffect, useState } from "react";
import ParticularForm from "./ParticularForm";
import apiServices from "@/utils/service-calls/apiServices";
import PaymentsModal from "./PaymentsModal";
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
  Typography,
} from "@mui/material";
import ParticularsTable from "./ParticularsTable";
import DynamicForm from "@/forms/DynamicForm/DynamicForm";

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
  const workspace_id = "0d4f53ac-c506-4121-8fe0-cdcddf4690d4";
  const [selected, setSelected] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("INSURANCE");

  const openPayment = (item) => {
    setSelected(item);
  };

  const fetchData = async () => {
    try {
      setError("");
      setIsLoading(true);
      const res = await apiServices.getParticulars(workspace_id);
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
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Stack spacing={2}>
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

          <Button variant="contained" onClick={() => setShowForm(true)}>
            + Add Particular
          </Button>
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}

        {isLoading ? (
          <Box sx={{ py: 8, display: "grid", placeItems: "center" }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <ParticularsTable rows={data} onMarkPaid={openPayment} />
        )}
      </Stack>

      {showForm && (
        <Modal open onClose={() => setShowForm(false)} closeAfterTransition>
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
                    Dynamic Particular Entry Form
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

                <DynamicForm category={selectedCategory} />
              </Stack>
            </Paper>
          </Box>
        </Modal>
      )}
      {selected && (
        <PaymentsModal
          particular={selected}
          onClose={() => setSelected(null)}
          onSuccess={() => {
            setSelected(null);
            fetchData();
          }}
        />
      )}
    </Container>
  );
}
