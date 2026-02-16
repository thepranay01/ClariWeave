import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, LogOut, Package, User as UserIcon } from "lucide-react";
import useAuthStore from "../store/authStore";

const Profile = () => {
  const { user, isAuthenticated, logout, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* User Card */}
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/10 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 group">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center border-2 border-white/20">
                    <UserIcon size={40} className="text-zinc-500" />
                  </div>
                )}

                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={24} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-zinc-500 text-sm mb-6">{user.email}</p>

              <button
                onClick={handleLogout}
                className="w-full py-2 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>

            {/* Navigation */}
            <nav className="bg-zinc-900/50 p-4 rounded-2xl border border-white/10 space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "profile" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
              >
                <UserIcon size={20} /> My Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "orders" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
              >
                <Package size={20} /> My Orders
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === "profile" && (
              <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Profile Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                      disabled
                    />
                    <p className="text-xs text-zinc-500 mt-2">
                      To change your name, please contact support.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Order History
                </h3>
                <div className="text-center py-20 text-zinc-500">
                  <Package size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No orders found.</p>
                  <button
                    onClick={() => navigate("/shop")}
                    className="mt-4 text-white underline hover:no-underline"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
