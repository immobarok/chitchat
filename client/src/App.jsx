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
import Loader from './components/Loader';
import { getAuthUser } from './lib/api';
import useAuthUser from './hooks/useAuthUser';

const App = () => {

   const { isLoading, authUser } = useAuthUser();

   const isAuthenticated = Boolean(authUser);
   const isOnBoarded = authUser?.isOnBoarded;

   if (isLoading) return <Loader />;
   return (
      <Routes>
         <Route
            path="/"
            element={isAuthenticated && isOnBoarded ? (
               <HomePage />
            ) : (
               <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )}
         />
         <Route
            path="/signup"
            element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
         />
         <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
         />
         <Route
            path="/notifications"
            element={isAuthenticated ? <Notification /> : <Navigate to="/login" />}
         />
         <Route
            path="/call"
            element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
         />
         <Route
            path="/chat"
            element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
         />
         <Route
            path="/onboarding"
            element={isAuthenticated ? <OnBoardingPage /> : <Navigate to="/login" />}
         />
      </Routes>
   );
};

export default App;
