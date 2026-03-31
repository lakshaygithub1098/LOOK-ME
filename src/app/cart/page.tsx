"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <main style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }}>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <WhatsAppFloat />

      <div className="cart-page pt-[110px] max-w-6xl mx-auto px-6 pb-20">
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "24px" }}>Your Cart</h1>

        {cart.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>Your cart is empty.</p>
            <Link href="/shop" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cart.map((item) => (
                <div
                  className="cart-item-row"
                  key={`${item.product.id}-${item.size ?? "nosize"}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "96px 1fr auto",
                    gap: "16px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "12px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ position: "relative", width: "96px", height: "120px", borderRadius: "8px", overflow: "hidden" }}>
                    <Image src={item.product.image} alt={item.product.name} fill className="object-contain" sizes="96px" />
                  </div>

                  <div>
                    <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>{item.product.name}</h3>
                    {item.size && (
                      <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "4px" }}>Size: {item.size}</p>
                    )}
                    <p style={{ fontWeight: 600 }}>₹{item.product.price.toLocaleString()}</p>
                  </div>

                  <div className="cart-item-actions" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer" }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div style={{ display: "flex", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
                      <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}>
                        <Minus size={12} />
                      </button>
                      <span style={{ minWidth: "38px", textAlign: "center", padding: "6px 8px", fontSize: "14px" }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "20px", height: "fit-content" }}>
              <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Order Summary</h2>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "var(--text-secondary)" }}>
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px", color: "var(--text-secondary)" }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: "18px" }}>
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>

              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: "10px" }}>Checkout</button>
              <button className="btn-outline" style={{ width: "100%" }} onClick={clearCart}>Clear Cart</button>
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
