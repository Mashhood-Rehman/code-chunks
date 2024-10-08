import { motion } from "framer-motion";
import Siderbar from "./Siderbar"; // Removed duplicate import
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [bgColor, setBgColor] = useState("transparent");
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setBgColor("bg-black");
    } else {
      setBgColor("bg-transparent");
    }
  };
  const location = useLocation();

  const ScrollToTop = () => {
    if(location.pathname === "/" ) {
      window.scrollTo({
        top:0,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <div className={` ${bgColor} duration-500 ease-in-out`}>
      <>
        {/* Navbar for desktop */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:flex justify-between items-center p-4 bg-transparent"
        >
          <Link to="/"  onClick={ScrollToTop} >
            <img src="/logo-min.webp"  className="h-16 w-16 mt-3" style = {{height: 50 , width:100}} />
          </Link>

          <div>
            <ul className="flex space-x-10">
              <li className="text-white hover:text-orange-500 transition duration-300 ease-in-out">
                <Link  onClick={ScrollToTop}  to="/">Home</Link>
              </li>
              <li className="text-white hover:text-orange-500 transition duration-300 ease-in-out">
                <Link to="/Services">Services</Link>
              </li>
              <li className="text-white hover:text-orange-500 transition duration-300 ease-in-out">
                <Link to="/About">About Us</Link>
              </li>
              <li className="text-white hover:text-orange-500 transition duration-300 ease-in-out">
                <Link to="/Contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="flex space-x-2">
            <Link
              to="https://wa.me/+923316361916"
              target="_blank"
              className="font-semibold font-sans text-white space-x-2 tracking-widest border rounded-2xl px-3 py-2 hover:border-orange-500 hover:text-orange-500 duration-300 ease-in-out"
            >
              <button>Get Started</button> {/* Fixed typo */}
            </Link>
          </div>
        </motion.div>

        {/* Navbar for mobile */}
        <Siderbar />
      </>
    </div>
  );
};

export default Navbar;
