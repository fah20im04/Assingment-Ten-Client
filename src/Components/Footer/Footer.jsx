import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  X,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white px-6 py-14 mt-20">
      <div className="max-w-7xl mx-auto">

        {/* Grid responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold mb-4">TravelEase</h2>
            <p className="text-gray-300 leading-relaxed">
              Your trusted travel partner—helping you explore the world
              with ease, comfort, and style.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">
                Home
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Services
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Vehicles
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">
                FAQ
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Help Center
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>

            <div className="flex flex-wrap items-center gap-4">
              <IconButton icon={<Facebook size={20} />} />
              <IconButton icon={<Instagram size={20} />} />
              <IconButton icon={<Youtube size={20} />} />
              <IconButton icon={<X size={20} />} />
              <IconButton icon={<Linkedin size={20} />} />
              <IconButton icon={<Github size={20} />} />
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center border-t border-white/10 mt-12 pt-6 text-gray-400 text-sm">
          © {new Date().getFullYear()} TravelEase — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

const IconButton = ({ icon }) => (
  <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition flex items-center justify-center">
    {icon}
  </button>
);

export default Footer;
