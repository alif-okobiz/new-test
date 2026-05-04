
import { Mail, Phone, MapPin } from 'lucide-react'; 
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import Logo from '../logo/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-600 text-sm leading-relaxed">
              AgroVet provides modern agricultural solutions and veterinary care to empower farmers for a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="/about" className="hover:text-green-600 font-medium">About Us</a></li>
              <li><a href="/shop" className="hover:text-green-600 font-medium">Products Shop</a></li>
              <li><a href="/services" className="hover:text-green-600 font-medium">Our Services</a></li>
              <li><a href="/contact" className="hover:text-green-600 font-medium">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2"><MapPin size={16} className="text-green-600" /> Gazipur, Bangladesh</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-green-600" /> +880 1234 567890</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-green-600" /> info@agrovet.com</li>
            </ul>
          </div>

          {/* Social Icons - */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AgroVet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;