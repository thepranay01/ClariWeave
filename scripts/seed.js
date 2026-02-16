import { db, auth } from '../src/firebase/config.js';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

const dummyProducts = [
  {
    name: "UltraWeave Pro",
    shortDescription: "The gold standard for screen cleaning. High density microfibre.",
    description: "Experience the pinnacle of cleaning technology. The UltraWeave Pro uses our highest density microfibre weave to trap even the smallest dust particles without scratching. Perfect for 4K monitors, camera lenses, and delicate glass surfaces.",
    basePrice: 499,
    category: "Screen",
    images: ["https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=1000"],
    variants: [
      { id: "v1_1", name: "Small (6x6\")", color: "Midnight Black", stock: 15, priceModifier: 0 },
      { id: "v1_2", name: "Large (12x12\")", color: "Midnight Black", stock: 10, priceModifier: 200 },
      { id: "v1_3", name: "Small (6x6\")", color: "Arctic White", stock: 5, priceModifier: 0 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "GlassMaster X",
    shortDescription: "Specialised waffle-weave for windows and mirrors.",
    description: "Streak-free finish guaranteed. The GlassMaster X is engineered with a waffle-weave pattern that effortlessly lifts oil and grime from mirrors and windows. No chemicals needed, just water.",
    basePrice: 349,
    category: "Glass",
    images: ["https://unsplash.com/photos/F4FxJsceghg/download?force=true"],
    variants: [
      { id: "v2_1", name: "Standard", color: "Ocean Blue", stock: 25, priceModifier: 0 },
      { id: "v2_2", name: "Standard", color: "Cloud Grey", stock: 12, priceModifier: 0 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "LensGuard Mini",
    shortDescription: "Pocket-sized protection for lenses and eyewear.",
    description: "Your camera's best friend. Compact, ultra-soft, and designed to keep your lenses pristine in any environment. Comes with a protective carrying pouch.",
    basePrice: 249,
    category: "Lens",
    images: ["https://unsplash.com/photos/e-pVfcIVr5o/download?force=true"],
    variants: [
      { id: "v3_1", name: "Mini", color: "Charcoal", stock: 50, priceModifier: 0 },
      { id: "v3_2", name: "Mini", color: "Crimson", stock: 20, priceModifier: 50 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seed() {
  try {
    console.log("Authenticating...");
    const email = 'admin@clariweave.com';
    const password = 'admin123';
    let user;
    
    try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        user = credential.user;
        console.log("Authenticated as existing admin.");
    } catch (signinError) {
        console.log("Sign-in failed (" + signinError.code + "), attempting to create admin user...");
        try {
            const { createUserWithEmailAndPassword } = await import('firebase/auth');
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            user = credential.user;
            console.log("Created and authenticated as new admin user.");
        } catch (createError) {
            console.warn("Failed to create admin user:", createError.message);
        }
    }

    if (!user) {
        console.warn("Proceeding as unauthenticated guest (writes may fail if rules require auth)...");
    }

    console.log("Starting seed process...");

    // Check if there are existing products to avoid duplicates (optional but good practice)
    const productCollection = collection(db, 'products');
    const snapshot = await getDocs(productCollection);
    
    if (!snapshot.empty) {
      console.log(`Found ${snapshot.size} existing products. Deleting them to avoid duplicates/update images...`);
      for (const doc of snapshot.docs) {
        await deleteDoc(doc.ref);
      }
      console.log("Existing products deleted.");
    }

    console.log("Seeding new products...");
    for (const product of dummyProducts) {
      await addDoc(productCollection, product);
      console.log(`Added product: ${product.name}`);
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
