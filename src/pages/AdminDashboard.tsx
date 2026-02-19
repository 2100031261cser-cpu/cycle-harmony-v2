
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

// Import new modular components
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { Overview } from "@/components/admin/Overview";
import { Customers } from "@/components/admin/Customers";
import { Orders } from "@/components/admin/Orders";
import { Reports } from "@/components/admin/Reports";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DELIVERY_BOYS = ["Ram", "Shyam", "Krishna", "Raju", "Suresh", "Mahesh"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState('overview');

  // Reports State
  const [reportCategory, setReportCategory] = useState('revenue');
  const [reportMonth, setReportMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [reportYear, setReportYear] = useState<string>(new Date().getFullYear().toString());

  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Edit/Delete State (Orders)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    phase: '',
    totalQuantity: 0,
    totalWeight: 0,
    totalPrice: 0,
    address: {
      house: '',
      area: '',
      landmark: '',
      pincode: ''
    },
    message: ''
  });

  // Delivery Boy Assignment State
  const [isAssignDeliveryDialogOpen, setIsAssignDeliveryDialogOpen] = useState(false);
  const [assigningOrder, setAssigningOrder] = useState<any>(null);
  const [assignDeliveryForm, setAssignDeliveryForm] = useState({
    name: ''
  });

  // Customer Edit/Delete State
  const [isEditCustomerDialogOpen, setIsEditCustomerDialogOpen] = useState(false);
  const [isDeleteCustomerDialogOpen, setIsDeleteCustomerDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [deletingCustomerId, setDeletingCustomerId] = useState<string | null>(null);
  const [editCustomerForm, setEditCustomerForm] = useState({
    name: '',
    age: '',
    phone: ''
  });

  // WhatsApp Button State
  const [sentMessages, setSentMessages] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('sentWhatsAppMessages');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('sentWhatsAppMessages', JSON.stringify(Array.from(sentMessages)));
  }, [sentMessages]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
    const refreshInterval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(refreshInterval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const searchParams = new URLSearchParams();
      if (searchQuery) searchParams.append('search', searchQuery);

      const [statsRes, ordersRes, customersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/orders/stats`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/orders?limit=20&${searchParams.toString()}`, { headers: { 'Authorization': `Bearer ${token}` } }), // Increased limit slightly
        fetch(`${API_BASE_URL}/customers?${searchParams.toString()}`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const statsBackend = await statsRes.json();
      const ordersData = await ordersRes.json();
      const customersData = await customersRes.json();

      if (!ordersData.success || !ordersData.data) {
        toast.error(ordersData.message || "Failed to load orders.");
        setOrders([]);
        setCustomers([]);
        return;
      }

      setOrders(ordersData.data || []);

      // Process Stats & Customers (Logic from before)
      const totalOrders = statsBackend.data?.totalOrders || 0;
      const totalRevenue = statsBackend.data?.totalRevenue || 0;
      const pendingOrders = statsBackend.data?.pending || 0;
      const deliveredOrders = statsBackend.data?.delivered || 0;

      const dbCustomers = customersData.success ? customersData.data : [];
      const customerMap = new Map();

      dbCustomers.forEach((c: any) => {
        customerMap.set(c.phone, { ...c, totalOrders: 0, totalSpent: 0 });
      });

      // Merge legacy orders into customers
      ordersData.data?.forEach((order: any) => {
        if (!customerMap.has(order.phone)) {
          // Create temp customer from order
          customerMap.set(order.phone, {
            phone: order.phone,
            fullName: order.fullName,
            name: order.fullName,
            age: 'N/A',
            customerId: order.customerId || 'N/A',
            totalOrders: 0,
            totalSpent: 0,
            _id: null
          });
        }
        const customer = customerMap.get(order.phone);
        customer.totalOrders++;
        customer.totalSpent += (order.totalPrice || 0);
        if (!customer.fullName && customer.name) customer.fullName = customer.name;
      });

      setStats({
        overview: { totalCustomers: customerMap.size, totalOrders, totalRevenue },
        orderStatus: { pending: pendingOrders, delivered: deliveredOrders },
        recentOrders: ordersData.data?.slice(0, 5) || [] // Top 5 for overview
      });

      setCustomers(Array.from(customerMap.values()));

    } catch (error) {
      console.error('Error loading data:', error);
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  // --- Handlers ---

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast.success("Order status updated!");
        loadDashboardData();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleWhatsAppSend = (order: any) => {
    let message = "";
    const customerName = order.fullName || "Valued Customer";
    const orderId = order.orderId || (order._id ? order._id.slice(-6).toUpperCase() : 'N/A');

    if (order.orderStatus === 'Confirmed') {
      message = `Hi ${customerName}, your order (ID: ${orderId}) is confirmed ${String.fromCodePoint(0x2705)}`;
    } else if (order.orderStatus === 'Shipped') {
      message = `Hi ${customerName}, your order (ID: ${orderId}) is shipped ${String.fromCodePoint(0x1F69A)}`;
      if (order.deliveryBoy) {
        message += `\nDelivery Partner: ${order.deliveryBoy}`;
      }
    } else if (order.orderStatus === 'Delivered') {
      message = `Hi ${customerName} ${String.fromCodePoint(0x1F337)}\nYour order (Order ID: ${orderId}) has been delivered successfully ${String.fromCodePoint(0x1F4E6)}\nWe hope it supports your wellness journey ${String.fromCodePoint(0x1F495)}`;
    } else {
      message = `Hi ${customerName}, update on your order (ID: ${orderId}): Status is ${order.orderStatus}.`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${order.phone}?text=${encodedMessage}`, '_blank');
    setSentMessages(prev => new Set(prev).add(order._id));
  };


  // --- Order Edit/Delete ---
  const handleEditClick = (order: any) => {
    setEditingOrder(order);
    setEditForm({
      phase: order.phase,
      totalQuantity: order.totalQuantity,
      totalWeight: order.totalWeight,
      totalPrice: order.totalPrice,
      address: {
        house: order.address?.house || '',
        area: order.address?.area || '',
        landmark: order.address?.landmark || '',
        pincode: order.address?.pincode || ''
      },
      message: order.message || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingOrder) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/orders/${editingOrder._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        toast.success("Order updated");
        loadDashboardData();
        setIsEditDialogOpen(false);
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Error updating");
    }
  };

  const handleDeleteClick = (orderId: string) => {
    setDeletingOrderId(orderId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingOrderId) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/orders/${deletingOrderId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("Order deleted");
        loadDashboardData();
        setIsDeleteDialogOpen(false);
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting");
    }
  };

  // --- Delivery Boy Assignment (NEW) ---
  const handleAssignDeliveryClick = (order: any) => {
    setAssigningOrder(order);
    setAssignDeliveryForm({
      name: order.deliveryBoy || ''
    });
    setIsAssignDeliveryDialogOpen(true);
  };

  const handleSaveDeliveryAssignment = async () => {
    if (!assigningOrder) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/orders/${assigningOrder._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          deliveryBoy: assignDeliveryForm.name
        })
      });

      if (response.ok) {
        toast.success("Delivery boy assigned!");
        loadDashboardData();
        setIsAssignDeliveryDialogOpen(false);
      } else {
        toast.error("Failed to assign");
      }
    } catch (err) {
      toast.error("Error assigning delivery boy");
    }
  };

  // --- Customer Edit/Delete ---
  const handleEditCustomerClick = (customer: any) => {
    setEditingCustomer(customer);
    setEditCustomerForm({
      name: customer.fullName || customer.name,
      age: customer.age,
      phone: customer.phone
    });
    setIsEditCustomerDialogOpen(true);
  };

  const handleSaveEditCustomer = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/customers/${editingCustomer._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editCustomerForm)
      });
      if (response.ok) {
        toast.success("Customer updated");
        loadDashboardData();
        setIsEditCustomerDialogOpen(false);
      }
    } catch (err) { toast.error("Update failed"); }
  };

  const handleDeleteCustomerClick = (customerId: string) => {
    setDeletingCustomerId(customerId);
    setIsDeleteCustomerDialogOpen(true);
  };

  const confirmDeleteCustomer = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/customers/${deletingCustomerId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("Customer deleted");
        loadDashboardData();
        setIsDeleteCustomerDialogOpen(false);
      }
    } catch (err) { toast.error("Delete failed"); }
  };

  // --- Report Data Fetching ---
  const [summaryData, setSummaryData] = useState<any>(null);
  const [ordersReportData, setOrdersReportData] = useState<any[]>([]);

  const fetchRevenueData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      setLoading(true);
      const url = `${API_BASE_URL}/orders/revenue-chart?month=${reportMonth}&year=${reportYear}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setRevenueData(data.data);
    } catch (error) { toast.error("Error fetching revenue"); }
    finally { setLoading(false); }
  };

  const fetchMonthlySummary = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      setLoading(true);
      const url = `${API_BASE_URL}/orders/monthly-summary?month=${reportMonth}&year=${reportYear}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setSummaryData(data.data);
    } catch (err) { toast.error("Error fetching summary"); }
    finally { setLoading(false); }
  };

  const fetchOrdersReport = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      setLoading(true);
      const url = `${API_BASE_URL}/orders/report?month=${reportMonth}&year=${reportYear}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setOrdersReportData(data.data);
    } catch (err) { toast.error("Error fetching report"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (activeTab === 'reports' || activeTab === 'overview') {
      // Fetch revenue for overview too
      fetchRevenueData();
    }
    if (activeTab === 'reports') {
      if (reportCategory === 'summary') fetchMonthlySummary();
      if (reportCategory === 'orders_report') fetchOrdersReport();
    }
  }, [activeTab, reportCategory, reportMonth, reportYear]);

  const handleApplyFilter = () => {
    if (reportCategory === 'revenue') fetchRevenueData();
    if (reportCategory === 'summary') fetchMonthlySummary();
    if (reportCategory === 'orders_report') fetchOrdersReport();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsExporting(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/orders/export/pdf?month=${reportMonth}&year=${reportYear}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url;
      a.download = `report.pdf`; document.body.appendChild(a); a.click();
      window.URL.revokeObjectURL(url); document.body.removeChild(a);
    } catch (err) { toast.error("PDF Failed"); } finally { setIsExporting(false); }
  };

  const handleDownloadReportCSV = async () => {
    try {
      setIsExporting(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/orders/export/csv?month=${reportMonth}&year=${reportYear}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url;
      a.download = `report.csv`; document.body.appendChild(a); a.click();
      window.URL.revokeObjectURL(url); document.body.removeChild(a);
    } catch (err) { toast.error("CSV Failed"); } finally { setIsExporting(false); }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Order ID,Name,Phone,Price,Date,Status,Delivery Boy\n"
      + orders.map(e => `${e.orderId || e._id},${e.fullName},${e.phone},${e.totalPrice},${new Date(e.createdAt).toLocaleDateString()},${e.orderStatus},${e.deliveryBoy || ''}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      handleLogout={handleLogout}
    >
      {activeTab === 'overview' && (
        <Overview
          stats={stats}
          revenueData={revenueData}
          loading={loading}
        />
      )}

      {activeTab === 'customers' && (
        <Customers
          customers={customers}
          orders={orders}
          handleEditCustomerClick={handleEditCustomerClick}
          handleDeleteCustomerClick={handleDeleteCustomerClick}
        />
      )}

      {activeTab === 'orders' && (
        <Orders
          orders={orders}
          orderFilter={orderFilter}
          setOrderFilter={setOrderFilter}
          handleStatusUpdate={handleStatusUpdate}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          handleWhatsAppSend={handleWhatsAppSend}
          handleAssignDeliveryClick={handleAssignDeliveryClick}
          sentMessages={sentMessages}
          handleExportCSV={handleExportCSV}
        />
      )}

      {activeTab === 'reports' && (
        <Reports
          reportCategory={reportCategory}
          setReportCategory={setReportCategory}
          reportMonth={reportMonth}
          setReportMonth={setReportMonth}
          reportYear={reportYear}
          setReportYear={setReportYear}
          handleApplyFilter={handleApplyFilter}
          handleDownloadPDF={handleDownloadPDF}
          handleDownloadReportCSV={handleDownloadReportCSV}
          revenueData={revenueData}
          summaryData={summaryData}
          ordersReportData={ordersReportData}
          isExporting={isExporting}
          loading={loading}
        />
      )}

      {/* --- Dialogs --- */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit Order</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Phase</Label>
                <Input value={editForm.phase} onChange={e => setEditForm({ ...editForm, phase: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Quantity</Label>
                <Input type="number" value={editForm.totalQuantity} onChange={e => setEditForm({ ...editForm, totalQuantity: +e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Weight (g)</Label>
                <Input type="number" value={editForm.totalWeight} onChange={e => setEditForm({ ...editForm, totalWeight: +e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Price (₹)</Label>
                <Input type="number" value={editForm.totalPrice} onChange={e => setEditForm({ ...editForm, totalPrice: +e.target.value })} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>House/Flat No.</Label>
              <Input value={editForm.address.house} onChange={e => setEditForm({ ...editForm, address: { ...editForm.address, house: e.target.value } })} />
            </div>
            <div className="grid gap-2">
              <Label>Area/Street</Label>
              <Input value={editForm.address.area} onChange={e => setEditForm({ ...editForm, address: { ...editForm.address, area: e.target.value } })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Landmark</Label>
                <Input value={editForm.address.landmark} onChange={e => setEditForm({ ...editForm, address: { ...editForm.address, landmark: e.target.value } })} />
              </div>
              <div className="grid gap-2">
                <Label>Pincode</Label>
                <Input value={editForm.address.pincode} onChange={e => setEditForm({ ...editForm, address: { ...editForm.address, pincode: e.target.value } })} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Message Card</Label>
              <Textarea value={editForm.message} onChange={e => setEditForm({ ...editForm, message: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Order</DialogTitle><DialogDescription>Are you sure you want to delete this order? This action cannot be undone.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Delivery Boy Dialog */}
      <Dialog open={isAssignDeliveryDialogOpen} onOpenChange={setIsAssignDeliveryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign order to Delivery Boy</DialogTitle>
            <DialogDescription>Select who will deliver this order.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Delivery Boy Name</Label>
              <Select
                value={assignDeliveryForm.name}
                onValueChange={(value) => setAssignDeliveryForm({ ...assignDeliveryForm, name: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery boy" />
                </SelectTrigger>
                <SelectContent>
                  {DELIVERY_BOYS.map((boy) => (
                    <SelectItem key={boy} value={boy}>{boy}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDeliveryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveDeliveryAssignment}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditCustomerDialogOpen} onOpenChange={setIsEditCustomerDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Customer</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input value={editCustomerForm.name} onChange={e => setEditCustomerForm({ ...editCustomerForm, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Phone Number</Label>
              <Input value={editCustomerForm.phone} onChange={e => setEditCustomerForm({ ...editCustomerForm, phone: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCustomerDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEditCustomer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteCustomerDialogOpen} onOpenChange={setIsDeleteCustomerDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Customer</DialogTitle><DialogDescription>This will delete the customer and ALL their associated orders permanently.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteCustomerDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteCustomer}>Delete All Data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}
