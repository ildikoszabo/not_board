import React from "react";
import { Radio } from "@material-ui/core";
import { Controls } from "./Controls";

export const PiecesToPlay = ({
  selectedPieceName,
  availablePieces,
  handlePieceSelection,
  rotatePiece,
  handleCardSelection,
  pieceColor,
}) => {
  return (
    <div className="table table-cell">
      {Object.keys(availablePieces).map((key) => {
        return availablePieces[key].nr > 0 ? (
          <div
            className={
              selectedPieceName === availablePieces[key].name
                ? "table-cell card card-selected"
                : "table-cell card"
            }
            onClick={() => {
              handleCardSelection(key);
            }}
          >
            <div className="card-header">
              <div>
                <Radio
                  checked={selectedPieceName === availablePieces[key].name}
                  onChange={handlePieceSelection}
                  value={availablePieces[key].name}
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                  color="primary"
                  disabled={availablePieces[key].nr == 0}
                />
              </div>
              <div style={{ padding: "5px" }}>
                <span>{availablePieces[key].name} </span>
              </div>
              <div style={{ padding: "10px" }}>
                <span>Count: {availablePieces[key].nr}</span>
              </div>
            </div>
            <div
              className="table"
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
              }}
            >
              {mapArrayToGrid(
                availablePieces[key].shape,
                `table-cell piece-cell-${pieceColor}`,
                "table-not-cell"
              )}
            </div>
            <div className="card-controls">
              <Controls
                onClick={(dir) => rotatePiece(selectedPieceName, dir)}
              />
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

function mapArrayToGrid(array, className, classNotACell) {
  var grid = array.map(function (val, i) {
    return val.map(function (v, index) {
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
