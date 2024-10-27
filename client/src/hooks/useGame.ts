import { GameContext, GameDispatchContext } from "@providers/GameContext";
import { useContext } from "react";

export const useGame = () => {
  const game = useContext(GameContext);
  const setGame = useContext(GameDispatchContext);

  // const update = useCallback(
  //   (callback: (game: Game) => void) => {
  //     setGame((prev: Game) => {
  //       const newGame = new Game(prev);
  //       callback(newGame);
  //       return newGame;
  //     });
  //   },
  //   [setGame]
  // );

  return { game, /* update */ };
};
