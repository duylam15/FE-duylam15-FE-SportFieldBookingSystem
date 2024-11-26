import * as React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit"; 
import Stack from "@mui/material/Stack";

import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export default function TimeBtn() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        color="primary" // You can use "primary" or another color
        startIcon={<EventAvailableIcon />} // Use the Edit icon here
      >
        Time rule
      </Button>
    </Stack>
  );
}