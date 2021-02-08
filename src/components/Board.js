import React from "react";
import "./../App.css";
import { useBoard } from "../hooks/useBoard";
import { getThemeProps } from "@material-ui/styles";

export const Board = (props) => {
  const { board } = props;

  var grid = board.map(function (val, i) {
    return val.map(function (v, j) {
      return v == 0 ? (
        <div
          style={{ width: "10%" }}
          className="board-cell"
          onClick={() => props.onClickEmptyCell(i, j)}
        ></div>
      ) : v.includes("1") ? (
        <div
          style={{ width: "10%" }}
          className={`board-not-cell piece-cell-light`}
          onClick={() => props.onClickOccupiedCell(i, j, v, "light")}
        ></div>
      ) : (
        <div
          style={{ width: "10%" }}
          className={`board-not-cell piece-cell-dark`}
          onClick={() => props.onClickOccupiedCell(i, j, v, "dark")}
        ></div>
      );
    });
  });

  return grid;
};
