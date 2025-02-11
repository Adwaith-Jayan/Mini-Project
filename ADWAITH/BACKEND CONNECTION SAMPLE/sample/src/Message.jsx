import * as React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Paper from "@mui/material/Paper";
import "./message.css";

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);

  return (
    <Grid2 container className="grid-container" spacing={2}>
      <Grid2 xs={12}>
        <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
          {[0, 1, 2].map((value) => (
            <Grid2 key={value}>
              <Paper className="paper-item" />
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
      <Grid2 xs={12}>
        <Paper className="paper-wrapper">
          <Grid2 container>
            <Grid2>
              {/* Add any additional content here */}
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
}
