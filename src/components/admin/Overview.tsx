
import { StatsCard } from "./StatsCard";
import { Users, ShoppingCart, DollarSign, TrendingUp, Package, Clock, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OverviewProps {
    stats: any;
    revenueData: any[];
    products: any[];
    loading: boolean;
}

export function Overview({ stats, revenueData, products, loading }: OverviewProps) {
    if (loading || !stats) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    // Transform revenueData for Recharts if needed, or use as is
    // revenueData is likely [{ day: 1, revenue: 100, count: 2 }, ...]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Customers"
                    value={stats.overview.totalCustomers}
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    title="Total Orders"
                    value={stats.overview.totalOrders}
                    icon={ShoppingCart}
                    color="purple"
                />
                <StatsCard
                    title="Total Revenue"
                    value={`₹${stats.overview.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="green"
                />
                <StatsCard
                    title="Delivered"
                    value={stats.orderStatus.delivered}
                    icon={TrendingUp}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2 border-none shadow-xl rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            {revenueData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            formatter={(value: any) => [`₹${value}`, 'Revenue']}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    No revenue data available for this month
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Inventory Status */}
                <Card className="border-none shadow-xl rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-pink-500" />
                            Inventory Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">No product data</div>
                            ) : (
                                products.map((product: any) => (
                                    <div key={product._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{product.name} Laddus</p>
                                            <p className="text-xs text-gray-500">₹{product.price} / {product.unit}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-sm font-bold ${product.stock < 20 ? 'text-red-500' : 'text-green-500'}`}>
                                                {product.stock} left
                                            </p>
                                            {product.stock < 20 && (
                                                <Badge variant="destructive" className="text-[10px] h-4">Low Stock</Badge>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity / Orders */}
                <Card className="border-none shadow-xl rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                            {stats.recentOrders.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">No recent orders</div>
                            ) : (
                                stats.recentOrders.slice(0, 5).map((order: any) => (
                                    <div key={order._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-pink-50 rounded-full text-pink-500">
                                                <Package className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{order.fullName}</p>
                                                <p className="text-xs text-gray-500">₹{order.totalPrice}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={`
                                    ${order.orderStatus === 'Delivered' ? 'text-green-600 bg-green-50 border-green-100' :
                                                order.orderStatus === 'Cancelled' ? 'text-red-600 bg-red-50 border-red-100' :
                                                    'text-yellow-600 bg-yellow-50 border-yellow-100'}
                                `}>
                                            {order.orderStatus}
                                        </Badge>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
