import React from "react";
import {  IconButton } from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwadIcon from "@material-ui/icons/ArrowForward";

export const Controls = props => {
  return (
    <div>
      <IconButton
        aria-label="back"
        onClick={() => {
          props.onClick(-1);
        }}
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="forward"
        onClick={() => {
          props.onClick(1);
        }}
      >
        <ArrowForwadIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};
