import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="layout">
      {!isAdminRoute && <Header />}
      <main className="main-content">
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
