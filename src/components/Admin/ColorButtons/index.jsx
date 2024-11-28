import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListIcon from "@mui/icons-material/List";
import Stack from "@mui/material/Stack";

export default function IconLabelAddButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<AddIcon />} size="medium">
        Thêm
      </Button>
    </Stack>
  );
}