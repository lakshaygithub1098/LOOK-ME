"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInSection from "@/components/FadeInSection";
import { products } from "@/lib/products";

const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
const summerProducts = products.filter((p) => p.isSummer).slice(0, 4);

// WhatsApp SVG (inline, reused)
const WASvg = () => (
  <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function HomePage() {
  return (
    <main style={{ background: "#fff", color: "var(--text-primary)" }}>
      <Navbar transparentOnTop={false} />
      <WhatsAppFloat />

      {/* ════════════════════════════════════════
          HERO  —  clean, minimalist with image on right
      ════════════════════════════════════════ */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "calc(100vh - 56px)",
          width: "100%",
          alignItems: "stretch",
          paddingTop: "0",
        }}
        className="grid-cols-1 lg:grid-cols-2"
      >
        {/* Left side — text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "60px",
            paddingRight: "40px",
            paddingTop: "40px",
            paddingBottom: "40px",
            background: "#FFFFFF",
            minHeight: "100%",
          }}
          className="px-8 lg:px-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "16px",
                fontWeight: 400,
              }}
            >
              New Collection
            </p>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: "20px",
                color: "var(--text-primary)",
                letterSpacing: "-0.005em",
              }}
            >
              Discover Elegance & Tradition
            </h1>

            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "32px",
                maxWidth: "450px",
                fontWeight: 400,
              }}
            >
              Beautifully crafted kurtis celebrating timeless design. Each piece tells a story of tradition, quality, and dedication to women's fashion.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/shop" className="btn-primary">
                SHOP NOW
              </Link>
              <a
                href="https://wa.me/918700808780?text=Hi, I want to explore your kurti collection!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: "12px" }}
              >
                <WASvg /> MESSAGE
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side — image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-secondary)",
            minHeight: "100%",
          }}
        >
          <Image
            src="/kurti_3.png"
            alt="LOOK@ME Collection"
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "center" }}
            sizes="50vw"
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          CATEGORIES — Clean grid layout
      ════════════════════════════════════════ */}
      <FadeInSection>
      <section style={{ padding: "80px 0", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 500,
              marginBottom: "48px",
              color: "var(--text-primary)",
              textAlign: "center",
            }}
          >
            Shop by Category
          </motion.h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { label: "Festive Collection", image: "/kurti_5.png", href: "/shop?category=Festive" },
              { label: "Casual Kurtis", image: "/kurti_4.png", href: "/shop?category=Casual" },
              { label: "Ethnic Wear", image: "/kurti_8.png", href: "/shop?category=Ethnic" },
            ].map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={cat.href}
                  style={{
                    display: "block",
                    position: "relative",
                    height: "360px",
                    overflow: "hidden",
                    cursor: "pointer",
                    textDecoration: "none",
                    borderRadius: "2px",
                    transition: "all 0.4s ease",
                  }}
                  className="category-link"
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "24px",
                      left: "24px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: "18px",
                        letterSpacing: "0.05em",
                        color: "#FFFFFF",
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ════════════════════════════════════════
          TRENDING — Best Products
      ════════════════════════════════════════ */}
      <FadeInSection>
      <section style={{ padding: "80px 0 0 0", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 500,
              letterSpacing: "-0.005em",
              marginBottom: "48px",
              color: "var(--text-primary)",
              textAlign: "center",
            }}
          >
            Best Sellers
          </motion.h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            {trendingProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link
              href="/shop"
              className="btn-outline"
              style={{ display: "inline-block" }}
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>

          <div style={{ marginTop: "56px", paddingBottom: "56px", borderBottom: "1px solid var(--border)" }} />
        </div>
      </section>
      </FadeInSection>

      {/* ════════════════════════════════════════
          SUMMER PICKS — Seasonal Collection
      ════════════════════════════════════════ */}
      <FadeInSection>
      <section style={{ padding: "80px 0", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 500,
              letterSpacing: "-0.005em",
              marginBottom: "48px",
              color: "var(--text-primary)",
              textAlign: "center",
            }}
          >
            New Arrivals
          </motion.h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            {summerProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link
              href="/shop?filter=new"
              className="btn-outline"
              style={{ display: "inline-block" }}
            >
              VIEW ALL NEW ARRIVALS
            </Link>
          </div>

          <div style={{ marginTop: "56px", paddingBottom: "56px", borderBottom: "1px solid var(--border)" }} />
        </div>
      </section>
      </FadeInSection>

      {/* ════════════════════════════════════════
          CTA BANNER — Order on WhatsApp
      ════════════════════════════════════════ */}
      <section style={{ background: "#F9F9F9", padding: "100px 40px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          <p style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px", fontWeight: 500 }}>
            Shop Easily
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.005em", color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "20px" }}>
            Order Directly on WhatsApp
          </h2>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "40px", fontWeight: 400 }}>
            Browse our collection and tap "Order on WhatsApp" — we'll handle the rest. Fast delivery across India.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" className="btn-primary">
              BROWSE COLLECTION
            </Link>
            <a
              href="https://wa.me/918700808780?text=Hi, I want to explore your kurti collection!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WASvg />
              CHAT ON WHATSAPP
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
