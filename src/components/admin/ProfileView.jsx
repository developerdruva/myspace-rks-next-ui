"use client";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import {
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlineFileDownload,
  MdEdit,
} from "react-icons/md";
import BasicDetails from "../in-taking/BasicDetails";

const ProfileView = ({ profile, workedCompanies }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          padding: "2rem 1.5rem",
          height: "inherit",
        }}
      >
        <Grid container spacing={4}>
          {/* Avatar + Info Block */}
          <Grid item xs={12} md={4} textAlign="center">
            <Avatar
              src={profile.profile_pic}
              sx={{
                width: 150,
                height: 150,
                margin: "0 auto",
                border: "3px solid #1976d2",
              }}
            />
            <Typography variant="h5" mt={2}>
              {profile.first_name} {profile.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.person_designation}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* Download Resume */}
            <Button
              variant="contained"
              startIcon={<MdOutlineFileDownload />}
              href={profile.resume}
              target="_blank"
              fullWidth
            >
              Download Resume
            </Button>

            {/* Edit Button */}
            <Button
              variant="outlined"
              startIcon={<MdEdit />}
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>

          {/* Details Table Block */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {[
                { label: "Role", value: profile.roleof_person },
                {
                  label: "Email",
                  value: (
                    <a href={`mailto:${profile.email_id}`}>
                      <MdOutlineMailOutline style={{ marginRight: 6 }} />
                      {profile.email_id}
                    </a>
                  ),
                },
                {
                  label: "Mobile",
                  value: (
                    <a href={`tel:${profile.mobile_no}`}>
                      <MdOutlinePhone style={{ marginRight: 6 }} />
                      {profile.mobile_no}
                    </a>
                  ),
                },
                {
                  label: "Joined At",
                  value: new Date(profile.created_at).toLocaleDateString(),
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    borderTop: index !== 0 ? "1px solid #ddd" : "none",
                    padding: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 150,
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item.label}
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {item.value}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* MUI Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="edit-profile-modal"
      >
        <Box
          sx={{
            width: { xs: "90%", md: 800 },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            mx: "auto",
            my: "5%",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Edit Profile Details
          </Typography>
          <BasicDetails personDetails={profile} />
        </Box>
      </Modal>
    </>
  );
};

export default ProfileView;
