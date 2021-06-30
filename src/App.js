import { Fragment, useState } from "react";
import "./styles.css";
import { getItem, sortOrder, rightPair } from "./selector";
import { transformData } from "./CollectionUtil";

const GAMESTATES = {
  READY: "READY",
  MATCHED: "MATCHED",
  WRONG_MATCH: "WRONG_MATCH"
};
export default function CountryCapital({ data }) {
  const [gameData, setGameData] = useState(transformData(data));
  const [currentSelection, setSelection] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const transitState = (newSelection, currentSelection, state) => {
    const presentStates = [newSelection.value, currentSelection?.value];
    const newState = gameData.map((data) => {
      if (presentStates.includes(data.value)) {
        return {
          ...data,
          state
        };
      }
      return data;
    });
    setGameData(newState);
    updateGameStatus(newState);
  };

  const updateGameStatus = (newState) =>
    setGameOver(
      newState.filter((k) => k.state === GAMESTATES.MATCHED).length ===
        newState.length
    );

  const handleSelection = (value) => {
    const item = getItem(value, gameData);
    if (!currentSelection) {
      setSelection(item);
      transitState(item, currentSelection, GAMESTATES.READY);
      return;
    }

    if (rightPair(currentSelection, value, gameData)) {
      transitState(currentSelection, item, GAMESTATES.MATCHED);
      setSelection(null);
      return;
    }

    transitState(currentSelection, item, GAMESTATES.WRONG_MATCH);
    setSelection(null);
  };

  const getBackgrounColor = (state) => {
    switch (state) {
      case GAMESTATES.READY:
      case GAMESTATES.MATCHED:
        return "blue";
      case GAMESTATES.WRONG_MATCH:
        return "red";
      default:
        return "white";
    }
  };

  return (
    <Fragment>
      {sortOrder(gameData).map(
        (data) =>
          data.state !== GAMESTATES.MATCHED && (
            <button
              key={data.value}
              style={{ background: getBackgrounColor(data.state) }}
              onClick={() => handleSelection(data.value)}
            >
              {data.value}
            </button>
          )
      )}
      {gameOver && <h1> Congratulations, You win!</h1>}
    </Fragment>
  );
}
