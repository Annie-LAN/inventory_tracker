"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";

export default function Inventory({ setInventory }) {
  const [inventory, updateInventoryState] = useState([]);
  const [itemName, setItemName] = useState("");
  const [addQuantity, setAddQuantity] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    updateInventoryState(inventoryList);
    setInventory(inventoryList);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    await deleteDoc(docRef);
    await updateInventory();
  };

  const decrementItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const addItem = async (item, quantity) => {
    if (isNaN(quantity) || quantity <= 0) {
      setSnackbarOpen(true);
      setAddQuantity("");
      return;
    }

    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    const newQuantity = Number(quantity);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + newQuantity });
    } else {
      await setDoc(docRef, { quantity: newQuantity });
    }
    await updateInventory();
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box>
      {/* Inventory Items */}
      <Card sx={{ width: "600px", my: 2 }}>
        <CardContent>
          <Box
            height="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h5" color="#333">
              Inventory Items
            </Typography>
          </Box>
          <Stack spacing={2} maxHeight="500px" overflow="auto">
            {inventory.map(({ name, quantity }, index) => (
              <Box key={name}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ px: 4 }}
                >
                  <Typography variant="body1" color="#333" textAlign="center">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography variant="body1" color="#333" textAlign="center">
                    {quantity}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => addItem(name, 1)}
                    >
                      Increment
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => decrementItem(name)}
                    >
                      Decrement
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => removeItem(name)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
                {index < inventory.length - 1 && <Divider variant="middle" />}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Add item */}
      <Card sx={{ width: "500px" }}>
        <CardContent>
          <Typography variant="h5" color="#333">
            Add Item
          </Typography>
          <Box display="flex" flexDirection="column">
            <TextField
              required
              id="outlined-required"
              label="Name"
              margin="dense"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Quantity"
              margin="dense"
              value={addQuantity}
              onChange={(e) => setAddQuantity(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName, addQuantity);
                setItemName("");
                setAddQuantity("");
              }}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar for errors */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {"Invalid Input"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
