"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product, getWhatsAppLink } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const waLink = getWhatsAppLink(product.name, product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="product-card card group"
    >
      {/* ── Image wrapper ── */}
      <Link
        href={`/product/${product.id}`}
        className="block product-img-wrap product-image"
        style={{ display: "block", position: "relative", overflow: "hidden", marginBottom: "16px" }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", transition: "transform 0.4s ease" }} className="product-image-container">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            style={{ transition: "transform 0.4s ease" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Discount badge — subtle, top right only if discount exists */}
          {discount && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "#000000",
                color: "white",
                fontSize: "11px",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                padding: "4px 8px",
                borderRadius: "2px",
                zIndex: 10,
              }}
            >
              -{discount}%
            </div>
          )}

          {/* NEW badge — subtle */}
          {product.isNew && !discount && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "#555555",
                color: "white",
                fontSize: "11px",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                padding: "4px 8px",
                borderRadius: "2px",
                zIndex: 10,
              }}
            >
              NEW
            </div>
          )}
        </div>
      </Link>

      {/* ── Product Info ── */}
      <div className="product-info" style={{ textAlign: "left" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>
          {product.category}
        </p>

        <Link href={`/product/${product.id}`} style={{ textDecoration: "none", display: "block", marginBottom: "8px" }}>
          <h3
            className="product-title hover:text-gray-600"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.4,
              color: "var(--text-primary)",
              transition: "color 0.3s ease",
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
          {product.originalPrice && (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--text-muted)", textDecoration: "line-through" }}>
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="product-price" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "var(--text-primary)" }}>
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#25D366",
            textDecoration: "none",
            paddingTop: "4px",
            borderTop: "1px solid #e0e0e0",
            paddingBottom: "0",
            transition: "color 0.3s ease",
          }}
          className="hover:text-green-700"
          onClick={(e) => e.stopPropagation()}
        >
          Order on WhatsApp →
        </a>
      </div>
    </motion.div>
  );
}
