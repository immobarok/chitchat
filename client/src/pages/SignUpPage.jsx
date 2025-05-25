import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import Logo from "../assets/chitchat_logo_v2.png"
import { Link, Navigate, useNavigate } from "react-router";
import videoCallLogo from "../assets/video_call2.png";
import { signup } from "../lib/api";

const SignUpPage = () => {
  const [signupData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient()

  const { mutate:signupMutation, isPending, error } = useMutation({
    mutationFn:signup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    }
  })

  const handleSignUp = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left sign up  */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-6 flex items-center gap-3 animate-pulse">
            <img
              src={Logo}
              alt=""
              className="w-16 h-16 drop-shadow-lg transition-transform duration-300 hover:rotate-12"
            />
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-secondary tracking-tighter">
              ChitChat
            </span>
          </div>
          <div className="w-full">
            <form onSubmit={handleSignUp} >
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-secondary bg-clip-text text-transparent">
                    Start Your Journey
                  </h2>
                  <p className="text-sm opacity-75">
                    Connect with millions of language enthusiasts worldwide
                  </p>
                </div>
                {
                  error && (
                    <div className="alert alert-error shadow-lg mb-4">
                        <span>{error.response.data.message}</span>
                    </div>
                  )
                }
                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full input bg-transparent backdrop-blur-sm border border-purple-500 rounded-sm outline-none transition-all placeholder:text-purple-600/90
                      outliene-offset-2 focus:outline-purple-500 focus:outline-2 focus:outline-offset-2 focus:ring-0 focus:border-purple-500
                      "
                      value={signupData.fullName}
                      required
                      onChange={(e) => setSignUpData({ ...signupData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      className="w-full input bg-transparent backdrop-blur-sm border border-purple-500 rounded-sm outline-none transition-all placeholder:text-purple-600/90
                      outliene-offset-2 focus:outline-purple-500 focus:outline-2 focus:outline-offset-2 focus:ring-0 focus:border-purple-500"
                      value={signupData.email}
                      required
                      onChange={(e) => setSignUpData({ ...signupData, email: e.target.value })}
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
                      outliene-offset-2 focus:outline-purple-500 focus:outline-2 focus:outline-offset-2 focus:ring-0 focus:border-purple-500"
                      value={signupData.password}
                      required
                      onChange={(e) => setSignUpData({ ...signupData, password: e.target.value })}
                    />
                    <p className="text-xs opacity-65 mt-1">Password Must be atleast 6 character long</p>
                  </div>
                  <div className="form-control w-full">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox-sm checkbox-primary" required />
                      <span className="text-xs leading-tight">
                        I agree to the {""}
                        <span className="text-primary hover:text-underline">terms of service </span> and {""}
                        <span className="text-primary hover:text-underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                  <button className="btn bg-gradient-to-r from-purple-600 to-secondary w-full active:scale-97 transition-all ease-in-out duration-200" type="submit">
                    {isPending ? (
                      <span className="loading loading-spinner loading-sm">Loading...</span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                  <div className="text-center text-sm opacity-70">
                    Already have an account?{" "}
                    <span className="text-purple-400 hover:text-underline">
                      <Link to="/login">Login</Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* right side */}
        <div className="hidden lg:block w-full lg:w-1/2 bg-gradient-to-tr from-purple-900 to-secondary text-white p-8  justify-center items-center opacity-90">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={videoCallLogo} alt="" />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2>Connect with language partner  world wide</h2>
              <p className="opacity-70 text-xs">
                Discover new friends, learn new languages, and stay connected — welcome to ChitChat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage