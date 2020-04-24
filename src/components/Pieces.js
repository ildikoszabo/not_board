import React from "react";
import { Radio } from "@material-ui/core";
import { Controls } from "./Controls";

export const PiecesToPlay = ({
  selectedPieceName,
  setSelectedPieceName,
  availablePieces,
  setAvailablePieces,
  handlePieceSelection,
  rotatePiece
}) => {
  return (
    <div>
      <div>
        <Controls onClick={dir => rotatePiece(selectedPieceName, dir)} />
      </div>
      {Object.keys(availablePieces).map(key => {
        return availablePieces[key].nr > 0 ? (
          <div>
            <Radio
              checked={selectedPieceName === availablePieces[key].name}
              onChange={handlePieceSelection}
              value={availablePieces[key].name}
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
              color="primary"
            />
            <span>{availablePieces[key].name} </span>
            <span>{availablePieces[key].nr}</span>
            <div className="table">
              {mapArrayToGrid(
                availablePieces[key].shape,
                "table-cell piece-cell",
                "table-not-cell"
              )}
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

function mapArrayToGrid(array, className, classNotACell) {
  var grid = array.map(function(val, i) {
    return val.map(function(v, index) {
      let d = 100 / array[i].length;
      return v == 0 ? (
        <div style={{ width: `${d}%` }} className={classNotACell}></div>
      ) : (
        <div style={{ width: `${d}%` }} className={className}></div>
      );
    });
  });
  return grid;
}
