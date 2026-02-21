
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
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleStatusUpdate: (id: string, status: string, deliveryDate?: string) => void;
    handleDeleteClick: (id: string) => void;
    handleEditClick: (order: any) => void;
    handleWhatsAppSend: (order: any) => void;
    handleAssignDeliveryClick: (order: any) => void;
    sentMessages: Set<string>;
    handleExportCSV: () => void;
    handleEmailNotify: (id: string) => void;
    sentEmails: Set<string>;
}

const statusOptions = [
    { label: "All", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Confirmed", value: "Confirmed" },
    { label: "Processing", value: "Processing" },
    { label: "Shipped", value: "Shipped" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
];

export function Orders({
    orders, orderFilter, setOrderFilter, searchQuery, setSearchQuery, handleStatusUpdate,
    handleDeleteClick, handleEditClick, handleWhatsAppSend, handleAssignDeliveryClick,
    sentMessages, handleExportCSV, handleEmailNotify, sentEmails
}: OrdersProps) {

    const [paymentFilter, setPaymentFilter] = useState("all");
    const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [tempStatus, setTempStatus] = useState<string>("");
    const [deliveryDate, setDeliveryDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const filteredOrders = orders.filter(o => {
        const matchesStatus = orderFilter === 'all' || o.orderStatus === orderFilter;
        const matchesPayment = paymentFilter === 'all' || o.paymentMethod === paymentFilter;
        const matchesSearch = !searchQuery ||
            (o.fullName && o.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (o.phone && o.phone.includes(searchQuery)) ||
            (o.orderId && o.orderId.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesStatus && matchesPayment && matchesSearch;
    });

    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    const onStatusChange = (id: string, status: string) => {
        if (status === "Confirmed") {
            setSelectedOrderId(id);
            setTempStatus(status);
            setIsDateDialogOpen(true);
        } else {
            handleStatusUpdate(id, status);
        }
    };

    const confirmWithDate = () => {
        if (selectedOrderId) {
            handleStatusUpdate(selectedOrderId, tempStatus, deliveryDate);
            setIsDateDialogOpen(false);
            setSelectedOrderId(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Delivery Date Selection Dialog */}
            <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Set Delivery Date</DialogTitle>
                        <DialogDescription>
                            Please select the expected delivery date for this confirmed order.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Date</Label>
                            <Input
                                type="date"
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDateDialogOpen(false)}>Cancel</Button>
                        <Button onClick={confirmWithDate} className="bg-pink-500 hover:bg-pink-600">Confirm Order</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Advanced Filters Bar */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border-none space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search by name, phone, or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-gray-50 border-gray-100 focus:ring-pink-500 h-10 rounded-lg"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        {/* Payment Method Filter */}
                        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                            <SelectTrigger className="w-full md:w-[160px] bg-gray-50 border-gray-100 h-10 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Filter className="w-3.5 h-3.5 text-gray-400" />
                                    <SelectValue placeholder="Payment Method" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Payments</SelectItem>
                                <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
                                <SelectItem value="Online (Razorpay)">Razorpay</SelectItem>
                                <SelectItem value="UPI">UPI</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button onClick={handleExportCSV} variant="outline" className="h-10 border-gray-100 hover:bg-gray-50 text-gray-700 rounded-lg shrink-0">
                            <Download className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Export</span>
                        </Button>
                    </div>
                </div>

                {/* Status Quick Filters */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50">
                    {statusOptions.map((status) => (
                        <button
                            key={status.value}
                            onClick={() => setOrderFilter(status.value)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${orderFilter === status.value
                                ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                                : "bg-gray-50 text-gray-500 hover:bg-pink-50 hover:text-pink-600"
                                }`}
                        >
                            {status.label}
                        </button>
                    ))}
                </div>
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
                                            <span className="text-xs text-gray-400 font-mono">#{order.orderId || (order._id ? order._id.toString().slice(-6).toUpperCase() : 'N/A')}</span>
                                            {/* Email Notify Button */}
                                            {order.email && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEmailNotify(order._id)}
                                                    className={`h-9 w-9 p-0 shadow-sm transition-all ${sentEmails.has(order._id)
                                                            ? "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
                                                            : "border-pink-200 text-pink-500 hover:bg-pink-50 hover:text-pink-600"
                                                        }`}
                                                    title={sentEmails.has(order._id) ? "Email Sent (Click to resend)" : "Send Email Notification"}
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                </Button>
                                            )}

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
                                                onValueChange={(value) => onStatusChange(order._id, value)}
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
