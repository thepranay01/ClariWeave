import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = useCartStore((state) => state.totalItems);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "py-4 glass" : "py-6 bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-display font-bold tracking-tighter text-white z-50 relative"
        >
          ClariWeave
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          <Link
            to="/"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="relative p-2 text-white/80 hover:text-white transition-colors group"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {/* Auth Link */}
          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            {isAuthenticated ? (
              user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-white/20 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold border border-white/20">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )
            ) : (
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>Login</span>
              </div>
            )}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Drawer Portal */}
        {createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center space-y-8 md:hidden"
              >
                <button
                  className="absolute top-6 right-6 text-white p-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={32} />
                </button>

                <Link
                  to="/"
                  className="text-2xl font-display font-medium text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="text-2xl font-display font-medium text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="text-2xl font-display font-medium text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-2xl font-display font-medium text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>

                <Link
                  to="/cart"
                  className="text-2xl font-display font-medium text-white flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag size={24} />
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-2 bg-white text-black text-sm font-bold px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <Link
                  to={isAuthenticated ? "/profile" : "/login"}
                  className="text-2xl font-display font-medium text-white flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={24} />
                  {isAuthenticated ? "My Profile" : "Login"}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      </div>
    </nav>
  );
};

export default Navbar;
