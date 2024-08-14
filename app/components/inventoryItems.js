"use client";
import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "@/firebase";

export default function InventoryItems({ inventory, updateInventory }) {
  const user = auth.currentUser;

  const removeItem = async (item) => {
    if (user) {
      const userId = user.uid;
      const docRef = doc(firestore, `users/${userId}/inventory`, item);
      await deleteDoc(docRef);
      await updateInventory();
    }
  };

  const decrementItem = async (item) => {
    if (user) {
      const userId = user.uid;
      const docRef = doc(firestore, `users/${userId}/inventory`, item);
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
    }
  };

  const incrementItem = async (item) => {
    if (user) {
      const userId = user.uid;
      const docRef = doc(firestore, `users/${userId}/inventory`, item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      }
      await updateInventory();
    }
  };

  return (
    <Card sx={{ width: "600px" }}>
      <CardContent>
        <Box
          height="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingBottom={2}
        >
          <Typography variant="h5" color="#333">
            Inventory Items
          </Typography>
        </Box>
        <Stack spacing={2}>
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
                    onClick={() => incrementItem(name)}
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
  );
}
