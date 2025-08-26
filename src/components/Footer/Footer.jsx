import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Mebius</h3>
                        <p className="text-gray-400 mb-4">
                            Your premier destination for contemporary fashion and style.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-pink-400 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-300 transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                            <li><a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-400">
                                <Phone size={16} className="mr-2" />
                                <span>+94 123 456 789</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <Mail size={16} className="mr-2" />
                                <span>info@mebius.com</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <MapPin size={16} className="mr-2" />
                                <span>123 Main St, Colombo</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-400">Monday - Friday</li>
                            <li className="font-medium text-white">9:00 AM - 8:00 PM</li>
                            <li className="text-gray-400 mt-4">Saturday - Sunday</li>
                            <li className="font-medium text-white">10:00 AM - 6:00 PM</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm text-center md:text-left">
                            <p>© 2023 Mebius. All rights reserved.</p>
                            <p className="mt-1">Designed by <span className="text-blue-400">Yasith Wijesuriya</span></p>
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;