import './App.css';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import ProfilePage from './Components/ProfilePage';
import NavBar from './Components/NavBar';
import OUserProfile from './Components/OUserProfile';
import SearchResults from './Components/SearchResults';
import PageNotFound from './Components/PageNotFound';
import SavedPostsPage from './Components/SavedPostsPage';
import Reels from './Components/Reels';
import Explore from './Components/Explore';
import DirectMessages from './Components/DirectMessages';
import CreatePost from './Components/CreatePost';
import StoriesViewer from './Components/StoriesViewer';

function App() {
  const location = useLocation();
  const hideNavOnRoutes = ['/login'];
  const shouldHideNav = hideNavOnRoutes.includes(location.pathname);
  return (
    <div className="app-wrapper">
      {!shouldHideNav && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <OUserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search/:inp"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedPostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reels"
          element={
            <ProtectedRoute>
              <Reels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <DirectMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stories/:userId"
          element={
            <ProtectedRoute>
              <StoriesViewer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
