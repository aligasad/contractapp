import Header from '../navbar/Header.jsx';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../loader/Loader.jsx';
function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []); //mounting

  if (isLoading) {
    return <Loader/>
  }
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout;
