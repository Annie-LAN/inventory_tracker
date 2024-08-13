import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import * as React from "react";

export default function SignOut() {
  return (
    <Card sx={{ width: "250px" }}>
      <CardContent>
        <Box alignItems="center" justifyContent="center" paddingBottom={2}>
          <Typography variant="h4" color="#333">
            Inventory Tracker
          </Typography>
        </Box>
        <Button variant="contained">Sign Out</Button>
      </CardContent>
    </Card>
  );
}
