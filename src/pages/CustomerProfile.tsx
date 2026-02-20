import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Search, Package, Calendar, Clock, CheckCircle, Truck, XCircle,
    User, MapPin, Settings, LogOut, ChevronRight, ShoppingBag, CreditCard
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

const API_BASE_URL = '/api';

export default function CustomerProfile() {
    const [phone, setPhone] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("overview");

    const handleLogin = async (val?: string) => {
        const value = val || phone;
        if (!value) {
            toast.error("Please enter a valid detail");
            return;
        }

        const isEmail = value.includes("@");
        setLoading(true);
        try {
            const url = isEmail
                ? `${API_BASE_URL}/customer-profile-by-email/${encodeURIComponent(value)}`
                : `${API_BASE_URL}/customer-profile/${value}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setCustomer(data.customer);
                setOrders(data.orders);
                setIsLoggedIn(true);
                toast.success("Login Successful");
            } else {
                toast.error("Customer not found", {
                    description: isEmail ? "No profile found with this email." : "No profile found with this number."
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Failed to login. Server might be down.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            const simulatedEmail = "user@gmail.com";
            handleLogin(simulatedEmail);
        }, 1000);
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
            Confirmed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle },
            Processing: { color: "bg-purple-100 text-purple-700", icon: Package },
            Shipped: { color: "bg-indigo-100 text-indigo-700", icon: Truck },
            Delivered: { color: "bg-green-100 text-green-700", icon: CheckCircle },
            Cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
        };

        const variant = variants[status] || variants.Pending;
        const Icon = variant.icon;

        return (
            <Badge variant="secondary" className={`${variant.color} flex items-center gap-1 border-none font-bold`}>
                <Icon className="w-3 h-3" />
                {status}
            </Badge>
        );
    };

    const sidebarItems = [
        { id: "overview", label: "Overview", icon: User },
        { id: "orders", label: "My Orders", icon: ShoppingBag },
        { id: "addresses", label: "Saved Addresses", icon: MapPin },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#fffafa]">
            <Navbar />

            <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
                {!isLoggedIn ? (
                    <div className="max-w-md mx-auto mt-10">
                        <Card className="shadow-2xl border-none bg-white/80 backdrop-blur-md">
                            <CardHeader className="text-center pb-8 border-b border-pink-50">
                                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-12">
                                    <ShoppingBag className="w-8 h-8 text-pink-500 transform -rotate-12" />
                                </div>
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Track Your Journey</CardTitle>
                                <CardDescription className="text-gray-500 mt-2">
                                    Access your wellness orders & profile
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-6">
                                <Button
                                    onClick={handleGoogleLogin}
                                    className="w-full h-12 text-md bg-white border border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-pink-200 transition-all gap-3 shadow-sm"
                                    disabled={loading}
                                >
                                    <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="G" />
                                    {loading ? "Connecting..." : "Continue with Google"}
                                </Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">or use phone</span></div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Registered Phone</label>
                                        <Input
                                            type="tel"
                                            placeholder="e.g. 9876543210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-12 text-lg rounded-xl border-gray-200 focus:ring-pink-500"
                                        />
                                    </div>
                                    <Button
                                        className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg shadow-pink-200"
                                        onClick={() => handleLogin()}
                                        disabled={loading}
                                    >
                                        {loading ? "Fetching Profile..." : "View My Orders"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full md:w-64 space-y-2">
                            <div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-50 mb-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        {customer?.name?.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 truncate">{customer?.name}</p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter truncate font-mono">{customer?.phone || customer?.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    {sidebarItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === item.id
                                                    ? "bg-pink-500 text-white shadow-lg shadow-pink-100"
                                                    : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => setIsLoggedIn(false)}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-400 hover:bg-red-50 transition-all mt-4"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 min-w-0">
                            {/* Overview Tab */}
                            {activeTab === "overview" && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <Card className="border-none shadow-lg bg-white overflow-hidden group">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                                                        <ShoppingBag className="w-5 h-5 text-pink-500" />
                                                    </div>
                                                    <Badge className="bg-pink-50 text-pink-600 border-none">Total</Badge>
                                                </div>
                                                <p className="text-3xl font-black text-gray-900">{orders.length}</p>
                                                <p className="text-sm text-gray-500 font-medium">Orders Placed</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-none shadow-lg bg-white overflow-hidden">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                                        <CreditCard className="w-5 h-5 text-green-500" />
                                                    </div>
                                                    <Badge className="bg-green-50 text-green-600 border-none">Spent</Badge>
                                                </div>
                                                <p className="text-3xl font-black text-gray-900">₹{orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0)}</p>
                                                <p className="text-sm text-gray-500 font-medium">Lifetime Spent</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-none shadow-lg bg-white overflow-hidden sm:col-span-2 lg:col-span-1">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                                        <Calendar className="w-5 h-5 text-purple-500" />
                                                    </div>
                                                </div>
                                                <p className="text-xl font-black text-gray-900">
                                                    {new Date(customer?.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                                </p>
                                                <p className="text-sm text-gray-500 font-medium">Wellness Journey Started</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {orders.length > 0 && (
                                        <Card className="border-none shadow-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                                            <CardHeader>
                                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                                    <Truck className="w-5 h-5" /> Last Order Status
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-4xl font-black mb-1">{orders[0].orderStatus}</p>
                                                        <p className="text-white/80 text-sm">#{orders[0]._id.slice(-6).toUpperCase()} • {orders[0].phase}</p>
                                                    </div>
                                                    <Button onClick={() => setActiveTab("orders")} variant="secondary" className="bg-white text-pink-600 hover:bg-gray-100">
                                                        Track Order
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            )}

                            {/* Orders Tab */}
                            {activeTab === "orders" && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Order History</h2>
                                    {orders.length === 0 ? (
                                        <Card className="border-dashed border-2 py-20 text-center">
                                            <CardDescription>You haven't placed any orders yet.</CardDescription>
                                            <Button variant="link" className="text-pink-600" onClick={() => window.location.href = '/shop'}>Start Shopping</Button>
                                        </Card>
                                    ) : (
                                        orders.map((order) => (
                                            <Card key={order._id} className="border-none shadow-lg bg-white overflow-hidden hover:shadow-xl transition-all">
                                                <div className="p-6">
                                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                                                                <Package className="w-6 h-6 text-gray-400" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                                                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3" />
                                                                    {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-right">
                                                                <p className="text-xl font-black text-gray-900">₹{order.totalPrice}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.totalQuantity} Items</p>
                                                            </div>
                                                            {getStatusBadge(order.orderStatus)}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 rounded-2xl p-4 border border-gray-50">
                                                        <div>
                                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Order Details</h4>
                                                            <div className="space-y-1 text-sm">
                                                                <p className="text-gray-700 font-medium">{order.phase} Healthy Laddus</p>
                                                                <p className="text-gray-500 text-xs">{order.totalWeight}g • {order.cycleLength} Day Cycle</p>
                                                                {order.paymentMethod && (
                                                                    <p className="text-pink-600 text-xs font-bold mt-2">Paid via {order.paymentMethod}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ship to</h4>
                                                            <address className="not-italic text-sm text-gray-600 leading-relaxed">
                                                                {order.address.house}, {order.address.area}<br />
                                                                {order.address.pincode}
                                                            </address>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Addresses Tab */}
                            {activeTab === "addresses" && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {customer?.addresses && customer.addresses.length > 0 ? (
                                            customer.addresses.map((addr: any, idx: number) => (
                                                <Card key={idx} className="border-none shadow-lg bg-white overflow-hidden group">
                                                    <CardContent className="p-6">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                                                                <MapPin className="w-5 h-5 text-pink-500" />
                                                            </div>
                                                            <Badge variant="secondary" className="bg-gray-50 text-gray-500 border-none">{addr.label || 'Other'}</Badge>
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 mb-1">{addr.label || 'Home'}</h4>
                                                        <p className="text-sm text-gray-600 leading-relaxed h-10 overflow-hidden line-clamp-2">
                                                            {addr.house}, {addr.area}, {addr.pincode}
                                                        </p>
                                                        <div className="mt-6 flex justify-end">
                                                            <Button size="sm" variant="ghost" className="text-pink-600 font-bold hover:bg-pink-50">Manage</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            // Fallback if no explicit addresses are found, use address from last order
                                            orders.length > 0 && orders[0].address && (
                                                <Card className="border-none shadow-lg bg-white overflow-hidden group">
                                                    <CardContent className="p-6">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                                                                <MapPin className="w-5 h-5 text-pink-500" />
                                                            </div>
                                                            <Badge variant="secondary" className="bg-gray-50 text-gray-500 border-none">Default</Badge>
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 mb-1">Primary Address</h4>
                                                        <p className="text-sm text-gray-600 leading-relaxed">
                                                            {orders[0].address.house}, {orders[0].address.area}, {orders[0].address.pincode}
                                                        </p>
                                                        <div className="mt-6 flex justify-end">
                                                            <p className="text-[10px] text-gray-400 font-bold italic">Auto-saved from last order</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        )}
                                        <Card className="border-dashed border-2 bg-transparent hover:bg-pink-50/20 transition-all cursor-pointer flex flex-col items-center justify-center p-8">
                                            <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mb-3 text-pink-400">
                                                <XCircle className="w-6 h-6 rotate-45" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-400">Add New Address</p>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === "settings" && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
                                    <Card className="border-none shadow-lg bg-white">
                                        <CardContent className="p-8 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label className="text-gray-500">Full Name</Label>
                                                    <Input value={customer?.name} disabled className="bg-gray-50 border-none rounded-xl h-12" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-gray-500">Phone Number</Label>
                                                    <Input value={customer?.phone} disabled className="bg-gray-50 border-none rounded-xl h-12" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-gray-500">Email Address</Label>
                                                    <Input value={customer?.email || 'Not connected'} disabled className="bg-gray-50 border-none rounded-xl h-12" />
                                                </div>
                                                <div className="space-y-2 text-right flex flex-col justify-end">
                                                    <Button variant="outline" className="h-12 border-pink-100 text-pink-600 hover:bg-pink-50 rounded-xl font-bold">Request Update</Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}

// Sub-components as needed
function Label({ children, className }: { children: React.ReactNode, className?: string }) {
    return <p className={`text-xs font-bold uppercase tracking-widest ${className}`}>{children}</p>;
}
