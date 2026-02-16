import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        {/* Top Section: CTA & Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">
              Experience The Clarity – <br />
              One Wipe At A Time.
            </h2>
          </div>

          <div className="w-full md:w-auto">
            <p className="mb-4 text-zinc-400">Get In Touch!</p>
            <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/10 rounded-full p-2 pl-6 focus-within:border-white/30 transition-colors w-full md:w-[400px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none text-white placeholder-zinc-500 w-full"
              />
              <button className="bg-white text-black hover:bg-white/90 px-6 py-2 rounded-[20px] font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-16 mb-10">
          {/* Column 1: Contact */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
              Contact Information
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:support@clariweave.com"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
              >
                <Mail size={20} className="text-white" />
                <span>support@clariweave.com</span>
              </a>
              <a
                href="tel:1800-3232-8686"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
              >
                <Phone size={20} className="text-white" />
                <span>1800-3232-8686</span>
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/shop"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/wholesale"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
              Help
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/faq"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white p-2 rounded-[20px] text-black hover:bg-white/90 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-white p-2 rounded-[20px] text-black hover:bg-white/90 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-white p-2 rounded-[20px] text-black hover:bg-white/90 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600">
          <p>© {new Date().getFullYear()} ClariWeave. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="hover:text-zinc-400 transition-colors"
            >
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-zinc-400 transition-colors">
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
