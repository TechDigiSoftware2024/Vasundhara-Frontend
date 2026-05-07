// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getOurWorkSummary } from "./api/public/ourWorkApi";

// Fallback data if API fails
const FALLBACK_WORK_ITEMS = [
  { id: "government", title: "Government", link: "/government" },
  { id: "railway", title: "Railways", link: "/railway" },
  { id: "municipal", title: "Municipal Corporation", link: "/municipal-corporation" },
  { id: "bus-stand", title: "Bus Stand", link: "/bus-stand" },
  { id: "gallery", title: "Bus Stand", link: "/gallery" },
  { id: "our-work", title: "our work", link: "/our-work" },

];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [workItems, setWorkItems] = useState([]);
  const [workLoading, setWorkLoading] = useState(true);
  const navRef = useRef(null);
  const location = useLocation();

  // Fetch Our Work items from API
  useEffect(() => {
    const fetchWorkItems = async () => {
      setWorkLoading(true);
      const result = await getOurWorkSummary();

      if (result.success && result.data?.length > 0) {
        // Transform API data to include proper links
        const transformedItems = result.data.map(item => ({
          id: item.id || item._id,
          title: item.title,
          link: `/our-work/${item.id || item._id}`,
          image: item.computedImageUrl || item.coverImageUrl,
        }));
        setWorkItems(transformedItems);
      } else {
        setWorkItems(FALLBACK_WORK_ITEMS);
        console.error("Using fallback work items:", result.error);
      }
      setWorkLoading(false);
    };

    fetchWorkItems();
  }, []);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const toggleMobileDropdown = (menuName) => {
    setMobileDropdown(mobileDropdown === menuName ? null : menuName);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
    setMobileDropdown(null);
    setOpenMenu(null);
  }, [location.pathname]);

  const linkClass = (path) =>
    `relative cursor-pointer flex items-center gap-1 px-2 py-1 transition 
     ${location.pathname === path
      ? "text-green-700 font-semibold"
      : "hover:text-green-800"
    }`;

  // Check if current path is in Our Work section
  const isOurWorkActive = location.pathname.startsWith("/our-work") ||
    workItems.some(item => location.pathname === item.link);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div
        ref={navRef}
        className="container flex justify-between items-center h-16"
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="https://thumbs.dreamstime.com/b/green-leaf-globe-resting-top-design-minimalist-logo-sustainability-focused-ngo-315286237.jpg"
              alt="NGO Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 items-center">
          <li>
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
          </li>

          {/* About Us dropdown */}
          <li className="relative">
            <div
              className={linkClass("/about")}
              onClick={() => toggleMenu("about")}
            >
              <span>About Us</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${openMenu === "about" ? "rotate-180" : ""
                  }`}
              />
            </div>
            {openMenu === "about" && (
              <ul className="absolute bg-white shadow-lg mt-2 rounded-lg p-2 w-48 z-10 border border-gray-100">
                <li>
                  <Link
                    to="/about"
                    className="block w-full p-2 hover:bg-green-50 hover:text-green-600 rounded transition"
                    onClick={() => setOpenMenu(null)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vision-mission"
                    className="block w-full p-2 hover:bg-green-50 hover:text-green-600 rounded transition"
                    onClick={() => setOpenMenu(null)}
                  >
                    Vision & Mission
                  </Link>
                </li>
              </ul>
            )}
          </li>

       <li>
  <Link to="/our-work" className={linkClass("/our-work")}>
    Our Work
  </Link>
</li>
 <li>
  <Link to="/gallery" className={linkClass("/gallery")}>
    Gallery
  </Link>
</li>
          {/* Contact Us */}
          <li>
            <Link to="/contact-us" className={linkClass("/contact-us")}>
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-green-900 p-2"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full p-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Home */}
          <Link
            to="/"
            className={`block p-2 font-semibold rounded transition ${location.pathname === "/"
                ? "text-green-700 bg-green-50"
                : "text-green-900 hover:bg-green-50"
              }`}
            onClick={() => setMobileMenu(false)}
          >
            Home
          </Link>

          {/* About Us Mobile Dropdown */}
          <div>
            <button
              className={`flex justify-between items-center w-full font-semibold p-2 rounded transition ${location.pathname === "/about" || location.pathname === "/vision-mission"
                  ? "text-green-700 bg-green-50"
                  : "text-green-900 hover:bg-green-50"
                }`}
              onClick={() => toggleMobileDropdown("about")}
            >
              <span>About Us</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${mobileDropdown === "about" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {mobileDropdown === "about" && (
              <ul className="mt-2 ml-4 space-y-1 border-l-2 border-green-200 pl-4">
                <li>
                  <Link
                    to="/about"
                    className={`block p-2 rounded transition ${location.pathname === "/about"
                        ? "text-green-700 bg-green-50 font-medium"
                        : "hover:bg-green-50"
                      }`}
                    onClick={() => setMobileMenu(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vision-mission"
                    className={`block p-2 rounded transition ${location.pathname === "/vision-mission"
                        ? "text-green-700 bg-green-50 font-medium"
                        : "hover:bg-green-50"
                      }`}
                    onClick={() => setMobileMenu(false)}
                  >
                    Vision & Mission
                  </Link>
                </li>
              </ul>
            )}
          </div>

        <Link
  to="/our-work"
  className={`block p-2 font-semibold rounded transition ${
    location.pathname === "/our-work"
      ? "text-green-700 bg-green-50"
      : "text-green-900 hover:bg-green-50"
  }`}
  onClick={() => setMobileMenu(false)}
>
  Our Work
</Link>
<Link
  to="/gallery"
  className={`block p-2 font-semibold rounded transition ${
    location.pathname === "/gallery"
      ? "text-green-700 bg-green-50"
      : "text-green-900 hover:bg-green-50"
  }`}
  onClick={() => setMobileMenu(false)}
>
  Gallery
</Link>
         <Link
  to="/contact-us"
  className={`block p-2 font-semibold rounded transition ${
    location.pathname === "/contact-us"
      ? "text-green-700 bg-green-50"
      : "text-green-900 hover:bg-green-50"
  }`}
  onClick={() => {
    setMobileMenu(false);
    setMobileDropdown(null);
  }}
>
  Contact Us
</Link>
        </div>
      )}
    </nav>
  );
}