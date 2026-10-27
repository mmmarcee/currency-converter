
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import SettingsLayout from './layouts/SettingsLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import Home from './components/Home/Home.jsx';
import Settings from './components/Settings/Settings.jsx';
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/Login.jsx';

function App() {
  useEffect(() => {
    const savedCss = localStorage.getItem('app-font-css');
    if (savedCss) {
      document.documentElement.style.setProperty('--app-font', savedCss);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<SettingsLayout />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;