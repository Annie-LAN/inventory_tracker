// app/page.js
"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import Inventory from "./components/inventory";
import RecipeRecommendations from "./components/RecipeRecommendations";
import TestComponent from "./components/test";

export default function Home() {
  const [inventory, setInventory] = useState([]);

  return (
    <Box
      width="100vw"
      height="100vh"
      // display="flex"
      // flexDirection="column"
      // justifyContent="center"
      // alignItems="center"
      // gap={2}
    >
      <Inventory setInventory={setInventory} />
      {/* <TestComponent /> */}
      <RecipeRecommendations inventory={inventory} />
    </Box>
  );
}
