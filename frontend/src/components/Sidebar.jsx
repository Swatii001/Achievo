import classNames from "classnames";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { FcTodoList } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../lib/navigation";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <Link to="/" className="flex items-centre gap-2 px-1 py-3">
        <FcTodoList fontSize={24} />
        <span className="text-neutral-100 text-lg">ACHIEVO</span>
      </Link>
      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((task) => (
          <SidebarLink key={task.key} task={task} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((task) => (
          <SidebarLink key={task.key} task={task} />
        ))}
        <div
          className={classNames(linkClass, "cursor-pointer text-red-500")}
          onClick={handleLogoutClick}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ task }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={task.path}
      className={classNames(
        pathname === task.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{task.icon} </span>
      {task.label}
    </Link>
  );
}
