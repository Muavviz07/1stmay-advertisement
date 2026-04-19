import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = ({ onOpenInquiry }) => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="bg-[#05050A] pt-[120px] pb-[60px] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[60px] md:gap-[40px] mb-[100px]">

          {/* Brand Col */}
          <div className="md:col-span-4">
            <img
              src={logo}
              alt="1st May Logo"
              className="h-[80px] w-auto object-contain brightness-0 invert mb-[24px]"
            />
            <p className="text-gray-400 leading-[1.8] max-w-sm mb-[40px]">
              An architect and trailblazer in advertising, delivering creative solutions with measurable business value.
            </p>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4">
            <h3 className="text-[14px] font-bold tracking-[3px] uppercase text-white mb-[32px]">Contact</h3>
            <ul className="space-y-[24px]">
              <li className="flex items-start gap-[16px]">
                <MapPin className="w-[20px] h-[20px] text-secondary shrink-0 mt-1" />
                <span className="text-gray-400 leading-[1.6]">
                  No. 165, 2nd Floor, <br /> Devi Kirupa Apartment,<br /> Baskar Colony, 1st Street,<br /> Saligramam, Chennai 600 093.
                </span>
              </li>
              <li className="flex items-center gap-[16px]">
                <Phone className="w-[20px] h-[20px] text-secondary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+914448594307" className="text-gray-400 hover:text-white transition-colors">+91 44 4859 4307</a>
                  <a href="tel:+917904523814" className="text-gray-400 hover:text-white transition-colors">+91 79045 23814</a>
                </div>
              </li>
              <li className="flex items-center gap-[16px]">
                <Mail className="w-[20px] h-[20px] text-secondary shrink-0" />
                <a href="mailto:admin@1stmay.in" className="text-gray-400 hover:text-white transition-colors">admin@1stmay.in</a>
              </li>
            </ul>
          </div>

          {/* Links Col */}
          <div className="md:col-span-4 flex flex-col md:items-end">
            <div className="w-full md:w-auto">
              <h3 className="text-[14px] font-bold tracking-[3px] uppercase text-white mb-[32px]">Quick Links</h3>
              <ul className="space-y-[16px] text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="hover:text-secondary hover:pl-2 transition-all duration-300 block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-[40px] flex flex-col md:flex-row justify-between items-center gap-[24px]">
          <p className="text-gray-500 text-[14px]">
            © {new Date().getFullYear()} 1st May Advertisement. All rights reserved.
          </p>
          <div className="flex gap-[32px] text-[14px] text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
