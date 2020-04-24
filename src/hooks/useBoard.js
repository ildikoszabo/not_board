import { useState } from "react";
import { PIECES } from "../pieces";

export const useBoard = prop => {
  const [board, setBoard] = useState(createInitBoard());

  function addPieceToBoard(pieceMatrix, x, y) {
    let pieceWidth = pieceMatrix[0].length;
    let pieceHeigth = pieceMatrix.length;
    let boardClone = board.slice(0);

    if (!hasOverlap(pieceMatrix, x, y)) {
      //let row=x, column = y;
      for (let i = 0; i < pieceWidth; i++) {     
       
        for (let j = 0; j < pieceHeigth; j++) {

            if (pieceMatrix[i][j] != 0){
                if (boardClone[x+i][y+j] == 0 ) {
                    boardClone[x+i][y+j] = pieceMatrix[i][j];
                  }
                  //column = column + 1;     
            }
                  
        }
        //row = row +1;
        //column = y;
      }

      setBoard(boardClone);
    } else {
      alert("Invalid position");
    }
  }

  function hasOverlap(pieceMatrix, x, y) {
    let pieceWidth = pieceMatrix[0].length;
    let pieceHeigth = pieceMatrix.length;
    let boardClone = board.slice(0);

    for (let i = 0; i < pieceWidth; i++) {
      for (let j = 0; j < pieceHeigth; j++) {
          if (pieceMatrix[i][j]!=0){
            if (boardClone[x + i][y + j] != 0) {
                return true;
              }
          }
       
      }
    }

    return false;
  }

  function removePieceFromBoard(x,y,pieceKey){
    let pieceMatrix = PIECES[pieceKey].shape;
    let pieceWidth = pieceMatrix[0].length;
    let pieceHeigth = pieceMatrix.length;
    let boardClone = board.slice(0);

    for (let i = 0; i < pieceWidth; i++) {
      for (let j = 0; j < pieceHeigth; j++) {
          if (pieceMatrix[i][j] != 0){
              if (boardClone[x + i][y + j] == pieceKey ) {
                  boardClone[x + i][y + j] = 0;
                }
          }       
      }
    }
  }

  return [board, addPieceToBoard, removePieceFromBoard];
};

function createInitBoard() {
  var arr = [];

  for (var i = 0; i < 10; i++) {
    arr[i] = [];
    for (var j = 0; j < 10; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
