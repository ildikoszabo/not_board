import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { PiecesToPlay } from "../components/Pieces";
import { Board } from "../components/Board";
import { useBoard } from "../hooks/useBoard";
import { usePieces } from "../hooks/usePieces";
import { useGame } from "../hooks/useGame";
import { usePlayer } from "../hooks/usePlayer";
import { Player } from "../components/Player";

function Game(props) {
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

  const [game, setPlayer, setCurrentPlayer] = useGame({
    id: props.match.params.id,
    player: props.match.params.player,
  });
  const [player1, createPlayer1] = usePlayer();
  const [player2, createPlayer2] = usePlayer();

  const [loggedInPlayer, setLoggedInPlayer] = useState("");

  useEffect(() => {
    /*if (game.player2 == null) {
      //should come from network/localstorage
      createPlayer2("p2");
    }*/

    if (player1.id != null && player2.id != null) {
      setPlayer(1, player1);
      setPlayer(2, player2);
    }
  }, [player1, player2]);

  const changeCurrentPlayer = () => {
    if (game.currentPlayer === "player1") {
      setCurrentPlayer("player2");
    } else if (game.currentPlayer === "player2") {
      setCurrentPlayer("player1");
    }
  };

  return (
    <div className="App">
      {player1.id == null ? (
        <div>
          <h3>Create p1</h3>
          <Player createPlayer={createPlayer1} />
        </div>
      ) : player2.id == null ? (
        <div>
          <h3>Create p2</h3>
          <Player createPlayer={createPlayer2} />
        </div>
      ) : game.player1 == null && game.player2 == null ? (
        <div>Game loading</div>
      ) : (
        <div className="table">
          <div
            style={{ width: "100%", height: "20%" }}
            className="table-cell App-header"
          >
            <h1>Cathedral</h1>
            <div style={{ text: "bold" }}>
              Current player{" "}
              {game.currentPlayer === "player1"
                ? game.player1.name
                : game.player2.name}
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  changeCurrentPlayer();
                }}
              >
                End turn
              </Button>
            </div>
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
      )}
    </div>
  );
}

export default withRouter(Game);
