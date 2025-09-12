import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";
import NoPage from "./pages/nopage/NoPage.jsx";
import MyState from "./context/data/MyState.jsx";
import Login from "./pages/registration/Login.jsx";
import Signup from "./pages/registration/Signup.jsx";
import ProductInfo from "./pages/productInfo/ProductInfo.jsx";
import UpdateProduct from "./pages/admin/page/UpdateWorker.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import AddWorker from "./pages/admin/page/AddWorker.jsx"
import AuthProvider from "./components/protector/AuthContext.jsx";
import ProtectedRoute from "./components/protector/ProtectedRoute.jsx";
import Allproducts from "./pages/allproducts/Allproducts.jsx";
import AboutUs from "./components/aboutUs/AboutUs.jsx";
import Profile from "./components/profile/Profile.jsx";
import CompleteProfile from "./components/profile/CompleteProfile.jsx";
import { FaArrowUp } from "react-icons/fa";
import Aligarh from "./pages/allproducts/Aligarh/Aligarh.jsx";
import { BsWhatsapp } from "react-icons/bs";
import ReturnPolicy from "./components/aboutUs/ReturnPolicy.jsx";
import TermsAndConditions from "./components/aboutUs/TermsAndCondition.jsx";
import PrivacyPolicy from "./components/aboutUs/PrivacyPolicy.jsx";
import Contact from "./components/Contact/Contact.jsx";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";


import BecomeWorker from "./components/WorkWhiz/BecomeWorker.jsx";
import Inverter from "./components/OurServices/ServiceType/Electrician/Inverter.jsx";
import Electrician from "./components/OurServices/ServiceType/Electrician/Electrician.jsx";
import Beautician from "./components/OurServices/ServiceType/Beautician/Beautician.jsx";
import Catering from "./components/OurServices/ServiceType/Catering/Catering.jsx";
import Cleaning from "./components/OurServices/ServiceType/Cleaning/Cleaning.jsx";
import Construction from "./components/OurServices/ServiceType/Construction/Construction.jsx";
import ElectronicDevice from "./components/OurServices/ServiceType/ElectronicDevices/ElectronicDevice.jsx";
import Laundry from "./components/OurServices/ServiceType/Laundry/Laundry.jsx";
import Networking from "./components/OurServices/ServiceType/Networking/Networking.jsx";
import Painting from "./components/OurServices/ServiceType/Painting/Painting.jsx";
import Plumbing from "./components/OurServices/ServiceType/Plumbing/Plumbing.jsx";
import Renovation from "./components/OurServices/ServiceType/Renovation/Renovation.jsx";
import Shifting from "./components/OurServices/ServiceType/Shifting/Shifting.jsx";
import InteriorPainting from "./components/OurServices/ServiceType/Painting/InteriorPainting.jsx";
import ExteriorPainting from "./components/OurServices/ServiceType/Painting/ExteriorPainting.jsx";
import WorkerList from "./components/OurServices/WorkerList.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/join',
          element: (
            <ProtectedRoute>
              <BecomeWorker />
            </ProtectedRoute>
          )
        },
        {
          // path: "/orders",
          // element: (
          //   <ProtectedRoute>
          //     <Order />
          //   </ProtectedRoute>
          // ),
        },
        {
          // path: "/cart",
          // element: (
          //   <ProtectedRoute>
          //     <Cart />,
          //   </ProtectedRoute>
          // ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/addworker",
          element: (
            <ProtectedRouteForAdmin>
              <AddWorker />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/productinfo/:id",
          element: <ProductInfo />,
        },
        {
          path: "/allproducts",
          element: <Allproducts />,
        },
        {
          path: "/workers/:category",
          element: <WorkerList />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'electrician',
          element: <Electrician />
        },
        {
          path: "inverter",
          element: <Inverter />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'beautician',
          element: <Beautician />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'cleaning',
          element: <Cleaning />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'catering',
          element: <Catering />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'construction',
          element: <Construction />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'electronicdevice',
          element: <ElectronicDevice />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'laundary',
          element: <Laundry />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'computer',
          element: <Networking />
        },
        // --------------{ PAINTING AND ITS'S CATEGORY }----------------------------------
        {
          path: '/painting',
          element: <Painting />
        },
        {
          path: 'interiorpainting',
          element: <InteriorPainting />
        },
        {
          path: 'exteriorpainting',
          element: <ExteriorPainting />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'plumbing',
          element: <Plumbing />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'renovation',
          element: <Renovation />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'shifting',
          element: <Shifting />
        },
        {
          path: "aligarh",
          element: <Aligarh/>
        },
        
        
        {
          path: "/complete-profile",
          element: <CompleteProfile />,
        },
        {
          path: "about",
          element: <AboutUs />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        
        {
          path: "/updateworker",
          element: (
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/return-policy",
          element: <ReturnPolicy />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/terms&condition",
          element: <TermsAndConditions />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/*",
          element: <NoPage />,
        },
      ],
    },
  ]);
  // For whatsapp button----------------------
  const handleWhatsAppClick = () => {
    const phoneNumber = "917807040707";
    const message = "Hi, I am interested in your product!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank"); // opens in new tab
  };

  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <>
      {/* // Scroll to top button */}
      {/* <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="z-20 fixed bottom-8 sm:bottom-3 right-6 bg-[#449474] hover:bg-[#019664] hover:shadow-lg hover:scale-105 text-white p-[10px] cursor-pointer rounded-full shadow-lg transition"
      >
        <FaArrowUp size={25} />
      </button> */}
      {/* WhatsApp Button */}
      {/* <button
        onClick={handleWhatsAppClick}
        className="z-20 fixed bottom-22 sm:bottom-16 right-6 bg-[#449474] hover:bg-[#019664] hover:shadow-lg hover:scale-105 text-white p-[10px] cursor-pointer rounded-full shadow-lg transition"
      >
        <BsWhatsapp size={25} />
      </button> */}
      {/* Contact Button */}
      {/* <button
        onClick={() => setIsContactOpen(!isContactOpen)}
        className="cursor-pointer fixed bottom-6 left-6 bg-[#449474] text-white p-[10px] rounded-full shadow-lg hover:bg-[#019664] transition z-50 hover:scale-105"
      >
        {isContactOpen ? (
          <Icon
            icon={"mdi:close"}
            className="text-xl sm:text-2xl text-rose-600 font-bold"
          />
        ) : (
          <Icon
            icon={"mdi:email-arrow-right-outline"}
            className="text-2xl sm:text-3xl"
          />
        )}
      </button> */}

      {/* Contact Form Panel */}
      {isContactOpen && <Contact onClose={() => setIsContactOpen(false)} />}
      <AnimatePresence mode="wait">
        <AuthProvider>
          <MyState>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-center"
              autoClose={1000}
              theme="dark"
              transition={Bounce}
            />
          </MyState>
        </AuthProvider>
      </AnimatePresence>
    </>
  );
}

export default App;

// for admin protector
const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (
    admin.user.email === "asadalam4291@gmail.com" ||
    admin.user.email === "asadalamalig@gmail.com"
  ) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
