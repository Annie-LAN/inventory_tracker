"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import InventoryItems from "./inventoryItems";
import AddItem from "./addItem";
import RecipeRecommendations from "./RecipeRecommendations";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";
import SignOut from "./signOut";

export default function Inventory() {
  const [inventory, updateInventoryState] = useState([]);

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
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      width="100%"
      padding={4}
    >
      {/* Left side: Inventory Items */}
      <InventoryItems inventory={inventory} updateInventory={updateInventory} />

      <Box display="flex" flexDirection="column" marginLeft={4}>
        {/* Top Right */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Add Item  */}
          <AddItem updateInventory={updateInventory} />

          {/* Sign Out Button */}
          <SignOut />
        </Box>

        {/* Bottom Right: Recipe Generator */}
        <RecipeRecommendations inventory={inventory} />
      </Box>
    </Box>
  );
}
