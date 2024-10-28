import { createContext, useReducer } from "react";
import { Game } from "../models/Game";
import { Player } from "../models/Player";

const initialState = {
  game: new Game(),
};

export const GameContext = createContext<{ game: Game }>(initialState);
export const GameDispatchContext = createContext<React.Dispatch<GameAction>>(
  () => {}
);

export const GameType = {
  Update: "Update",
  SetPlayer: "SetPlayer",
  IncreaseStr: "IncreaseStr",
  IncreaseDex: "IncreaseDex",
  IncreaseInt: "IncreaseInt",
  IncreaseLck: "IncreaseLck",
  CompletedQuest: "CompletedQuest",
} as const;
export type GameType = (typeof GameType)[keyof typeof GameType];

type GameAction = {
  type: GameType;
  player?: Player;
  stat?: number;
  money?: number;
  title?: string;
};

const gameReducer = (state: { game: Game }, action: GameAction) => {
  switch (action.type) {
    case GameType.Update:
      return { ...state };
    case GameType.SetPlayer:
      if (action.player) {
        state.game.setPlayer(action.player);
      }
      return { ...state };
    case GameType.IncreaseStr:
      if (action.money && state.game.spendMoney(action.money)) {
        state.game.player.stat.str += action.stat || 0;
      }
      return { ...state };
    case GameType.IncreaseDex:
      if (action.money && state.game.spendMoney(action.money)) {
        state.game.player.stat.dex += action.stat || 0;
      }
      return { ...state };
    case GameType.IncreaseInt:
      if (action.money && state.game.spendMoney(action.money)) {
        state.game.player.stat.int += action.stat || 0;
      }
      return { ...state };
    case GameType.IncreaseLck:
      if (action.money && state.game.spendMoney(action.money)) {
        state.game.player.stat.lck += action.stat || 0;
      }
      return { ...state };
    case GameType.CompletedQuest:
      if (action.title) {
        const quest = state.game.quests.find(
          (quest) => quest.title === action.title
        );
        if (quest) {
          const reward = quest.complete();
          console.log(reward);
          state.game.earnMoney(reward);
        }
      }
      return { ...state };
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
