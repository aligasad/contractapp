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
import ProductInfo from "./pages/workerInfo/WorkerInfo.jsx";
import UpdateProduct from "./pages/admin/page/UpdateWorker.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import AddWorker from "./pages/admin/page/AddWorker.jsx"
import AuthProvider from "./components/protector/AuthContext.jsx";
import ProtectedRoute from "./components/protector/ProtectedRoute.jsx";
import AboutUs from "./components/aboutUs/AboutUs.jsx";
import Profile from "./components/profile/Profile.jsx";
import CompleteProfile from "./components/profile/CompleteProfile.jsx";
import { FaArrowUp } from "react-icons/fa";
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
import ElectricianWorkers from "./components/OurServices/ServiceType/Electrician/ElectricianWorkers.jsx";
import WorkerDashboard from "./components/WorkerDashboard/WorkerDashboard.jsx";
import AllWorkers from "./pages/allworkers/Allworkers.jsx";
import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import BeauticianWorkers from "./components/OurServices/ServiceType/Beautician/BeauticianWorkers.jsx";
import CateringWorkers from "./components/OurServices/ServiceType/Catering/CateringWorkers.jsx";
import CleaningWorkers from "./components/OurServices/ServiceType/Cleaning/CleaningWorkers.jsx";
import ConstructionWorkers from "./components/OurServices/ServiceType/Construction/ConstructionWorker.jsx";
import ElectronicDevicesWorkers from "./components/OurServices/ServiceType/ElectronicDevices/ElectronicDevicesWorkers.jsx";
import LaundryWorkers from "./components/OurServices/ServiceType/Laundry/LaundryWorkers.jsx";
import NetworkingWorkers from "./components/OurServices/ServiceType/Networking/NetworkingWorkers.jsx";
import PaintingWorkers from "./components/OurServices/ServiceType/Painting/PaintingWorkers.jsx";
import PlumbingWorkers from "./components/OurServices/ServiceType/Plumbing/PlumbingWorkers.jsx";
import RenovationWorkers from "./components/OurServices/ServiceType/Renovation/RenovationWorkers.jsx";
import ShiftingWorkers from "./components/OurServices/ServiceType/Shifting/ShiftingWorkers.jsx";

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
          path: "/userorders",
          element: (
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          ),
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
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
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
          path: "/allworkers",
          element: <AllWorkers />,
        },
        
        {
          path: "workerdashboard",
          element: <WorkerDashboard />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'electrician',
          element: (
            <ProtectedRoute>
              <Electrician />
            </ProtectedRoute>
          )
        },
        {
          path: "/electrician/:category",
          element: <ElectricianWorkers />
        },
        // --------------{ Beautician AND ITS'S CATEGORY }----------------------------------
        {
          path: 'beautician',
          element: (
            <ProtectedRoute>
              <Beautician />
            </ProtectedRoute>
          )
        },
        {
          path: "/beautician/:category",
          element: <BeauticianWorkers />
        },
        // --------------{ Cleaning AND ITS'S CATEGORY }----------------------------------
        {
          path: 'cleaning',
          element: (
            <ProtectedRoute>
              <Cleaning />
            </ProtectedRoute>
          )
        },
        {
          path: "/cleaning/:category",
          element: <CleaningWorkers />
        },
        // --------------{ Catering AND ITS'S CATEGORY }----------------------------------
        {
          path: 'catering',
          element: (
            <ProtectedRoute>
              <Catering />
            </ProtectedRoute>
          )
        },
        {
          path: "/catering/:category",
          element: <CateringWorkers />
        },
        // --------------{ Construction AND ITS'S CATEGORY }----------------------------------
        {
          path: 'construction',
          element: (
            <ProtectedRoute>
              <Construction />
            </ProtectedRoute>
          )
        },
        {
          path: "/construction/:category",
          element: <ConstructionWorkers />
        },
        // --------------{ Electronic Device AND ITS'S CATEGORY }----------------------------------
        {
          path: 'electronicdevice',
          element: (
            <ProtectedRoute>
              <ElectronicDevice />
            </ProtectedRoute>
          )
        },
        {
          path: "electronicdevice/:category",
          element: <ElectronicDevicesWorkers />
        },
        // --------------{ Laundry AND ITS'S CATEGORY }----------------------------------
        {
          path: 'laundary',
          element: (
            <ProtectedRoute>
              <Laundry />
            </ProtectedRoute>
          )
        },
        {
          path: "laundary/:category",
          element: <LaundryWorkers />
        },
        // --------------{ Networking AND ITS'S CATEGORY }----------------------------------
        {
          path: 'computer',
          element: (
            <ProtectedRoute>
              <Networking />
            </ProtectedRoute>
          )
        },
        {
          path: "computer/:category",
          element: <NetworkingWorkers />
        },
        // --------------{ PAINTING AND ITS'S CATEGORY }----------------------------------
        {
          path: '/painting',
          element: (
            <ProtectedRoute>
              <Painting />
            </ProtectedRoute>
          )
        },
        {
          path: '/painting/:category',
          element: <PaintingWorkers />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'plumbing',
          element: (
            <ProtectedRoute>
              <Plumbing />
            </ProtectedRoute>
          )
        },
        {
          path: '/plumbing/:category',
          element: <PlumbingWorkers />
        },
        // --------------{ RENOVATION AND ITS'S CATEGORY }----------------------------------
        {
          path: 'renovation',
          element: (
            <ProtectedRoute>
              <Renovation />
            </ProtectedRoute>
          )
        },
        {
          path: '/renovation/:category',
          element: <RenovationWorkers />
        },
        // --------------{ ELECTRICIAN AND ITS'S CATEGORY }----------------------------------
        {
          path: 'shifting',
          element: (
            <ProtectedRoute>
              <Shifting />
            </ProtectedRoute>
          )
        },
        {
          path: '/shifting/:category',
          element: <ShiftingWorkers />
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
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="z-20 fixed bottom-8 sm:bottom-3 right-6 bg-[#449474] hover:bg-[#019664] hover:shadow-lg hover:scale-105 text-white p-[10px] cursor-pointer rounded-full shadow-lg transition"
      >
        <FaArrowUp size={25} />
      </button>
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
