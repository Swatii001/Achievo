import {
  MdDashboard,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { FaTasks, FaTrashAlt } from "react-icons/fa";
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    filePath: "../pages/Dashboard.jsx",
    icon: <MdDashboard />,
  },
  {
    key: "tasks",
    label: "Tasks",
    path: "/Tasks",
    filePath: "../pages/TasksSidebar.jsx",
    icon: <FaTasks />,
  },
  {
    key: "completed",
    label: "Completed",
    path: "/completed",
    filePath: "../pages/Completed.jsx",
    icon: <MdTaskAlt />,
  },
  // {
  //   key: "in progress",
  //   label: "InProgress",
  //   path: "/in-progress",
  //   filePath: "../pages/InProgress.jsx",
  //   icon: <MdOutlinePendingActions />,
  // },
  {
    key: "todo",
    label: "ToDo",
    path: "/todo",
    filePath: "../pages/ToDo.jsx",
    icon: <MdOutlinePendingActions />,
  },
  {
    key: "trash",
    label: "Trash",
    path: "/trash",
    filePath: "../pages/Trash.jsx",
    icon: <FaTrashAlt />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <MdSettings />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
