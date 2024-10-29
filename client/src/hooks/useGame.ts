import {
  GameContext,
  GameDispatchContext,
  GameType,
} from "@providers/GameContext";
import { useContext } from "react";

export const useGame = () => {
  const { game } = useContext(GameContext);
  const setGame = useContext(GameDispatchContext);

  const updateGame = () => {
    setGame({ type: GameType.Update });
  };

  const addStr = () => {
    setGame({ type: GameType.IncreaseStr, stat: 1, money: 10 });
  };

  const addDex = () => {
    setGame({ type: GameType.IncreaseDex, stat: 1, money: 10 });
  };

  const addInt = () => {
    setGame({ type: GameType.IncreaseInt, stat: 1, money: 10 });
  };

  const addLck = () => {
    setGame({ type: GameType.IncreaseLck, stat: 1, money: 10 });
  };

  return { game: game, addStr, addDex, addInt, addLck, updateGame };
};
