
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-nhc.jpg";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const phoneNumber = "919347122416";
    const email = "nhccycleharmony@gmail.com";

    const handleWhatsAppClick = () => {
        // Open WhatsApp chat
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
    };

    return (
        <footer className="relative pt-24 pb-12 overflow-hidden mt-12 bg-white/30 backdrop-blur-md z-10 border-t border-white/20">
            {/* Parallax Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-wellness-cream via-pink-50/50 to-green-50/50 -z-20"></div>
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: NHC Service */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wellness-green to-green-600 flex items-center justify-center text-white font-bold shadow-lg">NHC</div>
                            <h3 className="font-heading font-bold text-2xl text-gray-800">NHC Service</h3>
                        </div>
                        <p className="text-base text-gray-600 leading-relaxed font-light max-w-xs">
                            Natural Health Care Services dedicated to balancing women's hormones naturally through seed cycling.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-wellness-pink hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-wellness-pink hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-6">
                        <h3 className="font-heading font-bold text-xl text-gray-800 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-wellness-pink after:rounded-full">Quick Links</h3>
                        <ul className="space-y-4 text-gray-600">
                            <li>
                                <a href="/#about" className="flex items-center gap-2 hover:text-wellness-green hover:translate-x-1 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-wellness-green transition-colors"></span>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/#contact" className="flex items-center gap-2 hover:text-wellness-green hover:translate-x-1 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-wellness-green transition-colors"></span>
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/shop" className="flex items-center gap-2 hover:text-wellness-green hover:translate-x-1 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-wellness-green transition-colors"></span>
                                    Shop Laddus
                                </a>
                            </li>
                            <li>
                                <a href="/#cycle-phase-checker" className="flex items-center gap-2 hover:text-wellness-green hover:translate-x-1 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-wellness-green transition-colors"></span>
                                    How it Works
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Policies */}
                    <div className="space-y-6">
                        <h3 className="font-heading font-bold text-xl text-gray-800 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-wellness-pink after:rounded-full">Policies</h3>
                        <ul className="space-y-4 text-gray-600">
                            <li>
                                <a href="/privacy-policy" className="hover:text-wellness-green hover:underline underline-offset-4 transition-all decoration-wellness-green/30">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms-conditions" className="hover:text-wellness-green hover:underline underline-offset-4 transition-all decoration-wellness-green/30">Terms Conditions</a>
                            </li>
                            <li>
                                <a href="/shipping-policy" className="hover:text-wellness-green hover:underline underline-offset-4 transition-all decoration-wellness-green/30">Shipping Policy</a>
                            </li>
                            <li>
                                <a href="/refund-policy" className="hover:text-wellness-green hover:underline underline-offset-4 transition-all decoration-wellness-green/30">Refund</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div className="space-y-6">
                        <h3 className="font-heading font-bold text-xl text-gray-800 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-wellness-pink after:rounded-full">Contact Us</h3>
                        <div className="space-y-5 text-gray-600">
                            <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-2 bg-green-100 rounded-full text-wellness-green">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Phone</p>
                                    <p className="font-medium text-gray-900">+91 91934 71224</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-2 bg-pink-100 rounded-full text-wellness-pink">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Email</p>
                                    <p className="font-medium text-gray-900">nhccycleharmony@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Delivery Area</p>
                                    <p className="font-medium text-gray-900">Hyderabad Only <span className="text-lg">🏠</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200/50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-light">
                    <p>© {currentYear} NHC Natural Health Care Services. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        Made with <span className="text-red-500 animate-pulse">❤</span> for Women's Health
                    </p>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <button
                onClick={handleWhatsAppClick}
                className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 hover:rotate-12 group animate-bounce-slow"
                aria-label="Chat on WhatsApp"
            >
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="relative z-10 drop-shadow-sm"
                >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
            </button>
        </footer>
    );
}
