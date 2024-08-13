import './App.css';
import { Admin } from './pages/admin_dashboard/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { User } from './pages/user_dashboard/user_dashboard';
import { AboutPage } from './pages/user_dashboard/about_page';

export default function App() {
  // return <User />;
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<User />} />
        <Route path="user" element={<User />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
