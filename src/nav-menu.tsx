import { Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { apps } from "@src/program";

export function NavMenu() {
  return (
    <Flex direction="row">
      {Object.entries(apps).map(([name, { path }]) => (
        <Link
          key={name}
          as={NavLink}
          to={path}
          _activeLink={{ background: "grey" }}
        >
          {name}
        </Link>
      ))}
    </Flex>
  );
}
