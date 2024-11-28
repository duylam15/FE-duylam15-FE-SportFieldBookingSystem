import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

export default function DeleteBtn() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        color="error" 
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </Stack>
  );
}
