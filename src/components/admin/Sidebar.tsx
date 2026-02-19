import { LayoutDashboard, Users, ShoppingBag, BarChart3, LogOut, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    handleLogout: () => void;
}

export function Sidebar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen, handleLogout }: SidebarProps) {
    return (
        <aside className={`
      fixed md:static inset-y-0 left-0 z-40 w-64 bg-white/70 backdrop-blur-xl border-r border-white/20 flex-shrink-0 
      transform transition-transform duration-300 ease-in-out
      ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      h-full overflow-y-auto shadow-xl md:shadow-none
    `}>
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-transparent">
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Admin<span className="text-pink-600">Panel</span></h1>
                    <p className="text-xs font-medium text-green-600 mt-0.5">Cycle Harmony Laddus</p>
                </div>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <nav className="p-4 space-y-2 mt-4">
                {/* Overview */}
                <Button
                    variant="ghost"
                    onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
                    className={`w-full justify-start transition-all duration-200 ${activeTab === 'overview'
                        ? 'bg-pink-50 text-pink-700 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                        }`}
                >
                    <LayoutDashboard className={`w-5 h-5 mr-3 ${activeTab === 'overview' ? 'text-pink-600' : 'text-gray-400'}`} />
                    Overview
                </Button>

                {/* Orders */}
                <Button
                    variant="ghost"
                    onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }}
                    className={`w-full justify-start transition-all duration-200 ${activeTab === 'orders'
                        ? 'bg-pink-50 text-pink-700 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                        }`}
                >
                    <ShoppingBag className={`w-5 h-5 mr-3 ${activeTab === 'orders' ? 'text-pink-600' : 'text-gray-400'}`} />
                    Orders
                </Button>

                {/* Customers */}
                <Button
                    variant="ghost"
                    onClick={() => { setActiveTab('customers'); setMobileMenuOpen(false); }}
                    className={`w-full justify-start transition-all duration-200 ${activeTab === 'customers'
                        ? 'bg-pink-50 text-pink-700 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                        }`}
                >
                    <Users className={`w-5 h-5 mr-3 ${activeTab === 'customers' ? 'text-pink-600' : 'text-gray-400'}`} />
                    Customers
                </Button>

                {/* Reports */}
                <Button
                    variant="ghost"
                    onClick={() => { setActiveTab('reports'); setMobileMenuOpen(false); }}
                    className={`w-full justify-start transition-all duration-200 ${activeTab === 'reports'
                        ? 'bg-pink-50 text-pink-700 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                        }`}
                >
                    <BarChart3 className={`w-5 h-5 mr-3 ${activeTab === 'reports' ? 'text-pink-600' : 'text-gray-400'}`} />
                    Reports
                </Button>
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-gray-50 bg-white/50 backdrop-blur-sm">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-gray-500 hover:text-red-600 hover:bg-red-50 hover:shadow-sm transition-all"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
