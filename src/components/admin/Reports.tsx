
import {
    Calendar, PieChart, LineChart, FileText, Users, Package,
    Download, RefreshCw, TrendingUp, DollarSign, Filter, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatusBadge } from "./StatusBadge";
import { useState } from "react";

interface ReportsProps {
    reportCategory: string;
    setReportCategory: (category: any) => void;
    reportMonth: string;
    setReportMonth: (month: string) => void;
    reportYear: string;
    setReportYear: (year: string) => void;
    handleApplyFilter: () => void;
    handleDownloadPDF: () => void;
    handleDownloadReportCSV: () => void;
    revenueData: any[];
    summaryData: any;
    ordersReportData: any[];
    isExporting: boolean;
    loading: boolean;
}

export function Reports({
    reportCategory, setReportCategory, reportMonth, setReportMonth, reportYear, setReportYear,
    handleApplyFilter, handleDownloadPDF, handleDownloadReportCSV, revenueData, summaryData, ordersReportData,
    isExporting, loading
}: ReportsProps) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const reportTotalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
    const reportTotalOrders = revenueData.reduce((acc, curr) => acc + curr.count, 0);
    const reportAvgOrderValue = reportTotalOrders > 0 ? Math.round(reportTotalRevenue / reportTotalOrders) : 0;

    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left: Reports Sidebar */}
            <div className="flex flex-col gap-6 w-full lg:w-72 shrink-0">
                {/* Mobile Toggle */}
                <div className="lg:hidden">
                    <Button variant="outline" className="w-full flex justify-between" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
                        <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Report Menu</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${mobileSidebarOpen ? 'rotate-90' : ''}`} />
                    </Button>
                </div>

                <div className={`flex flex-col gap-6 ${mobileSidebarOpen ? 'block' : 'hidden'} lg:flex`}>
                    {/* Section 1: Monthly Report Filter */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <Calendar className="w-4 h-4 text-green-600" /> Monthly Report
                        </h4>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                <Select value={reportMonth} onValueChange={setReportMonth}>
                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                            <SelectItem key={m} value={m.toString()}>
                                                {new Date(0, m - 1).toLocaleString('default', { month: 'short' })}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={reportYear} onValueChange={setReportYear}>
                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[2024, 2025, 2026].map(y => (
                                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-9" onClick={handleApplyFilter}>
                                Apply Filter
                            </Button>
                        </div>
                    </div>

                    {/* Section 2: Report Type */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 overflow-hidden">
                        <div className="p-4 pb-2">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Report Type</h4>
                        </div>
                        <div className="flex flex-col gap-1 p-2">
                            {[
                                { id: 'summary', label: 'Monthly Summary', icon: PieChart },
                                { id: 'revenue', label: 'Revenue Report', icon: LineChart },
                                { id: 'orders_report', label: 'Orders Report', icon: FileText },
                                { id: 'customers', label: 'Customer Insights', icon: Users },
                                { id: 'inventory', label: 'Product Inventory', icon: Package },
                            ].map(item => (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    className={`justify-start ${reportCategory === item.id ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    onClick={() => setReportCategory(item.id)}
                                >
                                    <item.icon className="w-4 h-4 mr-3" /> {item.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Downloads */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <Download className="w-4 h-4 text-green-600" /> Downloads
                        </h4>
                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full justify-start text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                                onClick={handleDownloadPDF}
                                disabled={isExporting}
                            >
                                {isExporting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin text-red-500" /> : <FileText className="w-4 h-4 mr-2 text-red-500" />}
                                Download PDF
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                                onClick={handleDownloadReportCSV}
                                disabled={isExporting}
                            >
                                {isExporting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin text-green-500" /> : <TrendingUp className="w-4 h-4 mr-2 text-green-500" />}
                                Export CSV
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Reports Content Area */}
            <div className="flex-1 space-y-6">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <RefreshCw className="w-8 h-8 animate-spin text-green-500" />
                    </div>
                ) : (
                    <>
                        {/* REVENUE REPORT */}
                        {reportCategory === 'revenue' && (
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Revenue Performance</h3>
                                            <p className="text-sm text-gray-500">Sales Trends over time</p>
                                        </div>
                                    </div>

                                    <div className="h-[300px] w-full">
                                        {revenueData.length > 0 ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={revenueData}>
                                                    <defs>
                                                        <linearGradient id="colorRevenueGraph" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                                                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                    <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                        formatter={(value: any) => [`₹${value}`, 'Revenue']}
                                                    />
                                                    <Area type="monotone" dataKey="revenue" stroke="#16a34a" fillOpacity={1} fill="url(#colorRevenueGraph)" strokeWidth={2} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-400">
                                                No revenue data for this period
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Card className="border-none shadow-sm bg-blue-50/50">
                                        <CardContent className="p-4">
                                            <p className="text-xs font-bold text-blue-500 uppercase">Total Revenue</p>
                                            <p className="text-2xl font-bold text-blue-900 mt-1">₹{reportTotalRevenue.toLocaleString()}</p>
                                            <p className="text-xs text-blue-400 mt-1 flex items-center">
                                                <TrendingUp className="w-3 h-3 mr-1" /> {reportTotalOrders} orders
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-none shadow-sm bg-purple-50/50">
                                        <CardContent className="p-4">
                                            <p className="text-xs font-bold text-purple-500 uppercase">Avg. Order Value</p>
                                            <p className="text-2xl font-bold text-purple-900 mt-1">₹{reportAvgOrderValue.toLocaleString()}</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-none shadow-sm bg-orange-50/50">
                                        <CardContent className="p-4">
                                            <p className="text-xs font-bold text-orange-500 uppercase">Total Orders</p>
                                            <p className="text-2xl font-bold text-orange-900 mt-1">{reportTotalOrders}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {/* MONTHLY SUMMARY */}
                        {reportCategory === 'summary' && summaryData && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Phase Breakdown</CardTitle>
                                            <CardDescription>Sales by Cycle Phase</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {summaryData.phaseStats?.map((stat: any) => (
                                                    <div key={stat._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-3 h-3 rounded-full ${stat._id === 'Phase 1' ? 'bg-pink-400' : 'bg-purple-400'}`}></div>
                                                            <span className="font-medium text-gray-700">{stat._id}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-gray-900">₹{stat.revenue.toLocaleString()}</p>
                                                            <p className="text-xs text-gray-500">{stat.count} orders</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Status Distribution</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-3">
                                                {summaryData.statusStats?.map((stat: any) => (
                                                    <div key={stat._id} className="p-3 border border-gray-100 rounded-lg text-center">
                                                        <StatusBadge status={stat._id} />
                                                        <p className="text-xl font-bold text-gray-900 mt-2">{stat.count}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {/* ORDERS REPORT TABLE */}
                        {reportCategory === 'orders_report' && (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Transactions Report</CardTitle>
                                            <CardDescription>Detailed list of orders for {new Date(0, parseInt(reportMonth) - 1).toLocaleString('default', { month: 'long' })} {reportYear}</CardDescription>
                                        </div>
                                        <Badge variant="outline">{ordersReportData.length} Records</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 font-medium">Date</th>
                                                    <th className="px-6 py-3 font-medium">Order ID</th>
                                                    <th className="px-6 py-3 font-medium">Customer</th>
                                                    <th className="px-6 py-3 font-medium">Phase</th>
                                                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                                                    <th className="px-6 py-3 font-medium text-right">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {ordersReportData.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                                            No orders found for this period
                                                        </td>
                                                    </tr>
                                                ) : ordersReportData.map((order: any) => (
                                                    <tr key={order._id} className="hover:bg-gray-50/50">
                                                        <td className="px-6 py-3 text-gray-500">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-3 font-mono text-gray-600">
                                                            #{order.orderId || order._id.slice(-6).toUpperCase()}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            <p className="font-medium text-gray-900">{order.fullName}</p>
                                                            <p className="text-xs text-gray-400">{order.phone}</p>
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            <Badge variant="secondary" className="bg-pink-50 text-pink-700 border-pink-100">{order.phase}</Badge>
                                                        </td>
                                                        <td className="px-6 py-3 text-right font-bold text-gray-900">
                                                            ₹{order.totalPrice}
                                                        </td>
                                                        <td className="px-6 py-3 text-right">
                                                            <StatusBadge status={order.orderStatus} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* PLACEHOLDERS FOR OTHER TABS */}
                        {(reportCategory === 'customers' || reportCategory === 'inventory') && (
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-lg font-medium text-gray-900 mb-1">Coming Soon</p>
                                <p className="text-sm text-gray-500">Advanced analytics for this category are under development.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
