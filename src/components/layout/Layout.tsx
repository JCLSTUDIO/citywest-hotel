import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileDock from './MobileDock';
import MobileActionBar from './MobileActionBar';
import { CitywestLoader } from '../CitywestLoader';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {loading && <CitywestLoader onComplete={() => setLoading(false)} logoSrc="/images/logo/citywest-logo-dark.png" />}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
        <MobileActionBar />
        <MobileDock />
      </div>
    </>
  );
}
