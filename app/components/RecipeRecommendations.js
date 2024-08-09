import { useState } from "react";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";

export default function RecipeRecommendations({ inventory }) {
  const [recipe, setRecipe] = useState(null);
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
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe({
        name: "Error",
        ingredients: [],
        instructions: ["Failed to fetch recipe."],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ width: "600px", mt: 4 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" color="#333">
            Recipe Generator
          </Typography>
          <Box my={2} display="flex" justifyContent="center" width="100%">
            <Button variant="contained" onClick={getRecipe} disabled={loading}>
              {loading ? "Loading..." : "Generate from Inventory"}
            </Button>
          </Box>
          {recipe && (
            <Box mt={2} width="90%">
              <Typography variant="h6" color="#333">
                {recipe.name}
              </Typography>
              <Typography variant="body1" color="#333" mt={2}>
                Ingredients:
              </Typography>
              <Typography
                variant="body1"
                color="#333"
                sx={{ whiteSpace: "pre-wrap", marginBottom: 2 }}
              >
                {recipe.ingredients
                  .map((ingredient, index) => `- ${ingredient}\n`)
                  .join("")}
              </Typography>
              <Typography variant="body1" color="#333" mt={2}>
                Instructions:
              </Typography>
              <Typography
                variant="body1"
                color="#333"
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {recipe.instructions
                  .map((instruction, index) => `${index + 1}. ${instruction}\n`)
                  .join("")}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
