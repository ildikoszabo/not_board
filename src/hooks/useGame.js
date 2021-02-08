import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { usePlayer } from "./usePlayer";
import { createId } from "../utils/utils";

export const useGame = (props) => {
  const [game, setGame] = useState({
    id: props.id,
    player1: null,
    player2: null,
    currentPlayer: null,
  });

  function setPlayer(nr, player) {
    let gameId = game.id == null ? createId("") : game.id;
    if (nr == 1) {
      setGame((game) => ({
        ...game,
        id: gameId,
        player1: player,
      }));
    } else if (nr == 2) {
      setGame((game) => ({
        ...game,
        id: gameId,
        player2: player,
      }));
    }
  }

  function setCurrentPlayer(newActivePlayer) {
    setGame((game) => ({ ...game, currentPlayer: newActivePlayer }));
  }

  return [game, setPlayer, setCurrentPlayer];
};
