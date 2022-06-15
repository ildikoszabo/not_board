import React from "react";
import "./App.css";
import { PiecesToPlay } from "./components/Pieces";
import { Board } from "./components/Board";
import { useBoard } from "./hooks/useBoard";
import { usePieces } from "./hooks/usePieces";

function App() {
  const [board, addPieceToBoard, removePieceFromBoard] = useBoard();
  const [
    selectedPieceName,
    availablePieces,
    handlePieceSelection,
    rotatePiece,
    getSelectedPieceKey,
    removePieceFromPieces,
    addPieceToPieces,
    handleCardSelection,
  ] = usePieces();

  return (
    <div className="App">
      <div className="table">
        <div
          style={{ width: "100%", height: "20%" }}
          className="table-cell App-header"
        >
          <h1>Cathedral</h1>
        </div>

        <div style={{ width: "100%", height: "40%" }} className="table ">
          <PiecesToPlay
            selectedPieceName={selectedPieceName}
            availablePieces={availablePieces}
            handlePieceSelection={handlePieceSelection}
            rotatePiece={rotatePiece}
            handleCardSelection={handleCardSelection}
          />
        </div>

        <div className="table-cell " style={{ width: "100%", height: "40%" }}>
          <div className="table board" style={{ width: "100%" }}>
            <Board
              board={board}
              onClickEmptyCell={(x, y) => {
                let key = getSelectedPieceKey(selectedPieceName);
                if (addPieceToBoard(availablePieces[key].shape, x, y)) {
                  removePieceFromPieces(key);
                }
              }}
              onClickOccupiedCell={(x, y, selectedKey) => {
                removePieceFromBoard(x, y, selectedKey);
                addPieceToPieces(selectedKey);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
