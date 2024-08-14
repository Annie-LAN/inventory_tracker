"use client";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = () => {
    // Implement your sign-in logic
    router.push("/home"); // Redirect to the home page after sign-in
  };

  return (
    <Card sx={{ width: "300px", margin: "auto", marginTop: "10%" }}>
      <CardContent>
        <Box alignItems="center" justifyContent="center" paddingBottom={2}>
          <Typography variant="h3" color="#333" textAlign="center">
            Inventory Tracker
          </Typography>
        </Box>
        <Button variant="contained" fullWidth onClick={handleSignIn}>
          Sign In
        </Button>
      </CardContent>
    </Card>
  );
}
