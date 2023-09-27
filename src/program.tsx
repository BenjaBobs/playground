import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@src/home";
import { MythicHeroes } from "@src/mythic-heroes/mythic-heroes";
import { NavMenu } from "@src/nav-menu";
import React from "react";
import ReactDOM from "react-dom/client";
import { KanaTable } from "@src/japanese/KanaTable";

// eslint-disable-next-line no-restricted-imports
import "./program.scss";

const root =
  document.getElementById("root") ??
  document.body.appendChild(document.createElement("div"));
root.id = "root";

export const apps: { [key: string]: { path: string; element: JSX.Element } } = {
  Home: {
    path: "/",
    element: <Home />,
  },
  Japanese: {
    path: "/japanese",
    element: <KanaTable />,
  },
  MythicHeroes: {
    path: "/mythic-heroes",
    element: <MythicHeroes />,
  },
};

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavMenu />
      <Routes>
        {Object.values(apps).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<div>Nothing to see here.</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
