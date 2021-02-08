import React from "react";
import { useState, useCallback } from "react";
import { PIECES_LIGHT, PIECES_DARK } from "../pieces";

export const usePieces = () => {
  const [selectedPieceName, setSelectedPieceName] = useState("cathedral");
  const [availablePieces, setAvailablePieces] = useState(null);
  const [pieces, setPieces] = useState(null);

  const setPiecesColor = useCallback((pieceColor) => {
    if (pieceColor == "light") {
      setAvailablePieces(PIECES_LIGHT);
      setPieces(PIECES_LIGHT);
    } else {
      setAvailablePieces(PIECES_DARK);
      setPieces(PIECES_DARK);
    }
  });

  const handlePieceSelection = useCallback((event) => {
    setSelectedPieceName(event.target.value);
  });

  const rotatePiece = useCallback((pieceName, dir) => {
    let selectedKey = getSelectedPieceKey(pieceName);
    let selectedValue = availablePieces[selectedKey];

    // Make the rows to become cols (transpose)
    const mtrx = selectedValue.shape.map((_, index) =>
      selectedValue.shape.map((column) => column[index])
    );
    // Reverse each row to get a rotaded matrix
    if (dir > 0) {
      selectedValue.shape = mtrx.map((row) => row.reverse());
    } else {
      selectedValue.shape = mtrx.reverse();
    }

    setAvailablePieces({ ...availablePieces, [selectedKey]: selectedValue });
  }, []);

  const getSelectedPieceKey = (pieceName) => {
    let selectedKey = Object.keys(availablePieces).find((key) => {
      if (availablePieces[key].name == pieceName) {
        return availablePieces[key];
      }
    });
    return selectedKey;
  };

  const addPieceToPieces = (pieceKey) => {
    let newPiece;
    if (availablePieces[pieceKey]) {
      newPiece = availablePieces[pieceKey];
      newPiece.nr = newPiece.nr + 1;
    } else {
      newPiece = pieces[pieceKey];
      newPiece.nr = 1;
    }

    setAvailablePieces({
      ...availablePieces,
      [pieceKey]: newPiece,
    });
  };

  const removePieceFromPieces = (selectedKey) => {
    let newPiece = availablePieces[selectedKey];
    newPiece.nr = newPiece.nr - 1;
    if (newPiece.nr == 0) {
      let nextSelectedPieceKey = Object.keys(availablePieces).find(
        (key) => availablePieces[key].nr > 0
      );

      if (nextSelectedPieceKey) {
        setSelectedPieceName(availablePieces[nextSelectedPieceKey].name);
      }
    }
    setAvailablePieces({ ...availablePieces, [selectedKey]: newPiece });
  };

  const handleCardSelection = (selectedKey) => {
    setSelectedPieceName(pieces[selectedKey].name);
  };

  return [
    selectedPieceName,
    availablePieces,
    handlePieceSelection,
    rotatePiece,
    getSelectedPieceKey,
    removePieceFromPieces,
    addPieceToPieces,
    handleCardSelection,
    setPiecesColor,
  ];
};
