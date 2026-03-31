"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { products, getWhatsAppLink } from "@/lib/products";
import { useCart } from "@/components/CartProvider";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  if (!product) notFound();

  const waLink = getWhatsAppLink(
    selectedSize ? `${product.name} (Size: ${selectedSize}, Qty: ${qty})` : `${product.name} (Qty: ${qty})`,
    product.id
  );

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.fabric === product.fabric))
    .slice(0, 4);

  return (
    <main style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }}>
      <Navbar />
      <WhatsAppFloat />

      <div className="pt-[110px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-6 pb-4">
          <div className="breadcrumb flex items-center gap-2 mb-4">
            <Link href="/" style={{ color: "var(--text-muted)", fontSize: "13px" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "var(--text-muted)" }} />
            <Link href="/shop" style={{ color: "var(--text-muted)", fontSize: "13px" }}>Shop</Link>
            <ChevronRight size={12} style={{ color: "var(--text-muted)" }} />
            <span style={{ fontSize: "13px" }}>{product.name}</span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
          <div className="product-page grid grid-cols-1 lg:grid-cols-2" style={{ gap: "60px" }}>
            <section>
              <div style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: "16px" }}>
                {product.images.length > 1 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {product.images.map((img, i) => (
                      <button
                        key={img}
                        onClick={() => setSelectedImage(i)}
                        style={{
                          width: "84px",
                          height: "104px",
                          position: "relative",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: selectedImage === i ? "1px solid var(--text-primary)" : "1px solid var(--border)",
                          background: "#fff",
                        }}
                      >
                        <Image src={img} alt={`View ${i + 1}`} fill className="object-contain" sizes="84px" />
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: "8px", overflow: "hidden", background: "var(--bg-secondary)" }}>
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </section>

            <section className="product-details" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <p style={{ color: "var(--text-muted)", marginBottom: "10px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.08em" }}>
                  {product.category} · {product.fabric}
                </p>
                <h1 style={{ marginBottom: "10px" }}>{product.name}</h1>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  {product.originalPrice && (
                    <span style={{ color: "var(--text-muted)", textDecoration: "line-through", fontSize: "14px" }}>
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span style={{ fontSize: "28px", fontWeight: 600 }}>₹{product.price.toLocaleString()}</span>
                </div>
              </div>

              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>{product.description}</p>

              <div>
                <h3 style={{ fontSize: "16px", marginBottom: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Size</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-btn ${selectedSize === size ? "active" : ""}`}
                      style={{ borderRadius: "8px" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "16px", marginBottom: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Quantity</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", width: "fit-content" }}>
                  <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>
                    <Minus size={14} />
                  </button>
                  <span style={{ minWidth: "44px", textAlign: "center", fontSize: "14px" }}>{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(qty + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  className="btn-primary"
                  style={{ justifyContent: "center", width: "100%", borderRadius: "8px" }}
                  onClick={() => addToCart(product, qty, selectedSize || undefined)}
                >
                  Add to Cart
                </button>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ justifyContent: "center", width: "100%", borderRadius: "8px", backgroundColor: "#25D366", color: "#fff" }}
                >
                  Order on WhatsApp
                </a>

                <Link href="/shop" className="btn-outline" style={{ justifyContent: "center", width: "100%", display: "inline-flex", borderRadius: "8px" }}>
                  Continue Shopping
                </Link>
              </div>
            </section>
          </div>
        </div>

        {related.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-16" style={{ borderTop: "1px solid var(--border)", paddingTop: "48px" }}>
            <h2 style={{ marginBottom: "24px" }}>You May Also Like</h2>
            <div className="recommendation-grid" style={{ display: "grid" }}>
              {related.map((item, index) => (
                <div key={item.id} className="recommendation-card">
                  <ProductCard product={item} index={index} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
