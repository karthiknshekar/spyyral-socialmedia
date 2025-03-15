import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Pages
import Landing from './pages/Landing/Landing';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Messages from './pages/Messages';
import Communities from './pages/Communities';
import Friends from './pages/Friends';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className=" bg-light">
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            className: 'bg-white shadow-sm rounded p-3'
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
