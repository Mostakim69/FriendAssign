import React from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import Features from '../Components/Features';
import Faq from '../Components/Faq';
import Footer from '../Components/Footer';
import Benifit from '../Components/Benifit';
import LoadingSpinner from '../Components/LoadingSpinner';
import Contact from '../pages/Contact';

const HomeLayouts = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const isServiceDetailsPage = location.pathname.startsWith('/services/');
  const isAssignmentsPage = location.pathname === '/assignments';

  return (
    <div className="relative bg-base-100">
      {navigation.state === 'loading' && <LoadingSpinner />}
      <header>
        <Navbar />
      </header>
      <main>
        {isServiceDetailsPage || isAssignmentsPage ? (
          <Outlet />
        ) : (
          <>
            <Banner />
            <Features />
            <div id="benifit-section">
              <Benifit />
            </div>
            <div id="faq-section">
              <Faq />
            </div>
            <div id="contact-section">
              <Contact />
            </div>
          </>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayouts;