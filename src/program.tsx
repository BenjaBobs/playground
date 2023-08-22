import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "@src/home";
import { MythicHeroes } from "@src/mythic-heroes/mythic-heroes";
import { NavMenu } from "@src/nav-menu";
import React from "react";
import ReactDOM from "react-dom/client";

const root =
  document.getElementById("root") ??
  document.body.appendChild(document.createElement("div"));
root.id = "root";

export const apps: { [key: string]: { path: string; element: JSX.Element } } = {
  Home: {
    path: "/",
    element: <Home />,
  },
  MythicHeroes: {
    path: "/mythic-heroes",
    element: <MythicHeroes />,
  },
};

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <NavMenu />
        <Routes>
          {Object.values(apps).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<div>Nothing to see here.</div>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
