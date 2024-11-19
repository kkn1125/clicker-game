import { Route, Routes } from "react-router-dom";
import Layout from "@templates/Layout";
import Home from "@pages/Home";
import { GAME_HOME } from "@common/variables";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={GAME_HOME} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Router;
