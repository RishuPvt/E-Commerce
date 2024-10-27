import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Information */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Company</h4>
          <ul>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/careers" className="hover:text-white">Careers</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
          </ul>
        </div>
        
        {/* Customer Support */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Customer Support</h4>
          <ul>
            <li><a href="/help" className="hover:text-white">Help Center</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping & Delivery</a></li>
            <li><a href="/returns" className="hover:text-white">Returns & Refunds</a></li>
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul>
            <li><a href="/categories/electronics" className="hover:text-white">Electronics</a></li>
            <li><a href="/login" className="hover:text-white">Account Login</a></li>
            <li><a href="/track-order" className="hover:text-white">Order Tracking</a></li>
            <li><a href="/offers" className="hover:text-white">Special Offers</a></li>
          </ul>
        </div>
        
        {/* Newsletter & Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Stay Connected</h4>
          <form className="mb-4">
            <input 
              type="email" 
              placeholder="Sign Up for updates" 
              className="p-2 rounded w-full mb-2 text-gray-800"
            />
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 w-full rounded">SIGN UP</button>
          </form>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" className="hover:text-white">LinkedIn</a>
            <a href="https://twitter.com" className="hover:text-white">Twitter</a>
            <a href="https://youtube.com" className="hover:text-white">YouTube</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms" className="hover:text-white">Terms & Conditions</a>
          <a href="/cookies" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
