import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {!isAdminRoute && <Header />}
      <main id="main-content" className="main-content">
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
