import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiSun,
  FiMoon,
  FiSettings,
  FiMessageSquare,
  FiFileText,
  FiMoreVertical,
  FiUser,
  FiMenu,
  FiHome,
  FiTrendingUp,
  FiPieChart,
  FiDollarSign,
  FiZap,
  FiRss,
  FiTool,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import LoginModal from "../../components/Auth/LoginModal";
import RegisterModal from "../../components/Auth/RegisterModal";


const newsDropdownItems = [
  { label: "Overview", value: "overview" },
  { label: "Exchange News", value: "exchange" },
  { label: "Topic News", value: "topic" },
  { label: "Business News", value: "business" },
];

const vietcapIqDropdownItems = [
  { label: "Coverage", value: "coverage" },
  { label: "Report", value: "report" },
  { label: "Company", value: "company/VCB" }, 
  { label: "Sector", value: "sector" },
  { label: "Market", value: "market" },
  { label: "Screening", value: "screening" },
  { label: "Chart", value: "chart" },
  { label: "Events", value: "events" },
];

const menuItems = [
  { label: "Home", path: "/home", icon: <FiHome className="mr-1" /> },
  { label: "Market", path: "/market", icon: <FiTrendingUp className="mr-1" /> },
  { label: "Asset Info", path: "/assets", icon: <FiPieChart className="mr-1" /> },
  { label: "Plan", path: "/plan", icon: <FiDollarSign className="mr-1" /> },
  { label: "Utilities", path: "/utilities", icon: <FiTool className="mr-1" /> },
];

