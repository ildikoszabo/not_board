import React from "react";
import "./../App.css";
import { useBoard } from "../hooks/useBoard";
import { getThemeProps } from "@material-ui/styles";

export const Board = props => {
  const { board } = props;

  var grid = board.map(function(val, i) {
    return val.map(function(v, j) {
      return v == 0 ? (
        <div
          style={{ width: "10%" }}
          className="table-cell board-cell"
          onClick={() => props.onClickEmptyCell(i, j)}
        ></div>
      ) : (
        <div style={{ width: "10%" }} className="table-cell piece-cell"  onClick={() => props.onClickOccupiedCell(i, j, v)}></div>
      );
    });
  });

  return grid;
};
