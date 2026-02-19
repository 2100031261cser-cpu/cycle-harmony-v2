
import logo from "@/assets/logo-nhc.jpg";
import { User, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/shop", label: "SHOP NOW" },
        { href: "/#about", label: "ABOUT" },
        { href: "/#contact", label: "CONTACT US" },
    ];

    return (
        <nav className="w-full bg-wellness-cream/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <a href="/">
                        <img
                            src={logo}
                            alt="NHC Natural Health Care Services"
                            className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-full"
                        />
                    </a>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-semibold tracking-wide text-gray-700 hover:text-pink-600 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-4">
                    {/* Search Icon */}
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5 text-gray-600 hover:text-pink-500" />
                    </button>

                    {/* User Profile Icon */}
                    <a
                        href="/profile"
                        className="flex items-center text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
                        aria-label="Customer Profile"
                    >
                        <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all border border-pink-100">
                            <User className="h-5 w-5 text-pink-500" />
                        </div>
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-gradient-to-r from-wellness-cream/95 via-wellness-green-light/20 to-wellness-pink/20 backdrop-blur-md border-t border-white/30 shadow-lg">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-semibold tracking-wide text-gray-700 hover:text-pink-600 transition-colors py-2 border-b border-gray-100 last:border-b-0"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
