
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
    children: ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    handleLogout: () => void;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void; // Optional if not needed in header
}

export function DashboardLayout({
    children,
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    handleLogout,
    // searchQuery,
    // setSearchQuery
}: DashboardLayoutProps) {
    return (
        <div className="flex font-sans text-gray-900 min-h-screen relative overflow-hidden">
            {/* Mobile Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                handleLogout={handleLogout}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-100 z-20 px-4 py-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">Admin<span className="text-pink-600">Panel</span></h1>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </header>

                {/* Desktop Header (Optional, if we want a top bar for search/user) */}
                <header className="hidden md:flex bg-white border-b border-gray-100 px-8 py-4 items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h2>
                        <p className="text-sm text-gray-500">Manage your store's {activeTab}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></span>
                        </Button>
                        <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-semibold text-gray-900">Admin</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <Avatar className="h-9 w-9 border border-gray-200">
                                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                                <AvatarFallback className="bg-pink-100 text-pink-700">AD</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
