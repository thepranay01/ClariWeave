import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Package, Users, ShoppingCart, LogOut, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const stats = [
    { label: 'Total Revenue', value: '₹45,231', icon: BarChart3, color: 'text-green-400' },
    { label: 'Total Orders', value: '1,234', icon: ShoppingCart, color: 'text-blue-400' },
    { label: 'Products', value: '12', icon: Package, color: 'text-purple-400' },
    { label: 'Active Users', value: '892', icon: Users, color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Sidebar / Navigation */}
      <nav className="fixed top-0 left-0 bottom-0 w-64 bg-zinc-900 border-r border-white/5 p-6 hidden md:flex flex-col justify-between">
        <div>
           <div className="mb-10 pl-2">
             <h1 className="text-2xl font-display font-bold">ClariWeave</h1>
             <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Admin Panel</p>
           </div>
           
           <div className="space-y-2">
             <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-white font-medium">
               <BarChart3 size={20} /> Dashboard
             </Link>
             <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors">
               <Package size={20} /> Products
             </Link>
             <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors">
               <ShoppingCart size={20} /> Orders
             </Link>
             <Link to="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors">
               <Users size={20} /> Customers
             </Link>
           </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mt-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <button className="md:hidden p-2 bg-zinc-800 rounded-lg">Menu</button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5"
            >
               <div className="flex justify-between items-start mb-4">
                 <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                   <stat.icon size={24} />
                 </div>
                 {/* Sparkline placeholder */}
               </div>
               <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
               <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity / Content Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Recent Orders</h3>
              <Link to="/admin/orders" className="text-sm text-blue-400 hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
               {/* Mock Order Rows */}
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex justify-between items-center p-4 bg-zinc-800/30 rounded-xl hover:bg-zinc-800/50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">ORD</div>
                      <div>
                        <p className="font-medium text-white">Order #100{i}</p>
                        <p className="text-xs text-muted-foreground">Today, 10:4{i} AM</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-bold text-white">₹{450 * i}</p>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Paid</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
             <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Quick Actions</h3>
             </div>
             <div className="space-y-4">
               <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                 <Plus size={20} /> Add New Product
               </button>
               <button className="w-full py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all flex items-center justify-center gap-2">
                 Manage Inventory
               </button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
