import { useState } from "react";
import { PIECES } from "../pieces";

export const useBoard = (prop) => {
  const [board, setBoard] = useState(createInitBoard());

  function addPieceToBoard(pieceMatrix, x, y) {
    let pieceWidth = pieceMatrix[0].length;
    let pieceHeigth = pieceMatrix.length;
    let boardClone = board.slice(0);

    /* move me somewhere else*/
    let shift = 0;
    let row = 0;
    while (pieceMatrix[row][shift] == 0) {
      shift++;
      //no piece cell in this row, go the next one
      if (shift == pieceHeigth) {
        shift = 0;
        row++;
      }
    }
    /* move me somewhere else*/

    if (!hasOverlap(pieceMatrix, x, y)) {
      //let row=x, column = y;
      for (let i = 0; i < pieceHeigth; i++) {
        for (let j = 0; j < pieceWidth; j++) {
          /*console.log(
            "[" +
              i +
              "][0]: " +
              pieceMatrix[i][0] +
              pieceMatrix[i][1] +
              pieceMatrix[i][2] +
              pieceMatrix[i][3]
          );*/
          if (pieceMatrix[i][j] != 0) {
            if (boardClone[x + i - row][y + j - shift] == 0) {
              boardClone[x + i - row][y + j - shift] = pieceMatrix[i][j];
            }
            //column = column + 1;
          }
        }
        //row = row +1;
        //column = y;
      }

      setBoard(boardClone);
      return true;
    } else {
      alert("Invalid position");
      return false;
    }
  }

  function hasOverlap(pieceMatrix, x, y) {
    let pieceWidth = pieceMatrix[0].length;
    let pieceHeigth = pieceMatrix.length;
    let boardClone = board.slice(0);

    /* move me somewhere else*/
    let shift = 0;
    let row = 0;
    while (pieceMatrix[row][shift] == 0) {
      shift++;
      //no piece cell in this row, go the next one
      if (shift == pieceHeigth) {
        shift = 0;
        row++;
      }
    }
    /* move me somewhere else*/

    for (let i = 0; i < pieceHeigth; i++) {
      for (let j = 0; j < pieceWidth; j++) {
        if (pieceMatrix[i][j] != 0) {
          if (boardClone[x + i - row][y + j - shift] != 0) {
            return true;
          }
        }
      }
    }

    return false;
  }

  function removePieceFromBoard(x, y, pieceKey) {
    let pieceMatrix = PIECES[pieceKey].shape;
    let pieceWidth = pieceMatrix[0].length;
    let pieceHeigth = pieceMatrix.length;
    let boardClone = board.slice(0);

    for (let i = 0; i < pieceWidth; i++) {
      for (let j = 0; j < pieceHeigth; j++) {
        if (pieceMatrix[i][j] != 0) {
          if (boardClone[x + i][y + j] == pieceKey) {
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
