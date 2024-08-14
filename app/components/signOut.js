import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import * as React from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/"); // Redirect back to the sign-in page
      })
      .catch((error) => {
        // An error happened.
        console.log("Failed to sign out", error);
      });
  };

  return (
    <Card sx={{ width: "250px" }}>
      <CardContent>
        <Box alignItems="center" justifyContent="center" paddingBottom={2}>
          <Typography variant="h4" color="#333" textAlign="center">
            Inventory Tracker
          </Typography>
        </Box>
        <Button variant="contained" fullWidth onClick={handleSignOut}>
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
