// app/components/RecipeRecommendations.js
import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

export default function RecipeRecommendations({ inventory }) {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inventory: inventory.map((item) => item.name) }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe("Error fetching recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4}>
      <Button variant="contained" onClick={getRecipe} disabled={loading}>
        {loading ? "Loading..." : "Get Recipe"}
      </Button>
      {recipe && (
        <Typography variant="h6" mt={2}>
          {recipe}
        </Typography>
      )}
    </Box>
  );
}
