import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import Logo from "../assets/chitchat_logo_v2.png";
import videoCallLogo from "../assets/video_call.png";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left login section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-6 flex items-center gap-3 animate-pulse">
            <img
              src={Logo}
              alt="ChitChat Logo"
              className="w-16 h-16 drop-shadow-lg transition-transform duration-300 hover:rotate-12"
            />
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-secondary tracking-tighter">
              ChitChat
            </span>
          </div>

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-secondary bg-clip-text text-transparent">
                    Welcome Back
                  </h2>
                  <p className="text-sm opacity-75">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                {error && (
                  <div className="alert alert-error shadow-lg mb-4">
                    <span>{error.response.data.message}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      className="w-full input bg-transparent backdrop-blur-sm border border-purple-500 rounded-sm outline-none transition-all placeholder:text-purple-600/90
                      focus:outline-purple-500 focus:outline-2 focus:outline-offset-2 focus:ring-0 focus:border-purple-500"
                      value={loginData.email}
                      required
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full input bg-transparent backdrop-blur-sm border border-purple-500 rounded-sm outline-none transition-all placeholder:text-purple-600/90
                      focus:outline-purple-500 focus:outline-2 focus:outline-offset-2 focus:ring-0 focus:border-purple-500"
                      value={loginData.password}
                      required
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn bg-gradient-to-r from-purple-600 to-secondary w-full active:scale-97 transition-all ease-in-out duration-200"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="loading loading-spinner loading-sm">
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center text-sm opacity-70">
                    Don’t have an account?{" "}
                    <span className="text-purple-400 hover:underline">
                      <Link to="/signup">Create one</Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right side illustration */}
        <div className="hidden lg:block w-full lg:w-1/2 bg-gradient-to-tr from-purple-900 to-secondary text-white p-8 justify-center items-center opacity-90">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={videoCallLogo} alt="Illustration" />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2>Connect with language partners worldwide</h2>
              <p className="opacity-70 text-xs">
                Practice conversations, make friends, and improve your language skills — welcome back to ChitChat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
