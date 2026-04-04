"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { getFieldsByCategory } from "@/common/CommonFunction";
import { CATEGORY_CONFIG } from "./CATEGORY_CONFIG";
import apiServices from "@/utils/service-calls/apiServices";
import { useSession } from "next-auth/react";
interface DynamicFormProps {
  category: any;
  onClose?: () => void;
  editData?: any;
  onSuccess?: () => void;
  workspaceId?: string;
}

const DynamicForm = ({
  category,
  onClose,
  editData,
  onSuccess,
  workspaceId,
}: DynamicFormProps) => {
  const [selectedType, setSelectedType] = useState(editData?.type || "");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const fields = getFieldsByCategory(category);

  const { data: session } = useSession();
  const getGridProps = (field: any) => {
    if (field.type === "textarea") {
      return { xs: 12 };
    }

    return { xs: 12, sm: 6 };
  };

  const commonFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1.5,
      backgroundColor: "background.paper",
    },
  };

  const initialValues = fields.reduce((acc: any, field: any) => {
    acc[field.name] = editData?.[field.name] ?? "";
    return acc;
  }, {});

  // Sync type selector when switching between edit records
  useEffect(() => {
    setSelectedType(editData?.type || "");
  }, [editData]);

  const categoryTypes =
    CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]?.types || [];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values, { resetForm }) => {
        setFormError("");
        setIsSaving(true);
        try {
          const payload = {
            ...values,
            // Required NOT NULL fields — always send with "unknown" fallback
            user_id: session?.user?.email || "unknown",
            category: category || "unknown",
            type: selectedType || "unknown",
            document_particular: values.document_particular || "unknown",
            ...(workspaceId ? { workspace_id: workspaceId } : {}),
          };
          if (editData?.id) {
            await apiServices.updateDocumentParticular(editData.id, payload);
          } else {
            await apiServices.createDocumentParticular(payload);
          }
          resetForm();
          setSelectedType("");
          onSuccess?.();
        } catch (e: any) {
          setFormError(
            e?.response?.data?.message ||
              "An error occurred. Please try again.",
          );
        } finally {
          setIsSaving(false);
        }
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <Stack spacing={3}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <Grid container spacing={2}>
              {/* Type Selector for Category */}
              <Grid key="type-selector" size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="type"
                  label={`${CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]?.label || category} Type`}
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  sx={commonFieldSx}
                  disabled={!!editData?.id}
                >
                  {categoryTypes.map((type: string) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Dynamic Fields */}
              {fields.map((field: any) => (
                <Grid key={field.name} size={getGridProps(field)}>
                  {field.type === "text" ||
                  field.type === "number" ||
                  field.type === "date" ? (
                    <TextField
                      fullWidth
                      size="small"
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      sx={commonFieldSx}
                      InputLabelProps={
                        field.type === "date" ? { shrink: true } : {}
                      }
                    />
                  ) : field.type === "select" ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      sx={commonFieldSx}
                    >
                      {field.options?.map((opt: string) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : field.type === "textarea" ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      sx={commonFieldSx}
                    />
                  ) : null}
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 140 }}
                disabled={isSaving}
                startIcon={
                  isSaving ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : undefined
                }
              >
                {editData?.id ? "Update" : "Submit"}
              </Button>
              {onClose && (
                <Button
                  variant="outlined"
                  sx={{ minWidth: 140 }}
                  onClick={onClose}
                  disabled={isSaving}
                >
                  Close
                </Button>
              )}
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
