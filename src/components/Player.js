import React, { useState } from "react";
import "./../App.css";
import { useBoard } from "../hooks/useBoard";
import { getThemeProps } from "@material-ui/styles";
import { usePieces } from "../hooks/usePieces";
import { PiecesToPlay } from "../components/Pieces";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const Player = (props) => {
  const { createPlayer } = props;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    createPlayer(name, props.pieceColor);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add player
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add player</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To start playing enter your name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Player name"
            type="input"
            fullWidth
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
