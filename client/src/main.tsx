import Router from "@router/Router";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { GameProvider } from "./providers/GameContext";

createRoot(document.getElementById("root")!).render(
  <GameProvider>
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  </GameProvider>
);
