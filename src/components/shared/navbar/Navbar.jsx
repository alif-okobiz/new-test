
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../logo/Logo';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Services', 
      href: '/services',
      subItems: ['Livestock Support', 'Agricultural Consultancy', 'Pet Care'] 
    },
    { 
      name: 'Shop', 
      href: '/shop',
      subItems: ['Seed', 'Medicine', 'Feed', 'Food'] 
    },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  href={link.href}
                  className="text-gray-600 hover:text-green-600 font-medium transition-colors flex items-center gap-1 py-2"
                >
                  {link.name}
                  {link.subItems && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Dropdown Menu (For Services & Shop) */}
                {link.subItems && (
                  <div className="absolute top-full left-0 w-52 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                    {link.subItems.map((sub) => (
                      <Link
                        key={sub}
                        href={`${link.href}/${sub.toLowerCase().replace(/ /g, '-')}`}
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 border-b last:border-0 border-gray-50"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-6 space-y-4 animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <div key={link.name} className="space-y-2">
              <Link
                href={link.href}
                className="block text-lg font-semibold text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
              {link.subItems && (
                <div className="pl-4 space-y-2 border-l-2 border-green-100">
                  {link.subItems.map(sub => (
                    <Link 
                      key={sub} 
                      href={`${link.href}/${sub.toLowerCase().replace(/ /g, '-')}`}
                      className="block text-gray-500 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;