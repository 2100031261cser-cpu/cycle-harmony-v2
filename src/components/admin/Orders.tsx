
import { useState } from "react";
import {
    ShoppingCart, Search, Filter, Download,
    MapPin, MessageSquare, Edit, Trash2, Check, MessageCircle, MoreHorizontal, Truck, User
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface OrdersProps {
    orders: any[];
    orderFilter: string;
    setOrderFilter: (filter: string) => void;
    handleStatusUpdate: (id: string, status: string) => void;
    handleDeleteClick: (id: string) => void;
    handleEditClick: (order: any) => void;
    handleWhatsAppSend: (order: any) => void;
    handleAssignDeliveryClick: (order: any) => void; // New prop
    sentMessages: Set<string>;
    handleExportCSV: () => void;
}

export function Orders({
    orders, orderFilter, setOrderFilter, handleStatusUpdate,
    handleDeleteClick, handleEditClick, handleWhatsAppSend, handleAssignDeliveryClick,
    sentMessages, handleExportCSV
}: OrdersProps) {

    const filteredOrders = orderFilter === 'all'
        ? orders
        : orders.filter(o => o.orderStatus === orderFilter);

    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border-none">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Select value={orderFilter} onValueChange={setOrderFilter}>
                        <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200 focus:ring-pink-500">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Orders</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleExportCSV} variant="outline" className="w-full md:w-auto border-gray-200 hover:bg-gray-50 text-gray-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                </Button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                        <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-1">No orders found</p>
                        <p className="text-sm text-gray-500">Try adjusting your filters</p>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <Card key={order._id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-none shadow-md hover:shadow-xl transition-all duration-200">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    {/* Order Info */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center justify-between md:justify-start gap-4">
                                            <StatusBadge status={order.orderStatus} />
                                            <span className="text-xs text-gray-400 font-mono">#{order.orderId || (order._id ? order._id.slice(-6) : 'N/A')}</span>
                                            {/* Delivery Boy Badge */}
                                            {order.deliveryBoy && (
                                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 flex items-center gap-1">
                                                    <Truck className="w-3 h-3" /> {order.deliveryBoy}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{order.fullName}</h3>
                                                <p className="text-sm text-gray-500 font-medium">{order.phone}</p>
                                            </div>
                                            <div className="text-right md:hidden">
                                                <p className="text-xl font-bold text-green-600">₹{order.totalPrice}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                <ShoppingCart className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{order.totalQuantity} laddus</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                <span>{order.phase}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="truncate max-w-[200px]">{order.address?.area}, {order.address?.pincode}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions & Price (Desktop) */}
                                    <div className="flex flex-col items-end gap-4 justify-between min-w-[200px]">
                                        <div className="hidden md:block text-right">
                                            <p className="text-2xl font-extrabold text-green-600">₹{order.totalPrice}</p>
                                            <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>

                                        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap justify-end">
                                            <Select
                                                value={order.orderStatus}
                                                onValueChange={(value) => handleStatusUpdate(order._id, value)}
                                            >
                                                <SelectTrigger className="w-[130px] h-9 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                                                    <SelectItem value="Processing">Processing</SelectItem>
                                                    <SelectItem value="Shipped">Shipped</SelectItem>
                                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {/* Assign Delivery Boy Button */}
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className={`h-9 w-9 p-0 ${order.deliveryBoy ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-gray-500 hover:text-blue-600'}`}
                                                onClick={() => handleAssignDeliveryClick(order)}
                                                title={order.deliveryBoy ? `Assigned to: ${order.deliveryBoy}` : "Assign Delivery Boy"}
                                            >
                                                <Truck className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-9 w-9 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => handleEditClick(order)}
                                                title="Edit Order"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className={`h-9 w-9 p-0 ${sentMessages.has(order._id) ? 'text-green-600 bg-green-50' : 'text-green-600 hover:bg-green-50'}`}
                                                onClick={() => handleWhatsAppSend(order)}
                                                title="Send WhatsApp Update"
                                            >
                                                {sentMessages.has(order._id) ? <Check className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDeleteClick(order._id)}
                                                title="Delete Order"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
