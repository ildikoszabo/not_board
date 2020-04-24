import React from "react";
import { useState, useCallback } from "react";
import { PIECES } from "../pieces";

export const usePieces = () => {
  const [selectedPieceName, setSelectedPieceName] = useState("cathedral");
  const [availablePieces, setAvailablePieces] = useState(PIECES);

  const handlePieceSelection = useCallback(event => {
    setSelectedPieceName(event.target.value);
  });

  const rotatePiece = useCallback((pieceName,dir) => {
    let selectedKey = getSelectedPieceKey(pieceName);
    let selectedValue = availablePieces[selectedKey];

    // Make the rows to become cols (transpose)
    const mtrx = selectedValue.shape.map((_, index) =>
      selectedValue.shape.map(column => column[index])
    );
    // Reverse each row to get a rotaded matrix
    if (dir > 0) {
      selectedValue.shape = mtrx.map(row => row.reverse());
    } else {
      selectedValue.shape = mtrx.reverse();
    }

    setAvailablePieces({ ...availablePieces, [selectedKey]: selectedValue });
  }, []);

  
  const getSelectedPieceKey = (pieceName) =>{
    let selectedKey = Object.keys(availablePieces).find(key => {
      if (availablePieces[key].name == pieceName) {
        return availablePieces[key];
      }
    });
    return selectedKey;   
  }

  return [
    selectedPieceName,
    setSelectedPieceName,
    availablePieces,
    setAvailablePieces,
    handlePieceSelection,
    rotatePiece,
    getSelectedPieceKey,
    PIECES
  ];
};
