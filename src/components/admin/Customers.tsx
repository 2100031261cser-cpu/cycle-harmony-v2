
import { useState } from "react";
import { Users, Search, ShoppingBag, DollarSign, Calendar, MapPin, Phone, Edit, Trash2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface CustomersProps {
    customers: any[];
    orders: any[]; // Needed to show order history for a customer
    handleEditCustomerClick: (customer: any) => void;
    handleDeleteCustomerClick: (id: string) => void;
}

export function Customers({ customers, orders, handleEditCustomerClick, handleDeleteCustomerClick }: CustomersProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

    const safeCustomers = Array.isArray(customers) ? customers : [];
    const safeOrders = Array.isArray(orders) ? orders : [];

    const filteredCustomers = safeCustomers.filter(c =>
        (c.fullName && c.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.phone && c.phone.includes(searchTerm)) ||
        (c.customerId && c.customerId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getCustomerOrders = (phone: string) => {
        if (!phone) return [];
        return safeOrders
            .filter(o => o.phone === phone)
            .sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
            });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search customers by name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/80 backdrop-blur-sm shadow-sm border-gray-200"
                    />
                </div>
                <div className="text-sm text-gray-500">
                    Showing {filteredCustomers.length} customers
                </div>
            </div>

            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="font-bold">Customer</TableHead>
                            <TableHead className="font-bold">Phone</TableHead>
                            <TableHead className="font-bold text-center">Orders</TableHead>
                            <TableHead className="font-bold text-center">Spent</TableHead>
                            <TableHead className="font-bold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCustomers.map((customer) => (
                            <TableRow key={customer.phone || Math.random()} className="hover:bg-pink-50/30 transition-colors group">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm shrink-0">
                                            <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold text-xs">
                                                {customer.fullName?.charAt(0) || 'C'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                                                {customer.fullName || 'Unknown'}
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{customer.customerId}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-gray-600">
                                    {customer.phone || 'N/A'}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100 rounded-md font-bold px-2 py-0.5">
                                        {customer.totalOrders || 0}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center font-bold text-green-600">
                                    ₹{(customer.totalSpent || 0).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-gray-400 hover:text-pink-600 hover:bg-pink-50"
                                            onClick={() => handleEditCustomerClick(customer)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 text-xs font-semibold border-gray-100 hover:border-pink-200 hover:bg-white text-gray-600 hover:text-pink-600"
                                            onClick={() => setSelectedCustomer(customer)}
                                        >
                                            History
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredCustomers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                    No customers found matching your search.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>

            {/* Customer Details Dialog */}
            <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Customer Profile</DialogTitle>
                        <DialogDescription>View detailed information and order history.</DialogDescription>
                    </DialogHeader>

                    {selectedCustomer && (
                        <div className="space-y-8">
                            {/* Profile Header */}
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white text-2xl">
                                        {selectedCustomer.fullName?.charAt(0) || 'C'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.fullName || 'Unknown'}</h2>
                                    <div className="flex items-center gap-4 text-gray-500 mt-1">
                                        <span className="flex items-center gap-1 text-sm"><Phone className="w-3.5 h-3.5" /> {selectedCustomer.phone || 'N/A'}</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-sm font-mono">{selectedCustomer.customerId}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                                            {selectedCustomer.totalOrders || 0} Orders
                                        </Badge>
                                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                                            Lifetime Value: ₹{(selectedCustomer.totalSpent || 0).toLocaleString()}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Addresses */}
                            {selectedCustomer.addresses && Array.isArray(selectedCustomer.addresses) && selectedCustomer.addresses.length > 0 && (
                                <Card className="border-gray-100 bg-gray-50/50">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-bold text-gray-500 uppercase">Saved Addresses</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-3">
                                            {selectedCustomer.addresses.map((addr: any, idx: number) => (
                                                <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded border border-gray-100">
                                                    <MapPin className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                                                    <div className="text-sm">
                                                        <p className="font-semibold text-gray-800">{addr.label || 'Home'}</p>
                                                        <p className="text-gray-500">{addr.house}, {addr.area}</p>
                                                        <p className="text-gray-500">{addr.pincode}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Order History Timeline */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    Order History
                                </h3>
                                <div className="space-y-4">
                                    {getCustomerOrders(selectedCustomer.phone).length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No orders found for this customer.</p>
                                    ) : (
                                        getCustomerOrders(selectedCustomer.phone).map((order) => (
                                            <div key={order._id || Math.random()} className="relative pl-8 pb-4 border-l-2 border-gray-100 last:border-0 last:pb-0 group">
                                                <div className="absolute -left-[9px] top-0 bg-white border-2 border-gray-200 rounded-full w-4 h-4 group-hover:border-pink-500 group-hover:scale-110 transition-all"></div>
                                                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-800">Order #{order.orderId || (order._id ? order._id.toString().slice(-6).toUpperCase() : 'N/A')}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown Date'}
                                                                {' '}at{' '}
                                                                {order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : ''}
                                                            </p>
                                                        </div>
                                                        <StatusBadge status={order.orderStatus} />
                                                    </div>
                                                    <div className="flex items-center justify-between mt-3 text-sm">
                                                        <div className="space-y-1">
                                                            <p className="text-gray-600"><span className="font-medium text-gray-900">{order.phase}</span> • {order.totalQuantity} laddus</p>
                                                            <p className="text-gray-500">{order.totalWeight}g</p>
                                                        </div>
                                                        <p className="font-bold text-lg text-green-600">₹{order.totalPrice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        {selectedCustomer?.customerId && (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    if (window.confirm("Are you sure? This will delete the customer and all related orders.")) {
                                        handleDeleteCustomerClick(selectedCustomer._id);
                                        setSelectedCustomer(null);
                                    }
                                }}
                            >
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Customer
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
