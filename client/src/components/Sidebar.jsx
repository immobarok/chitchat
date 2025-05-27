import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";
import logo from "../assets/chitchat_logo_v2.png"

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <figure className="w-10 h-10">
            <img src={logo} alt="ChitChat Logo" className="w-full h-full object-contain" />
          </figure>
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            ChitChat
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPath === "/" ? "bg-primary/10 text-primary font-medium" : "hover:bg-base-300/50"}`}
        >
          <HomeIcon className="size-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPath === "/friends" ? "bg-primary/10 text-primary font-medium" : "hover:bg-base-300/50"}`}
        >
          <UsersIcon className="size-5" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPath === "/notifications" ? "bg-primary/10 text-primary font-medium" : "hover:bg-base-300/50"}`}
        >
          <BellIcon className="size-5" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <Link to="/profile" className="flex items-center gap-3 hover:bg-base-300/50 p-2 rounded-lg transition-all">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
};
export default Sidebar;