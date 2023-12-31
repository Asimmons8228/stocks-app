import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import NewAssetPage from '../NewAssetPage/NewAssetPage';
import PortfolioPage from '../PortfolioPage/PortfolioPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import  EditPage  from '../EditPage/EditPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        {user ? (
          <>
            <Route path="/asset/new" element={<NewAssetPage />} />
            <Route path="/portfolio" element={<PortfolioPage user={user} setUser={setUser} />} />
            <Route path="/asset/edit" element={<EditPage/>} />
          </>
        ) : (
          <>
            <Route path="/orders/new" element={<Navigate to="/login" />} />
            <Route path="/orders" element={<Navigate to="/login" />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
