import React, { useState, useEffect } from 'react';
import { Search, Eye, Loader2 } from 'lucide-react';

import useOrderStore from '../../store/orderStore';

const AdminOrders = () => {
  const { orders, loading, fetchOrders } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground mb-8">View and manage customer orders.</p>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
            />
          </div>
        </div>

        {/* Orders Table */}
         <div className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                 <tr>
                   <td colSpan="7" className="px-6 py-12 text-center text-muted-foreground">
                     <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2" />
                     Loading orders...
                   </td>
                 </tr>
              ) : orders.length === 0 ? (
                 <tr>
                   <td colSpan="7" className="px-6 py-12 text-center text-muted-foreground">No orders found.</td>
                 </tr>
              ) : (
                orders
                  .filter(o => o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.includes(searchTerm))
                  .map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">#{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-white">{order.customerName}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                        {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-white">₹{order.total}</td>
                     <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'delivered' ? 'bg-blue-500/20 text-blue-400' : 
                        order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' : 
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors">
                         <Eye size={18} />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
