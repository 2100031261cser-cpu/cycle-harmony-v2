
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Package, Truck, CheckCircle, LogOut, MapPin, Phone, User, Calendar, RefreshCw } from "lucide-react";

interface Order {
    _id: string;
    orderId: string;
    orderDate: string;
    fullName: string;
    phone: string;
    address: {
        house: string;
        area: string;
        landmark: string;
        pincode: string;
        city: string;
        state: string;
        mapLink?: string;
        label?: string;
    };
    totalPrice: number;
    totalQuantity: number;
    phase: string;
    orderStatus: string;
    customerId?: string;
    createdAt: string;
    deliveryBoy?: string;
    paymentMethod?: string;
}

export default function DeliveryDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const deliveryBoyName = localStorage.getItem("adminUsername");

    useEffect(() => {
        checkAuth();
        loadOrders();

        // Auto-refresh every 10 seconds to sync assigned orders
        const interval = setInterval(() => {
            loadOrders(false);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem("deliveryToken");
        const role = localStorage.getItem("userRole");
        if (!token || role !== "delivery") {
            navigate("/admin/login");
        }
    };

    const loadOrders = async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true);
            const token = localStorage.getItem("deliveryToken") || localStorage.getItem("adminToken");
            const name = localStorage.getItem("adminUsername");

            if (!name) {
                toast.error("User not identified");
                return;
            }

            // Fetch orders assigned to this delivery boy
            // Removed status=Shipped to show ALL assigned orders
            const res = await fetch(`${API_BASE_URL}/orders?deliveryBoy=${name}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const responseData = await res.json();
                if (responseData.success && responseData.data) {
                    const assignedOrders = responseData.data;

                    // Sort: specific status priority, then date
                    // Priority: Shipped > Processing > Confirmed > Pending > Delivered
                    const statusPriority: Record<string, number> = {
                        'Shipped': 1,
                        'Processing': 2,
                        'Confirmed': 3,
                        'Pending': 4,
                        'Delivered': 5,
                        'Cancelled': 6
                    };

                    assignedOrders.sort((a: Order, b: Order) => {
                        const pA = statusPriority[a.orderStatus] || 99;
                        const pB = statusPriority[b.orderStatus] || 99;
                        if (pA !== pB) return pA - pB;
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    });

                    setOrders(assignedOrders);
                }
            }
        } catch (error) {
            console.error("Error loading orders:", error);
            if (showLoading) toast.error("Failed to load orders");
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            const token = localStorage.getItem("deliveryToken");
            const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                toast.success(`Order marked as ${newStatus}`);
                loadOrders();
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("deliveryToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("adminUsername");
        navigate("/admin/login");
    };

    const activeOrdersCount = orders.filter(o => ['Shipped', 'Processing', 'Confirmed', 'Pending'].includes(o.orderStatus)).length;

    return (
        <div className="min-h-screen pb-8">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            Delivery Dashboard
                        </h1>
                        <p className="text-xs text-gray-500">Welcome, {deliveryBoyName || 'Partner'}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="flex gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Truck className="w-6 h-6 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Assigned Orders</h2>
                        <Badge variant="secondary" className="ml-2">{activeOrdersCount} Active</Badge>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => loadOrders(true)} title="Refresh Orders">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                        <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No orders assigned to {deliveryBoyName}.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order._id} className={`overflow-hidden transition-all ${order.orderStatus === 'Shipped' ? 'border-blue-200 shadow-sm' : 'opacity-90 bg-gray-50'}`}>
                                <div className={`h-1 w-full ${order.orderStatus === 'Shipped' ? 'bg-blue-500' : order.orderStatus === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`} />
                                <CardContent className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono text-sm font-bold text-gray-700">#{order.orderId ? order.orderId.slice(-6) : order._id.slice(-6)}</span>
                                                <Badge variant={order.orderStatus === 'Shipped' ? 'default' : 'secondary'} className={order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}>
                                                    {order.orderStatus}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        {order.orderStatus === 'Shipped' && (
                                            <Button
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                size="sm"
                                                onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Mark Delivered
                                            </Button>
                                        )}
                                        {order.orderStatus !== 'Shipped' && order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' && (
                                            <Badge variant="outline" className="text-gray-500 text-xs">Waiting for Dispatch</Badge>
                                        )}
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        {/* Customer Info */}
                                        <div className="bg-white p-3 rounded-md border border-gray-100">
                                            <div className="flex items-start gap-2">
                                                <User className="w-4 h-4 text-gray-500 mt-1" />
                                                <div>
                                                    <p className="font-medium text-sm text-gray-900">{order.fullName}</p>
                                                    <a href={`tel:${order.phone}`} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-1">
                                                        <Phone className="w-3 h-3" />
                                                        {order.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address Info */}
                                        <div className="bg-white p-3 rounded-md border border-gray-100">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                                                <div className="text-sm text-gray-600">
                                                    <p>{order.address.house}</p>
                                                    <p>{order.address.area}</p>
                                                    {order.address.landmark && <p className="text-xs text-gray-500 mt-0.5">Note: {order.address.landmark}</p>}
                                                    <p className="font-medium mt-1">{order.address.city}, {order.address.pincode}</p>
                                                    <a
                                                        href={order.address.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${order.address.house}, ${order.address.area}, ${order.address.city}, ${order.address.pincode}`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline mt-2 inline-flex items-center gap-1"
                                                    >
                                                        <MapPin className="w-3 h-3" />
                                                        Get Directions (Map)
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items Summary */}
                                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 p-2 rounded">
                                        <span className="text-sm text-gray-600">
                                            {order.totalQuantity} laddus ({order.phase})
                                        </span>
                                        <div className="text-right">
                                            <span className="block font-bold text-gray-900">₹{order.totalPrice}</span>
                                            <span className="text-xs text-gray-500">{order.paymentMethod}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
