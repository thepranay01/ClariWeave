import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDemoSetup = async () => {
    setLoading(true);
    setError('');
    const demoEmail = 'admin@clariweave.com';
    const demoPass = 'admin123';

    try {
      let user;
      try {
        const res = await signInWithEmailAndPassword(auth, demoEmail, demoPass);
        user = res.user;
      } catch {
        const res = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
        user = res.user;
      }

      if (user) {
        // Seed Products
        const dummyProducts = [
          {
            name: "UltraWeave Pro",
            shortDescription: "The gold standard for screen cleaning.",
            description: "Experience the pinnacle of cleaning technology. High density microfibre.",
            basePrice: 499,
            category: "Screen",
            images: ["https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=1000"],
            variants: [
              { id: "v1_1", name: "Small (6x6\")", color: "Midnight Black", stock: 15, priceModifier: 0 },
              { id: "v1_2", name: "Large (12x12\")", color: "Midnight Black", stock: 10, priceModifier: 200 }
            ]
          },
          {
            name: "GlassMaster X",
            shortDescription: "Specialised weave for windows.",
            description: "Streak-free finish guaranteed. Waffle-weave pattern.",
            basePrice: 349,
            category: "Glass",
            images: ["https://images.unsplash.com/photo-1528740561666-dc24705f08a7?auto=format&fit=crop&q=80&w=1000"],
            variants: [{ id: "v2_1", name: "Standard", color: "Ocean Blue", stock: 25, priceModifier: 0 }]
          },
          {
            name: "LensGuard Mini",
            shortDescription: "Pocket-sized protection for lenses.",
            description: "Your camera's best friend. Compact and ultra-soft.",
            basePrice: 249,
            category: "Lens",
            images: ["https://images.unsplash.com/photo-1626573867623-28688439366e?auto=format&fit=crop&q=80&w=1000"],
            variants: [{ id: "v3_1", name: "Mini", color: "Charcoal", stock: 50, priceModifier: 0 }]
          }
        ];

        // Check if products already exist to avoid duplicates
        // For simplicity in this demo function, we just add. 
        // In a real app we might check first.
        
        for (const p of dummyProducts) {
          await addDoc(collection(db, 'products'), {
            ...p,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
        alert("Success! Account created and products seeded. Logging you in...");
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError("Setup failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  const handleForceSeed = async () => {
    setLoading(true);
    setError('');
    try {
      const dummyProducts = [
        {
          name: "UltraWeave Pro",
          shortDescription: "The gold standard for screen cleaning.",
          description: "Experience the pinnacle of cleaning technology. High density microfibre.",
          basePrice: 499,
          category: "Screen",
          images: ["https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=1000"],
          variants: [
            { id: "v1_1", name: "Small (6x6\")", color: "Midnight Black", stock: 15, priceModifier: 0 },
            { id: "v1_2", name: "Large (12x12\")", color: "Midnight Black", stock: 10, priceModifier: 200 }
          ]
        },
        {
          name: "GlassMaster X",
          shortDescription: "Specialised weave for windows.",
          description: "Streak-free finish guaranteed. Waffle-weave pattern.",
          basePrice: 349,
          category: "Glass",
          images: ["https://images.unsplash.com/photo-1528740561666-dc24705f08a7?auto=format&fit=crop&q=80&w=1000"],
          variants: [{ id: "v2_1", name: "Standard", color: "Ocean Blue", stock: 25, priceModifier: 0 }]
        },
        {
          name: "LensGuard Mini",
          shortDescription: "Pocket-sized protection for lenses.",
          description: "Your camera's best friend. Compact and ultra-soft.",
          basePrice: 249,
          category: "Lens",
          images: ["https://images.unsplash.com/photo-1626573867623-28688439366e?auto=format&fit=crop&q=80&w=1000"],
          variants: [{ id: "v3_1", name: "Mini", color: "Charcoal", stock: 50, priceModifier: 0 }]
        }
      ];

      for (const p of dummyProducts) {
        await addDoc(collection(db, 'products'), {
          ...p,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      alert("Success! Products seeded via bypass. Redirecting to Shop...");
      navigate('/shop');
    } catch (err) {
      setError("Force Seed failed: " + err.message + ". You might need to set Firestore Rules to 'allow write: if true' in Firebase Console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-2xl border border-white/10">
        <h1 className="text-2xl font-display font-bold text-white mb-6 text-center">ClariWeave Admin</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Login'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-4">
            <div>
                <p className="text-sm text-muted-foreground mb-2">Issue with Firebase Auth?</p>
                <button 
                    onClick={handleForceSeed}
                    disabled={loading}
                    className="text-amber-400 text-sm font-bold hover:text-amber-300 transition-colors uppercase tracking-wider"
                >
                    🚀 Force Seed (Bypass Auth)
                </button>
            </div>
            
            <div className="pt-2">
                <button 
                    onClick={handleDemoSetup}
                    disabled={loading}
                    className="text-white text-xs font-medium hover:text-white/80 transition-colors underline underline-offset-4"
                >
                    Try Quick Setup again
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
;

export default AdminLogin;