const Header = ({ activeNewsType, setActiveNewsType }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Using theme from context instead of local state
  const { theme, toggleTheme } = useTheme();
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [vietcapDropdownOpen, setVietcapDropdownOpen] = useState(false);
  const dropdownTimer = useRef(null);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Auth context integration
  const { user, logout } = useAuth();
  const currentUser = user;

  const handleOpenLogin = () => setIsLoginModalOpen(true);
  const handleCloseLogin = () => setIsLoginModalOpen(false);
  const handleOpenRegister = () => setIsRegisterModalOpen(true);
  const handleCloseRegister = () => setIsRegisterModalOpen(false);
  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };
  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  // Removed local toggleDarkMode, now using toggleTheme from context

  const handleNewsDropdownClick = (type) => {
    setNewsDropdownOpen(false);
    if (location.pathname.startsWith("/news") && typeof setActiveNewsType === "function") {
      setActiveNewsType(type);
    }
    navigate(`/ai-news/${type}`);
  };

  const handleVietcapDropdownClick = (value) => {
    setVietcapDropdownOpen(false);
    // Navigate directly to the value, which now includes the symbol for 'company'
    navigate(`/vietcap-iq/${value}`);
  };

  const handleMouseEnter = (type) => {
    clearTimeout(dropdownTimer.current);
    if (type === "vietcap") {
      setNewsDropdownOpen(false);
      setVietcapDropdownOpen(true);
    }
    if (type === "news") {
      setVietcapDropdownOpen(false);
      setNewsDropdownOpen(true);
    }
  };

  const handleMouseLeave = (type) => {
    dropdownTimer.current = setTimeout(() => {
      if (type === "vietcap") setVietcapDropdownOpen(false);
      if (type === "news") setNewsDropdownOpen(false);
    }, 200);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);


  return (
    <div className={`w-full bg-black text-white relative`}>
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 h-12">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FiMenu />
          </button>
          <span className="font-extrabold text-2xl text-yellow-400 tracking-wide">
            Stock AI
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={searchRef}>
            <div
              className={`flex items-center px-3 py-2 rounded-full transition-all duration-300 ${searchOpen ? 'bg-gray-800 border border-yellow-500' : 'bg-gray-800 hover:bg-gray-700'}`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch className="text-xl text-gray-400 hover:text-yellow-400 cursor-pointer" />
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Tìm kiếm mã CK, tin tức..."
                  autoFocus
                  className="ml-2 bg-transparent border-none outline-none text-white w-50 placeholder-gray-400"
                />
              )}
            </div>

            {searchOpen && (
              <div className="absolute right-0 mt-2 w-[32rem] bg-gray-800 text-white rounded-xl shadow-lg z-50 border border-gray-700 overflow-hidden animate-fadeIn">
                <div className="p-1 bg-gradient-to-r from-yellow-600 to-yellow-500"></div>

                <div className="border-t border-gray-700">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-300">Mã phổ biến</h3>
                      <span className="text-xs text-yellow-500 bg-yellow-500 bg-opacity-10 px-2 py-1 rounded">Khuyến nghị</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { ticker: "VIC", price: "98.50", change: "+1.2%" },
                        { ticker: "HPG", price: "35.20", change: "+0.8%" },
                        { ticker: "VHM", price: "72.40", change: "-0.3%" },
                        { ticker: "MWG", price: "120.75", change: "+2.1%" }
                      ].map((stock) => (
                        <div
                          key={stock.ticker}
                          className="p-2 bg-gray-900 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors border border-gray-800 hover:border-yellow-500 hover:shadow-md"
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-white">{stock.ticker}</span>
                            <span className={`text-xs px-1 rounded ${stock.change.startsWith('+') ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                              {stock.change}
                            </span>
                          </div>
                          <div className="text-sm text-gray-300 mt-1">{stock.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 p-4 bg-gray-900">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Nhấn <kbd className="mx-1 px-2 py-1 bg-gray-800 rounded text-xs">Enter</kbd> để tìm kiếm</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User authentication buttons or profile */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)} // Reusing dropdownOpen for profile dropdown
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-200 focus:outline-none"
              >
                <img
                  src={currentUser.photoURL || `https://placehold.co/32x32/333/fff?text=${currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-emerald-500"
                />
                <span className="hidden sm:inline font-medium">{currentUser.displayName || currentUser.email}</span>
                <svg className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-black text-white rounded-lg shadow-2xl z-50 border border-yellow-400 py-2 animate-fadeIn">
                  <ul className="text-sm">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                      <FiSettings className="mr-2" /> Settings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                      <FiMessageSquare className="mr-2" /> Contact
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                      <FiFileText className="mr-2" /> Terms
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                      onClick={toggleTheme} // Use toggleTheme from context
                    >
                      <span className="flex items-center">
                        {theme === 'dark' ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
                        Theme
                      </span>
                      <span className="ml-auto text-yellow-300">{theme === 'dark' ? "☀️" : "🌙"}</span>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                      onClick={async () => {
                        await logout();
                        setDropdownOpen(false); // Close dropdown after logout
                        navigate('/login'); // Redirect to login page
                      }}
                    >
                      <FiUser className="mr-2" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <button
                className="px-3 py-1 rounded text-sm bg-green-600 hover:bg-green-700 text-white transition"
                onClick={handleOpenRegister}
              >
                Open Account
              </button>
              <button
                className="px-3 py-1 rounded text-sm bg-yellow-400 hover:bg-yellow-500 text-black transition"
                onClick={handleOpenLogin}
              >
                <FiUser className="inline mr-1" />
                Login
              </button>
            </div>
          )}

          {/* More Vertical Icon (for mobile or additional options) */}
          <div className="relative md:hidden"> {/* Only show on mobile */}
            <FiMoreVertical
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-xl cursor-pointer hover:text-yellow-400 transition"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-black text-white rounded-lg shadow-2xl z-50 border border-yellow-400 py-2 animate-fadeIn">
                <ul className="text-sm">
                  {/* Mobile-specific menu items if needed */}
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FiSettings className="mr-2" /> Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FiMessageSquare className="mr-2" /> Contact
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FiFileText className="mr-2" /> Terms
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                    onClick={toggleTheme}
                  >
                    <span className="flex items-center">
                      {theme === 'dark' ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
                      Theme
                    </span>
                    <span className="ml-auto text-yellow-300">{theme === 'dark' ? "☀️" : "🌙"}</span>
                  </li>
                  {currentUser && (
                    <li
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                      onClick={async () => {
                        await logout();
                        setDropdownOpen(false); // Close dropdown after logout
                        navigate('/login'); // Redirect to login page
                      }}
                    >
                      <FiUser className="mr-2" /> Logout
                    </li>
                  )}
                  {!currentUser && (
                    <>
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center" onClick={handleOpenRegister}>
                        Open Account
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center" onClick={handleOpenLogin}>
                        Login
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex justify-center items-center h-12 px-4 gap-6 border-t border-gray-600 bg-black text-white text-sm">
        {menuItems.map(({ label, path, icon }, idx) => (
          <Link
            key={idx}
            to={path}
            className="hover:text-yellow-400 transition flex items-center gap-1"
          >
            {icon}
            {label}
          </Link>
        ))}

        {/* Vietcap IQ Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("vietcap")}
          onMouseLeave={() => handleMouseLeave("vietcap")}
        >
          <button className={`hover:text-yellow-400 flex items-center gap-1 transition ${vietcapDropdownOpen ? "text-yellow-400" : ""}`}>
            <FiZap className="mr-1" />
            VIETCAP IQ ▼
          </button>
          {vietcapDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-black text-white rounded shadow-2xl z-50 border border-yellow-400 animate-fadeIn">
              {vietcapIqDropdownItems.map((item) => (
                <button
                  key={item.value}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  onClick={() => handleVietcapDropdownClick(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* News Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("news")}
          onMouseLeave={() => handleMouseLeave("news")}
        >
          <button className={`hover:text-yellow-400 flex items-center gap-1 transition ${newsDropdownOpen ? "text-yellow-400" : ""}`}>
            <FiRss className="mr-1" />
            AI News ▼
          </button>
          {newsDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-black text-white rounded shadow-2xl z-50 border border-yellow-400 animate-fadeIn">
              {newsDropdownItems.map((item) => (
                <button
                  key={item.value}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  onClick={() => handleNewsDropdownClick(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu (Hamburger) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 w-full bg-black text-white shadow-lg z-40 animate-slideInLeft">
          <ul className="py-2">
            {menuItems.map(({ label, path, icon }, idx) => (
              <li key={idx}>
                <Link
                  to={path}
                  className="block px-4 py-3 hover:bg-gray-700 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
            {/* Mobile Vietcap IQ Dropdown */}
            <li className="relative">
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-2"
                onClick={() => setVietcapDropdownOpen(!vietcapDropdownOpen)}
              >
                <FiZap className="mr-1" /> VIETCAP IQ
                <svg className={`ml-auto w-4 h-4 transform transition-transform duration-200 ${vietcapDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {vietcapDropdownOpen && (
                <div className="pl-8 py-1 bg-gray-900">
                  {vietcapIqDropdownItems.map((item) => (
                    <button
                      key={item.value}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                      onClick={() => {
                        handleVietcapDropdownClick(item.value);
                        setMobileMenuOpen(false); // Close mobile menu
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
            {/* Mobile AI News Dropdown */}
            <li className="relative">
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-2"
                onClick={() => setNewsDropdownOpen(!newsDropdownOpen)}
              >
                <FiRss className="mr-1" /> AI News
                <svg className={`ml-auto w-4 h-4 transform transition-transform duration-200 ${newsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {newsDropdownOpen && (
                <div className="pl-8 py-1 bg-gray-900">
                  {newsDropdownItems.map((item) => (
                    <button
                      key={item.value}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                      onClick={() => {
                        handleNewsDropdownClick(item.value);
                        setMobileMenuOpen(false); // Close mobile menu
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
            {/* Mobile Auth Buttons */}
            {!currentUser && (
              <>
                <li>
                  <button
                    className="block w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => { handleOpenRegister(); setMobileMenuOpen(false); }}
                  >
                    Open Account
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => { handleOpenLogin(); setMobileMenuOpen(false); }}
                  >
                    <FiUser className="mr-1" /> Login
                  </button>
                </li>
              </>
            )}
            {currentUser && (
              <li>
                <button
                  className="block w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-2"
                  onClick={async () => {
                    await logout();
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  <FiUser className="mr-1" /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}


      {/* Modals */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />
    </div>
  );
};

export default Header;