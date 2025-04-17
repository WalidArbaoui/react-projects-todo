import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-light text-dark">
      <Link to="/" className="flex items-center gap-1">
        <Icon
          icon="material-symbols-light:hub-outline"
          width="24"
          height="24"
        />
        <span>
          <span className="font-bold text-main">Task</span>Hub
        </span>
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive && "outline"
              } flex items-center gap-1 p-2 outline-main-light rounded`
            }
          >
            <Icon
              icon="material-symbols-light:dashboard-rounded"
              width="24"
              height="24"
              className="text-main"
            />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${
                isActive && "outline"
              } flex items-center gap-1 p-2 outline-main-light rounded`
            }
          >
            <Icon
              icon="emojione-monotone:hammer-and-wrench"
              width="24"
              height="24"
              className="text-main"
            />
            Projects
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
