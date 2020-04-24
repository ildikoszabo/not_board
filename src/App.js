import React from "react";
import "./App.css";
import { PiecesToPlay } from "./components/Pieces";
import { Board } from "./components/Board";
import { useBoard } from "./hooks/useBoard";
import { usePieces } from "./hooks/usePieces";
import { get } from "http";

function App() {
  const [board, addPieceToBoard, removePieceFromBoard] = useBoard();
  const [
    selectedPieceName,
    setSelectedPieceName,
    availablePieces,
    setAvailablePieces,
    handlePieceSelection,
    rotatePiece,
    getSelectedPieceKey,
    PIECES
  ] = usePieces();

  return (
    <div className="App">
      <div class="container">
        <div>
          <PiecesToPlay
            selectedPieceName={selectedPieceName}
            availablePieces={availablePieces}
            handlePieceSelection={handlePieceSelection}
            rotatePiece={rotatePiece}
          />
        </div>
        <div className="table" style={{ width: "100%", height: "50%" }}>
          <Board
            board={board}
            onClickEmptyCell={(x, y) => {
              let key = getSelectedPieceKey(selectedPieceName);
              addPieceToBoard(availablePieces[key].shape, x, y);

              //maybe this should be a pieces function
              let newPiece = availablePieces[key];
              newPiece.nr = newPiece.nr-1; 
              setAvailablePieces({...availablePieces, [key] : newPiece});
            }}
            onClickOccupiedCell={(x,y, selectedKey) => {
              removePieceFromBoard(x,y, selectedKey);
              
              //maybe this should be a pieces function
              let newPiece;
              if (availablePieces[selectedKey])
              {
                newPiece = availablePieces[selectedKey];
                newPiece.nr = newPiece.nr+1; 
              }else{
               newPiece = PIECES[selectedKey];
               newPiece.nr = 1;
              }

              setAvailablePieces({...availablePieces, [selectedKey] : newPiece});
        
              
            }

            }
          />
        </div>
        <div>Three</div>
      </div>
    </div>
  );
}

export default App;
