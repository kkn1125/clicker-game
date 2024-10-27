import { createContext, useReducer } from "react";
import { Game } from "../models/Game";
import { Player } from "../models/Player";

const initialState = new Game();

export const GameContext = createContext<Game>(initialState);
export const GameDispatchContext = createContext<
  React.Dispatch<GameAction>
>(() => {});

export const GameType = {
  Update: "Update",
  SetPlayer: "SetPlayer",
  IncreaseStr: "IncreaseStr",
  IncreaseDex: "IncreaseDex",
  IncreaseInt: "IncreaseInt",
  IncreaseLck: "IncreaseLck",
} as const;
export type GameType = (typeof GameType)[keyof typeof GameType];

type GameAction = {
  type: GameType;
  player?: Player;
  payload?: number;
};

const gameReducer = (state: Game, action: GameAction) => {
  switch (action.type) {
    case GameType.Update:
      return new Game(state);
    case GameType.SetPlayer:
      if (action.player) {
        state.setPlayer(action.player);
      }
      return new Game(state);
    case GameType.IncreaseStr:
      state.player.stat.str += action.payload || 0;
      return new Game(state);
    case GameType.IncreaseDex:
      state.player.stat.dex += action.payload || 0;
      return new Game(state);
    case GameType.IncreaseInt:
      state.player.stat.int += action.payload || 0;
      return new Game(state);
    case GameType.IncreaseLck:
      state.player.stat.lck += action.payload || 0;
      return new Game(state);
  }
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={setGame}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};
