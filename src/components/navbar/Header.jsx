import { useData } from "../../context/data/MyState";
import { BsFillCloudSunFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown, FaUserAlt } from "react-icons/fa";
import {
  Home,
  User,
  Layers,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const navigate = useNavigate();
  const context = useData();
  const {
    mode,
    toggleMode,
    worker,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    address,
    resetFilter,
    pageType,
    setPageType,
  } = context;

  console.log("PAGE TYPE", pageType);
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fullAddress = address || "";
    const shortAddress = fullAddress.split(" ").slice(0, 3).join(" ");
    setLocation(shortAddress);
  }, [address]); // Only re-run when address changes

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // -------------------{ Fetch worker data }-------------------------
  const [hasData, setHasData] = useState(false);
  useEffect(() => {
    const fetchWorker = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(firebaseDB, "workers", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // setWorkers({ uid: user.uid, ...docSnap.data() });
        setHasData(true);
      } else {
        setHasData(false);
      }
    };

    fetchWorker();
  }, []);

  // For Select Options in header-========= ======= ====== ===== ====== ===== =======
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const productRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        productRef.current &&
        !productRef.current.contains(event.target) &&
        event.target.getAttribute("data-dropdown") !== "worker"
      ) {
        setIsProductDropdownOpen(false);
      }
      if (
        userRef.current &&
        !userRef.current.contains(event.target) &&
        event.target.getAttribute("data-dropdown") !== "user"
      ) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (path) => {
    setIsProductDropdownOpen(false);
    setIsUserDropdownOpen(false);
    navigate(path);
  };

  // For dark and light mode------ -------- ---------
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // FOR LOGOUT-------- ---------
  function handleLogout() {
    auth.signOut();
    setIsDropdownOpen((prev) => !prev);
    localStorage.clear("user");
    navigate("/");
    // localStorage.clear("cart");
    toast.success("Logout Successfully!");
  }

  // For loggedIn user information--------------
  const user = JSON.parse(localStorage.getItem("user"));

  // cartItems data---------------------
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);

  // Finding all types-------------------------------------------
  const [types, setTypes] = useState([]);
  function getTypes() {
    const typo = [...new Set(worker.map((item) => item.type))];
    // const typo1 = [...new Set(product.map((item) => item.type))];
    setTypes(typo);
  }
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo(0, window.innerHeight * 0.4);
    getTypes();
  }, [searchkey, filterType, worker]);

  function onTop() {
    window.scrollTo(0, 0);
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  return (
    <div className="bg-[#dfe3d6] sticky top-0 z-50 shadow-md">
      {/* Mobile View */}
      <div className="md:hidden flex justify-between items-center px-4 py-1 bg-gradient-to-br from-[#FFE3BB] via-white to-[#e7c1a9] border-b-2 border-[#219C90] shadow-md">
        <Link to="/" className="text-2xl font-bold text-[#219C90]">
          <div className="">
            <img onClick={onTop} src={logo} alt="Logo" className="h-14 py-1" />
          </div>
        </Link>

        {/* Right side icons ----- ------   -------  -------   ------- ----- */}
        <div className="flex items-center gap-5">
          {/* Mobile Search Icon & Input */}
          {!searchBarOpen ? (
            <button
              onClick={() => setSearchBarOpen(true)}
              className="text-xl text-[#219C90] hover:text-[#EE4E4E] transition"
            >
              <RiSearchLine />
            </button>
          ) : (
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              onBlur={() => setSearchBarOpen(false)}
              className="w-44 p-2 text-sm border border-[#FFC700] bg-[#FFFBEA] text-[#219C90] placeholder-[#FFB300] rounded-md outline-none focus:ring-2 focus:ring-[#219C90] transition"
              style={{ maxWidth: "220px" }}
            />
          )}

          {/* Cart button */}
          <Link to="/cart">
            <div className="relative">
              <ShoppingCart className="h-5 w-5 font-bold text-[#219C90] hover:text-[#EE4E4E] transition" />
              <span className="bg-[#EE4E4E] text-white text-[12px] rounded-full px-[6px] absolute -top-2 -right-3 shadow-md">
                {(cartItems || []).length}
              </span>
            </div>
          </Link>

          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-[#219C90] hover:text-[#FFC700] transition"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          {/* Half-screen overlay */}
          <div
            className="fixed inset-0 z-40 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 bg-black/40 w-full h-full pointer-events-auto"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          {/* Slide-in menu */}
          <div
            className="fixed top-0 left-0 h-full w-3/4 sm:w-2/3 bg-white shadow-2xl z-50 rounded-r-2xl border-r border-[#219C90] transform transition-transform duration-300 ease-in-out"
            style={{
              transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#FFC700] bg-[#FFF455]/20">
              <h2 className="text-lg font-bold text-[#219C90]">Menu</h2>
              <X
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-2xl text-[#EE4E4E]"
              />
            </div>

            <ul className="space-y-5 text-[#333] px-6 py-6 font-medium">
              <li>
                <div
                  className="relative inline-block text-left"
                  ref={productRef}
                >
                  <button
                    data-dropdown="product"
                    onClick={() => {
                      setIsProductDropdownOpen(!isProductDropdownOpen);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 text-[#219C90] font-bold hover:text-[#EE4E4E] cursor-pointer transition"
                  >
                    Services{" "}
                    {isProductDropdownOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  {isProductDropdownOpen && (
                    <ul className="absolute mt-3 bg-[#FFFBEA] text-gray-800 shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2 border border-[#FFC700]/60">
                      <li
                        onClick={() => {
                          handleSelect("/allworkers"),
                            setIsProductDropdownOpen(false),
                            setMenuOpen(false);
                        }}
                        className="hover:text-[#EE4E4E] cursor-pointer transition"
                      >
                        All Workers
                      </li>
                      <li
                        onClick={() => {
                          handleSelect("/electrician"),
                            setIsOpen(false),
                            setMenuOpen(false);
                        }}
                        className="hover:text-[#EE4E4E] cursor-pointer transition"
                      >
                        Electrician
                      </li>
                      <li
                        onClick={() => {
                          handleSelect("/painting"),
                            setIsOpen(false),
                            setMenuOpen(false);
                        }}
                        className="hover:text-[#EE4E4E] cursor-pointer transition"
                      >
                        Home Painter
                      </li>
                      <li
                        onClick={() => {
                          handleSelect("/construction"),
                            setIsOpen(false),
                            setMenuOpen(false);
                        }}
                        className="hover:text-[#EE4E4E] cursor-pointer transition"
                      >
                        Construction
                      </li>
                      <li
                        onClick={() => {
                          handleSelect("/renovation"),
                            setIsOpen(false),
                            setMenuOpen(false);
                        }}
                        className="hover:text-[#EE4E4E] cursor-pointer transition"
                      >
                        Renovation
                      </li>
                      <li
                        onClick={() => {
                          handleSelect("/plumbing"),
                            setIsOpen(false),
                            setMenuOpen(false);
                        }}
                        className="hover:text-[#EE4E4E] cursor-pointer transition"
                      >
                        Plumbing
                      </li>
                      <li
                        onClick={() => {
                          handleSelect("/electronicdevice"),
                            setIsOpen(false),
                            setMenuOpen(false);
                        }}
                        className="hover:text-[#EE4E4E] cursor-pointer transition"
                      >
                        Electronic Device
                      </li>
                    </ul>
                  )}
                </div>
              </li>

              <li>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#219C90] transition"
                >
                  Orders
                </Link>
              </li>

              {user && (
                hasData ? (
                    <li
                      onClick={() => {
                        handleSelect("/join");
                        setMenuOpen(false);
                      }}
                      className="hover:text-[#FF4F0F] cursor-pointer"
                    >
                      Dashboard
                    </li>
                  ) : (
                    <li
                      onClick={() => {
                        handleSelect("/userorders");
                        setMenuOpen(false);
                      }}
                      className="hover:text-[#FF4F0F] cursor-pointer"
                    >
                      User Orders
                    </li>
                  )
              )}

              <li>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#219C90] transition"
                >
                  About
                </Link>
              </li>

              {user?.user?.email === "asadalam4291@gmail.com" ||
              user?.user?.email === "asadalamalig@gmail.com" ? (
                <li>
                  <Link
                    to="/dashboard"
                    className="font-bold text-[#EE4E4E]"
                    onClick={() => setMenuOpen(false)}
                  >
                    ADMIN
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#219C90] transition"
                >
                  Profile
                </Link>
              </li>

              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-[#EE4E4E] hover:text-[#219C90] transition"
                  >
                    Logout <MdLogout />
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#219C90] transition"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {/* Desktop Header-------------------------------------------- */}
      <div className="hidden min-h-15 md:flex items-center justify-between px-8 py-2 bg-gradient-to-r from-[#FFE3BB] via-[#FFA673]/50 to-[#FF4F0F]/30 border-b-2 border-[#03A6A1]/40 shadow-md">
        {/* Left Section - Logo & Nav--------------------------- */}
        <div className="flex items-center gap-8">
          {/* Logo---------------------------------------------- */}
          <div
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer text-2xl font-extrabold text-[#03A6A1] tracking-wide flex items-center gap-2"
          >
            <img src={logo} className="sm:h-11" />{" "}
            <span className="hidden sm:block"></span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-sm text-[#FF4F0F] font-semibold">
            <Link to="/" className="hover:text-[#03A6A1] transition">
              Home
            </Link>

            {/* Products Dropdown */}
            <div className="relative inline-block text-left" ref={productRef}>
              <button
                data-dropdown="product"
                onClick={() => {
                  setIsProductDropdownOpen(!isProductDropdownOpen);
                  setIsDropdownOpen(false);
                }}
                className="flex items-center gap-1 text-[#FF4F0F] font-bold hover:text-[#03A6A1] transition"
              >
                Services{" "}
                {isProductDropdownOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {isProductDropdownOpen && (
                <ul className="absolute mt-3 bg-[#FFFBEA] text-gray-800 shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2 border border-[#FFC700]/60">
                  <li
                    onClick={() => {
                      handleSelect("/allworkers"),
                        setIsProductDropdownOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:text-[#EE4E4E] cursor-pointer transition"
                  >
                    All Workers
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/electrician"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:text-[#EE4E4E] cursor-pointer transition"
                  >
                    Electrician
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/painting"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:text-[#EE4E4E] cursor-pointer transition"
                  >
                    Home Painter
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/construction"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:text-[#EE4E4E] cursor-pointer transition"
                  >
                    Construction
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/renovation"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:text-[#EE4E4E] cursor-pointer transition"
                  >
                    Renovation
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/plumbing"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:text-[#EE4E4E] cursor-pointer transition"
                  >
                    Plumbing
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/electronicdevice"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:text-[#EE4E4E] cursor-pointer transition"
                  >
                    Electronic Device
                  </li>
                </ul>
              )}
            </div>

            <Link to="/orders" className="hover:text-[#03A6A1] transition">
              Orders
            </Link>
            <Link to="/about" className="hover:text-[#03A6A1] transition">
              About
            </Link>

            {user?.user?.email === "asadalam4291@gmail.com" ||
              (user?.user?.email === "asadalamalig@gmail.com" && (
                <Link to="/dashboard" className="text-[#EE4E4E] font-bold">
                  Admin
                </Link>
              ))}
          </nav>
        </div>

        {/* Right Section - Search, Profile, Cart */}
        <div className="flex items-center gap-8">
          {/* Search */}
          <div className="relative hidden sm:flex items-center">
            {!searchBarOpen ? (
              <button
                onClick={() => setSearchBarOpen(true)}
                className="text-xl"
              >
                <RiSearchLine
                  className="text-[#03A6A1] hover:text-[#FF4F0F]"
                  size={21}
                />
              </button>
            ) : (
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                value={searchkey}
                onChange={(e) => setSearchkey(e.target.value)}
                onBlur={() => setSearchBarOpen(false)}
                className="px-4 py-1 border border-[#FFA673] bg-[#FFE3BB]/60 text-[#03A6A1] rounded-md outline-none w-60 transition"
                style={{ maxWidth: "260px" }}
              />
            )}
          </div>

          {/* Profile/Login */}
          {user ? (
            <div className="relative inline-block text-left" ref={userRef}>
              <button
                data-dropdown="user"
                onClick={() => {
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 text-[#FF4F0F] font-bold hover:text-[#03A6A1] transition"
              >
                Profile{" "}
                {isUserDropdownOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {isUserDropdownOpen && (
                <ul className="absolute mt-3 bg-[#FFE3BB] text-[#03A6A1] shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2">
                  <li
                    onClick={() => handleSelect("/profile")}
                    className="hover:text-[#FF4F0F] cursor-pointer"
                  >
                    Profile
                  </li>
                  {hasData ? (
                    <li
                      onClick={() => handleSelect("/join")}
                      className="hover:text-[#FF4F0F] cursor-pointer"
                    >
                      Dashboard
                    </li>
                  ) : (
                    <li
                      onClick={() => handleSelect("/userorders")}
                      className="hover:text-[#FF4F0F] cursor-pointer"
                    >
                      User Orders
                    </li>
                  )}

                  <li
                    onClick={handleLogout}
                    className="hover:text-[#FF4F0F] cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-[#03A6A1] font-bold hover:text-[#FF4F0F] transition"
            >
              <FaUserAlt /> Login
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center text-sm text-[#03A6A1] hover:text-[#FF4F0F] font-bold"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-1">Cart</span>
            <span className="absolute -top-2 -right-3 bg-[#FF4F0F] text-white text-xs rounded-full px-1">
              {(cartItems || []).length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
