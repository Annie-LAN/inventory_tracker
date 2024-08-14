"use client";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "@/firebase";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API if needed.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // Redirect to the home page after successful sign-in
        router.push("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error(
          "Error signing in:",
          errorCode,
          errorMessage,
          email,
          credential
        );
      });
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
