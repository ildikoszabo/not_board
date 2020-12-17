import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { createId } from "../utils/utils";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    id: null,
    name: null,
  });

  function createPlayer(name) {
    setPlayer((player) => ({ ...player, id: createId(name), name: name }));
  }

  /*function setAsCurrentPlayer(newState) {
    setPlayer((player) => ({ ...player, isCurrentPlayer: newState }));
  }*/

  return [player, createPlayer];
};
