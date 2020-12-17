import React from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { createId } from "../utils/utils";

function Dashboard(props) {
  const startNewGame = () => {
    const { history } = props;
    var gameId = createId("");

    //TO-DO: show popup with generated gameId link to share
    history.push(`/game/${gameId}/player1`);
  };

  return (
    <div>
      <div className="App-header">
        <h1>Welcome to CATHEDRAL!</h1>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => startNewGame()}
        >
          Start new Game
        </Button>
      </div>
    </div>
  );
}

export default withRouter(Dashboard);
