import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import ProductDetailPage from './components/ProductDetailPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={user ? <ProfilePage user={user} /> : <LoginPage setUser={setUser} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
