import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t-2 border-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-5 flex justify-center items-center flex-col gap-8 lg:flex-row">
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-900 hover:text-gray-400">
              Home
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-400">
              About
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-400">
              Services
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-400">
              Contact
            </a>
          </nav>
        </div>
        <div className="text-center mb-3">
          <p>
            <em>
              Follow us on social media for updates, insights, and inspiration.
            </em>
          </p>
          <p>© 2024 EduFlex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
