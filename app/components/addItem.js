"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore, auth } from "@/firebase";

export default function AddItem({ updateInventory }) {
  const [itemName, setItemName] = useState("");
  const [addQuantity, setAddQuantity] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const user = auth.currentUser;

  const addItem = async (item, quantity) => {
    if (isNaN(quantity) || quantity <= 0) {
      setSnackbarOpen(true);
      setAddQuantity("");
      return;
    }

    if (user) {
      const userId = user.uid;
      const docRef = doc(
        collection(firestore, `users/${userId}/inventory`),
        item
      );
      const docSnap = await getDoc(docRef);
      const newQuantity = Number(quantity);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + newQuantity });
      } else {
        await setDoc(docRef, { quantity: newQuantity });
      }
      await updateInventory();
      setItemName("");
      setAddQuantity("");
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Card sx={{ width: "300px" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h5" color="#333">
            Add Item
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" paddingX="6%">
          <TextField
            required
            id="outlined-required"
            label="Name"
            margin="dense"
            size="small"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Quantity"
            margin="dense"
            size="small"
            value={addQuantity}
            onChange={(e) => setAddQuantity(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => addItem(itemName, addQuantity)}
          >
            Add
          </Button>
        </Box>
      </CardContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {"Invalid Input"}
        </Alert>
      </Snackbar>
    </Card>
  );
}
