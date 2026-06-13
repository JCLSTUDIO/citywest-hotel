import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileDock from './MobileDock';
import MobileActionBar from './MobileActionBar';
import { CitywestLoader } from '../CitywestLoader';

export default function Layout() {
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {showLoader && (
        <CitywestLoader 
          onComplete={() => setShowLoader(false)} 
          logoSrc="/images/logo/citywest-logo-dark.png" 
        />
      )}
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-32 pb-80 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
      <MobileDock />
    </>
  );
}