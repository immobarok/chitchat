import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon, UserIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { Tooltip } from "../ui/Tooltip";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation, isPending: isLoggingOut } = useLogout();

  return (
    <nav className="bg-base-200/80 backdrop-blur-sm border-b border-base-300 sticky top-0 z-30 h-20 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <Tooltip content="Go to Home">
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <ShipWheelIcon className="size-8 text-primary" />
                <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider hidden sm:block">
                  Streamify
                </span>
              </Link>
            </Tooltip>
          )}

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Notifications */}
            <Tooltip content="Notifications">
              <Link to="/notifications">
                <button className="btn btn-ghost btn-circle btn-sm sm:btn-md relative">
                  <BellIcon className="size-5 sm:size-6 text-base-content opacity-70" />
                  {/* Notification badge would go here */}
                  {/* <span className="absolute top-0 right-0 bg-error text-error-content rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span> */}
                </button>
              </Link>
            </Tooltip>

            {/* Theme Selector */}
            <Tooltip content="Toggle Theme">
              <ThemeSelector />
            </Tooltip>

            {/* User Profile */}
            <Tooltip content="My Profile">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/20 transition-all"
                >
                  <div className="w-8 sm:w-9 rounded-full">
                    {authUser?.profilePic ? (
                      <img
                        src={authUser.profilePic}
                        alt="User Avatar"
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-neutral text-neutral-content flex items-center justify-center w-full h-full">
                        <UserIcon className="size-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Tooltip>

            {/* Logout button */}
            <Tooltip content="Logout">
              <button
                className="btn btn-ghost btn-circle btn-sm sm:btn-md"
                onClick={logoutMutation}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <LogOutIcon className="size-5 sm:size-6 text-base-content opacity-70" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;