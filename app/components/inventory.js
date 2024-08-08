"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  IconButton,
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
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import DeleteIcon from "@mui/icons-material/Delete";
import { firestore } from "@/firebase";

export default function Inventory({ setInventory }) {
  const [inventory, updateInventoryState] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

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

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%,-50%)",
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box
          width="500px"
          height="50px"
          bgcolor="#ADD8E6"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" color="#333">
            Inventory Items
          </Typography>
        </Box>

        <Stack width="500px" height="400px" spacing={2} overflow="auto">
          {inventory.map(({ name, quantity }, index) => (
            <Box key={name}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2 }}
              >
                <Typography variant="body1" color="#333" textAlign="center">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="body1" color="#333" textAlign="center">
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => addItem(name)}>
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => decrementItem(name)}
                  >
                    Decrement
                  </Button>
                </Stack>
                {/* <Stack direction="row" spacing={2}>
                  <IconButton color="primary" onClick={() => addItem(name)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => decrementItem(name)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => removeItem(name)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack> */}
              </Box>
              {index < inventory.length - 1 && <Divider variant="middle" />}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
