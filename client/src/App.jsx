import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router';
import { axiosInstance } from './lib/axios';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Notification from './pages/Notification';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import OnBoardingPage from './pages/OnBoardingPage';

const App = () => {
   const { data: authData, isLoading ,error} = useQuery({
      queryKey: ['authUser'],
      queryFn: async () => {
         const res = await axiosInstance.get('/auth/me');
         return res.data;
      },
      retry: false,
   });

   const authUser = authData?.user;
   return (
      <Routes>
         <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
         />
         <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
         />
         <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
         />
         <Route
            path="/notifications"
            element={authUser ? <Notification /> : <Navigate to="/login" />}
         />
         <Route
            path="/call"
            element={authUser ? <CallPage /> : <Navigate to="/login" />}
         />
         <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
         />
         <Route
            path="/onboarding"
            element={authUser ? <OnBoardingPage /> : <Navigate to="/login" />}
         />
      </Routes>
   );
};

export default App;
