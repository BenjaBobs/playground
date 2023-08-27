import { NavLink } from "react-router-dom";
import { apps } from "@src/program";

export function NavMenu() {
  return (
    <div>
      {Object.entries(apps).map(([name, { path }]) => (
        <NavLink
          key={name}
          to={path}
          style={({ isActive }) => ({
            background: isActive ? "grey" : undefined,
            width: "100px",
            padding: "5px",
          })}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}
