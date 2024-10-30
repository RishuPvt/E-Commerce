import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Information */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Company</h4>
          <ul>
            <li><a href="/about" className="hover:text-teal-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-teal-400">Contact Us</a></li>
            <li><a href="/careers" className="hover:text-teal-400">Careers</a></li>
            <li><a href="/blog" className="hover:text-teal-400">Blog</a></li>
          </ul>
        </div>
        
        {/* Customer Support */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Customer Support</h4>
          <ul>
            <li><a href="/help" className="hover:text-teal-400">Help Center</a></li>
            <li><a href="/shipping" className="hover:text-teal-400">Shipping & Delivery</a></li>
            <li><a href="/returns" className="hover:text-teal-400">Returns & Refunds</a></li>
            <li><a href="/faq" className="hover:text-teal-400">FAQs</a></li>
          </ul>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul>
            <li><a href="/categories/electronics" className="hover:text-teal-400">Electronics</a></li>
            <li><a href="/login" className="hover:text-teal-400">Account Login</a></li>
            <li><a href="/track-order" className="hover:text-teal-400">Order Tracking</a></li>
            <li><a href="/offers" className="hover:text-teal-400">Special Offers</a></li>
          </ul>
        </div>
        
        {/* Newsletter & Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Stay Connected</h4>
          <form className="mb-4">
            <input 
              type="email" 
              placeholder="Sign Up for updates" 
              className="p-2 rounded w-full mb-2 text-gray-800 focus:ring-2 focus:ring-pink-500"
            />
            <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-2 w-full rounded transition-transform transform hover:scale-105">
              SIGN UP
            </button>
          </form>
          <div className="flex space-x-4 text-white">
            <a href="https://linkedin.com" className="hover:text-teal-400">LinkedIn</a>
            <a href="https://twitter.com" className="hover:text-green-400">Twitter</a>
            <a href="https://youtube.com" className="hover:text-red-500">YouTube</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/privacy-policy" className="hover:text-teal-400">Privacy Policy</a>
          <a href="/terms" className="hover:text-teal-400">Terms & Conditions</a>
          <a href="/cookies" className="hover:text-teal-400">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
