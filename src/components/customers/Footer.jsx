import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-200 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Rent<span className="text-accent">Zone</span>
            </h2>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Discover premium products crafted with quality and care.  
              Shop confidently with a modern experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-[--color-accent] cursor-pointer">
                Home
              </li>
              <li className="hover:text-[--color-accent] cursor-pointer">
                Products
              </li>
              <li className="hover:text-[--color-accent] cursor-pointer">
                Categories
              </li>
              <li className="hover:text-[--color-accent] cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-[--color-accent] cursor-pointer">
                Electrical
              </li>
              <li className="hover:text-[--color-accent] cursor-pointer">
                Meson
              </li>
              <li className="hover:text-[--color-accent] cursor-pointer">
                Carpenter
              </li>
              <li className="hover:text-[--color-accent] cursor-pointer">
                Accessories
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a className="p-3 rounded-full bg-white shadow hover:bg-[--color-accent] hover:text-accent transition">
                <FaFacebookF />
              </a>
              <a className="p-3 rounded-full bg-white shadow hover:bg-[--color-accent] hover:text-accent transition">
                <FaInstagram />
              </a>
              <a className="p-3 rounded-full bg-white shadow hover:bg-[--color-accent] hover:text-accent transition">
                <FaTwitter />
              </a>
              <a className="p-3 rounded-full bg-white shadow hover:bg-[--color-accent] hover:text-accent transition">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RentZone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
