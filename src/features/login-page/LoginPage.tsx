import { Button, Container, Typography, Box, Divider } from "@mui/material";
import { FaGoogle, FaGithub, FaMicrosoft, FaFacebook } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";

const LoginPage = () => {
  const handleSSOLogin = (provider: any) => null;
  const { data: session } = useSession();

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Choose your preferred SSO provider to continue
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<FaGoogle />}
          onClick={() => signIn("google", { callbackUrl: "/myspace" })}
          sx={{ justifyContent: "flex-start", py: 1.5 }}
        >
          Continue with Google
        </Button>

        <Button
          variant="outlined"
          startIcon={<FaGithub />}
          onClick={() => signIn("github", { callbackUrl: "/myspace" })}
          sx={{ justifyContent: "flex-start", py: 1.5 }}
        >
          Continue with GitHub
        </Button>

        <Button
          variant="outlined"
          startIcon={<FaMicrosoft />}
          onClick={() => handleSSOLogin("Microsoft")}
          sx={{ justifyContent: "flex-start", py: 1.5 }}
        >
          Continue with Microsoft.
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="body2" color="text.secondary">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Typography>
    </Container>
  );
};

export default LoginPage;
